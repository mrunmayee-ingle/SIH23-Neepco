import React, { Component } from "react";
import "./tendDash.css"; // Import the CSS file
import "./TendForm";
import { useHistory } from "react-router-dom";

// function tendDash() {
//   const Navigate = useNavigate();
// }

function TenderDashboard() {
  const data = [
    {
      id: 1,
      tenderNumber: "T-12345",
      publishedDate: "2023-09-15",
      location: "Maharashtra",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      document: "tender_document.pdf",
    },
    {
      id: 2,
      tenderNumber: "T-54321",
      publishedDate: "2023-09-10",
      location: "Karnataka",
      details:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      document: "another_document.doc",
    },
  ];

  const history = useHistory();

  const handleNavigate = () => {
    history.push("/admin/create-tender");
  };

  return (
    <div className="tender-dashboard">
      <div className="header">
        <h1>MY TENDERS</h1>
        <button className="upload-button" onClick={handleNavigate}>
          Upload
        </button>
      </div>
      <table className="tender-table">
        <thead>
          <tr>
            <th>Tender ID</th>
            <th>Tender Number</th>
            <th>Published Date</th>
            <th>Tender Location</th>
            <th>Tender Details</th>
            <th>Document</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.id}</td>
              <td>{tender.tenderNumber}</td>
              <td>{tender.publishedDate}</td>
              <td>{tender.location}</td>
              <td>{tender.details}</td>
              <td>
                {/* Create clickable links for PDF or DOC documents */}
                <a
                  href={`/path/to/documents/${tender.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tender.document}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TenderDashboard;
