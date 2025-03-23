"use client";
import { useState } from "react";
import axios from "axios";

export default function AttachmentUploader({ ticketId, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("attachment", file);
    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        `http://localhost:5000/api/tickets/${ticketId}/attachments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadStatus("Upload successful!");
      if (onUploadComplete) onUploadComplete(response.data);
    } catch (error) {
      console.error("Error uploading attachment:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload} style={{ marginLeft: "0.5rem" }}>
      Upload Attachment
    </button>
    {uploadStatus && <p>{uploadStatus}</p>}
  </div>
  );
}
