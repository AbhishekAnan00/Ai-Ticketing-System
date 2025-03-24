"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function GeminiFileUpload({ onUploadSuccess, onUploadError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    // Adjust the key "file" if your Gemini API expects a different field name.
    formData.append("file", selectedFile);

    try {
      // Replace with your actual Gemini API endpoint URL
      const response = await axios.post("https://your-gemini-api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed.");
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}
