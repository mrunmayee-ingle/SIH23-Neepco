import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "url";
import Upload from "./components/Upload";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const history = useHistory();
  const id = history.location.pathname.split("view-bids/")[1];

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function handleUpload() {
    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsUploading(true);

    axios
      .post(`${BASE_URL}/create-tender`, formData)
      .then((res) => {
        alert(res.data.message);
        setSelectedFile(null);
        setSelectedFileName("");
        setIsUploading(false);
      })
      .catch((err) => {
        alert(err);
        setIsUploading(false);
      });
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} width={"100%"}>
      <FormControl>
        <Upload
          minH={{ base: "auto", lg: "40vh", "2xl": "20vh" }}
          pe="20px"
          width="100% !important"
          pb={{ base: "100px", lg: "20px" }}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
        />

        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          w="100%"
          h="50"
          mb="24px"
          onClick={handleUpload}
          disabled={isUploading}
        >
          Create Tendor
        </Button>
      </FormControl>
    </Box>
  );
}
