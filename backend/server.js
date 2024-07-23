const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const { Sequelize, DataTypes } = require("sequelize");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs"); // Import the fs module

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: "token" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var clients = [];

//connect to db using sequelize
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

db.authenticate()
  .then(() => console.log("Connected to Postgres using Sequelize"))
  .catch((err) => console.log(err));

const Tendor = require("./models/Tendor")(db, DataTypes);
const Bid = require("./models/Bid")(db, DataTypes);
const Ocr = require("./models/Ocr")(db, DataTypes);
Tendor.associate({ Ocr });
Bid.associate({ Tendor, Ocr });

const fileFilter = (req, file, cb) => {
  // Check if the file's MIME type is PDF
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."), false); // Reject the file
  }
};
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tenders"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/bids"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload1 = multer({ storage: storage1, fileFilter: fileFilter });
const upload2 = multer({ storage: storage2, fileFilter: fileFilter });

app.use("/uploads", express.static("uploads"));

function sendSSEUpdate(message) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
}

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add the client to the list of connected clients
  clients.push(res);

  // Remove the client when they disconnect
  req.on("close", () => {
    const index = clients.indexOf(res);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

app.get("/", (req, res) => {
  res.send("NEEPCO");
});

app.post("/create-bid", upload2.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  //get tenderID from form data in body
  const { tenderId } = req.body;
  if (!tenderId) {
    return res.status(400).send("Tender ID not found.");
  }

  //pick randomly if the bid is MSE or not
  //the values should be yes or no
  const isMSE = Math.random() < 0.7 ? "yes" : "no";

  //get the uploaded file url using base url
  let fileName = req.file.path.replace(/\\/g, "/");
  //replace spaces with %20
  fileName = fileName.replace(/ /g, "%20");
  const fileUploadURL = process.env.BASE_URL + fileName;

  //call an api using axios and pass the file in the body using form data
  const formData = new FormData();
  formData.append("file", fs.createReadStream(req.file.path));
  formData.append("page", "1");

  try {
    const orc_result = await axios.post(
      "https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "pdf-to-text-converter.p.rapidapi.com",
        },
      }
    );

    const text = orc_result.data;

    // Define regular expressions to match the Unit Price and Item Quantity
    const lines = text.split("\n").map((line) => line.trim());

    console.log(lines);

    const unitPrice = lines[lines.length - 5];
    const itemQuantity = lines[lines.length - 10];
    const sellerName = lines[lines.length - 8];

    const totalPrice = unitPrice * itemQuantity;

    console.log("sellerName:", sellerName);

    //enter value into ocr table
    const ocr = await Ocr.create({
      bidNumber: "",
      bidEndDate: "",
      totalQuantity: "",
      itemCategory: "",
      price: totalPrice,
      isMSE: isMSE,
    });

    //enter value into bids table
    const bid = await Bid.create({
      rating: "",
      ocrId: ocr.id,
      tenderId: tenderId,
      pdfUrl: fileUploadURL,
      name: sellerName,
    });

    //update bestBidId in tendors table
    const tendor = await Tendor.findByPk(tenderId);
    //compare price first then check for isMSE
    //if new bid price is less than best bid price then update bestBidId in tendors table
    //if new bid price is equal to best bid price then check for isMSE
    //if new bid isMSE is true and best bid mse is false then update bestBidId in tendors table
    //if new bid isMSE is false and best bid mse is true then do nothing

    if (tendor.bestBidId) {
      const bestBid = await Bid.findByPk(tendor.bestBidId);
      const bestBidOcr = await Ocr.findByPk(bestBid.ocrId);
      if (totalPrice < bestBidOcr.price) {
        tendor.bestBidId = bid.id;
        await tendor.save();
        console.log("updated best bid id");
      } else if (totalPrice === bestBidOcr.price) {
        if (isMSE && !bestBidOcr.isMSE) {
          tendor.bestBidId = bid.id;
          await tendor.save();
          console.log("updated best bid id");
        }
      }
    } else {
      tendor.bestBidId = bid.id;
      await tendor.save();
      console.log("updated best bid id");
    }

    const message = {
      type: "new-bid",
      bid: bid, // Include the newly created bid data
    };
    sendSSEUpdate(message);

    res.send({
      message: "Bid created successfully",
      bid: bid,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the bid.",
    });
  }
});

app.post("/create-tender", upload1.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  //get the uploaded file url using base url
  //get the uploaded file url using base url
  let fileName = req.file.path.replace(/\\/g, "/");
  //replace spaces with %20
  fileName = fileName.replace(/ /g, "%20");
  const fileUploadURL = process.env.BASE_URL + fileName;

  //call an api using axios and pass the file in the body using form data
  const formData = new FormData();
  formData.append("file", fs.createReadStream(req.file.path));
  formData.append("page", "1");
  try {
    const orc_result = await axios.post(
      "https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "pdf-to-text-converter.p.rapidapi.com",
        },
      }
    );

    const bidNumberRegex = /Bid\s+Number:\s+(\S+)/;
    const bidEndDateRegex =
      /Bid\s+End\s+Date\/Time\s+(\d+\s*-\s*\d+\s*-\s*\d+\s+\d+:\d+:\d+)/;
    const totalQuantityRegex = /Total\s+Quantity\s+(\d+)/;
    const itemCategoryRegex = /Item\s+Category\s+(.+)/;
    const departmentNameRegex = /Department\s+Name\s+(.+)/;
    const organizationNameRegex = /Organisation\s+Name\s+(.+)/;
    //Ministry/State Name write regex for this
    const ministryStateNameRegex = /Ministry\/State\s+Name\s+(.+)/;

    // Extract values using regular expressions
    const bidNumberMatch = orc_result.data.match(bidNumberRegex);
    const bidEndDateMatch = orc_result.data.match(bidEndDateRegex);
    const totalQuantityMatch = orc_result.data.match(totalQuantityRegex);
    const itemCategoryMatch = orc_result.data.match(itemCategoryRegex);
    const departmentNameMatch = orc_result.data.match(departmentNameRegex);
    const organizationNameMatch = orc_result.data.match(organizationNameRegex);
    const ministryStateNameMatch = orc_result.data.match(
      ministryStateNameRegex
    );

    // Extracted values
    const bidNumber = bidNumberMatch ? bidNumberMatch[1] : "Not found";
    let bidEndDate = bidEndDateMatch
      ? bidEndDateMatch[1].replace(/\s+/g, " ")
      : "Not found";

    bidEndDate = bidEndDate.replace(
      /(\d+)\s*-\s*(\d+)\s*-\s*(\d+)/,
      "$3-$2-$1"
    );

    const totalQuantity = totalQuantityMatch
      ? totalQuantityMatch[1]
      : "Not found";
    let itemCategory = itemCategoryMatch
      ? itemCategoryMatch[1].trim()
      : "Not found";
    //HARNESS   LASER   ASSY.   (Q3)
    //HARNESS LASER ASSY. (Q3)
    itemCategory = itemCategory.replace(/\s+/g, " ");
    //Department      Of      Defence         Production
    //Department Of Defence Production
    let departmentName = departmentNameMatch
      ? departmentNameMatch[1]
      : "Not found";
    if (departmentNameMatch)
      departmentName = departmentName.replace(/\s+/g, " ");
    let organizationName = organizationNameMatch
      ? organizationNameMatch[1]
      : "Not found";
    if (organizationNameMatch)
      organizationName = organizationName.replace(/\s+/g, " ");
    let ministryStateName = ministryStateNameMatch
      ? ministryStateNameMatch[1]
      : "Not found";
    if (ministryStateNameMatch)
      ministryStateName = ministryStateName.replace(/\s+/g, " ");

    // Log the extracted values
    console.log("Bid Number:", bidNumber);
    console.log("Bid End Date:", bidEndDate);
    console.log("Total Quantity:", totalQuantity);
    console.log("Item Category:", itemCategory);
    console.log("Department Name:", departmentName);
    console.log("Organization Name:", organizationName);
    console.log("Ministry/State Name:", ministryStateName);

    //enter value into ocr table
    const ocr = await Ocr.create({
      bidNumber: bidNumber,
      bidEndDate: bidEndDate,
      totalQuantity: totalQuantity,
      itemCategory: itemCategory,
      price: "",
      isMSE: "",
      ministryName: ministryStateName,
      orgName: organizationName,
      departmentName: departmentName,
    });

    //enter value into tendors table
    const tender = await Tendor.create({
      pdfUrl: fileUploadURL,
      ocrId: ocr.id,
    });

    //send response
    res.send({
      message: "Tendor created successfully",
      tender: tender,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the tendor.",
    });
  }
});

app.get("/tenders", async (req, res) => {
  const tendors = await Tendor.findAll({
    include: [
      {
        model: Ocr,
        as: "ocr",
      },
    ],
  });

  //fetch data of bestbid from bids table for each tendor
  const tendorsWithBestBid = await Promise.all(
    tendors.map(async (tendor) => {
      if (tendor.bestBidId) {
        const bestBid = await Bid.findByPk(tendor.bestBidId);
        const bestBidOcr = await Ocr.findByPk(bestBid.ocrId);
        return {
          ...tendor.toJSON(),
          bestBid: {
            ...bestBid.toJSON(),
            ocr: bestBidOcr.toJSON(),
          },
        };
      } else {
        return tendor.toJSON();
      }
    })
  );

  console.log(tendorsWithBestBid);

  res.send(tendorsWithBestBid.reverse());
});

app.get("/bids", (req, res) => {
  try {
    Bid.findAll({
      paranoid: false,
      include: [
        {
          model: Ocr,
          as: "ocr",
        },
      ],
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving bids.",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving bids.",
    });
  }
});

app.get("/bidById", (req, res) => {
  const id = req.query.id;
  console.log(id);

  try {
    Bid.findByPk(id, {
      include: [
        {
          model: Ocr,
          as: "ocr",
        },
      ],
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Bid with id ${id} not found`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving bid ${id}`,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Some error occurred while retrieving bid ${id}`,
    });
  }
});

app.get("/tendorById", async (req, res) => {
  const id = req.query.id;

  //get all the bids for this tendor
  const bids = await Bid.findAll({
    where: {
      tenderId: id,
    },
    include: [
      {
        model: Ocr,
        as: "ocr",
      },
    ],
  });

  //get the tendor
  const tendors = await Tendor.findAll({
    include: [
      {
        model: Ocr,
        as: "ocr",
      },
    ],
  });

  //fetch data of bestbid from bids table for each tendor
  const tendorsWithBestBid = await Promise.all(
    tendors.map(async (tendor) => {
      if (tendor.bestBidId) {
        const bestBid = await Bid.findByPk(tendor.bestBidId);
        const bestBidOcr = await Ocr.findByPk(bestBid.ocrId);
        return {
          ...tendor.toJSON(),
          bestBid: {
            ...bestBid.toJSON(),
            ocr: bestBidOcr.toJSON(),
          },
        };
      } else {
        return tendor.toJSON();
      }
    })
  );

  //return both bids and best bid
  res.send({
    bids: bids,
    tendor: tendorsWithBestBid.find((tendor) => tendor.id === id),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`NEEPCO Server is running on port ${PORT}`);
});
