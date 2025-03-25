"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AttachmentUploader({ ticketId, onUploadComplete }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    // Simulate an upload process (replace with real API call if needed)
    setTimeout(() => {
      const fakeUrl = URL.createObjectURL(selectedFile);
      onUploadComplete({ attachmentUrl: fakeUrl });
      setSelectedFile(null);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        id="attachmentInput"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="attachmentInput"
        className={`flex flex-col items-center justify-center p-4 border-dashed border-2 rounded-md cursor-pointer transition-colors ${
          dragActive ? "border-blue-500 bg-blue-100" : "border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <span className="text-4xl">📁</span>
        <span className="mt-2 text-sm text-gray-300">
          Drag & drop attachment here, or click to select file
        </span>
      </label>
      {selectedFile && (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-300">
            Selected: {selectedFile.name}
          </span>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {uploading ? "Uploading..." : "Upload Attachment"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function TicketDetailModal({ ticket, onClose }) {
  const [expanded, setExpanded] = useState(false);
  const [attachments, setAttachments] = useState(ticket.attachments || []);

  if (!ticket) return null;

  const toggleExpanded = () => setExpanded(!expanded);
  const handleUploadComplete = (uploadResult) => {
    if (uploadResult.attachmentUrl) {
      setAttachments((prev) => [...prev, uploadResult.attachmentUrl]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#1F2244] rounded-lg shadow-xl w-11/12 max-w-lg p-6 overflow-y-auto max-h-[80vh] text-gray-200"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
          <p className="mb-2">
            <strong>Status:</strong> {ticket.status}
          </p>
          <p className="mb-2">
            <strong>Original Description:</strong>
            <br />
            {ticket.description}
          </p>
          {ticket.enrichedDescription && (
            <p className="mb-2">
              <strong>Enriched Description:</strong>
              <br />
              {expanded
                ? ticket.enrichedDescription
                : ticket.enrichedDescription.substring(0, 300) +
                  (ticket.enrichedDescription.length > 300 ? "..." : "")}
              {ticket.enrichedDescription.length > 300 && (
                <button
                  onClick={toggleExpanded}
                  className="ml-2 px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                >
                  {expanded ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          )}
          <div className="mb-4">
            <strong>Attachments:</strong>
            <ul className="list-disc list-inside">
              {attachments.map((att, idx) => (
                <li key={idx}>
                  <a
                    href={att}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {att}
                  </a>
                </li>
              ))}
            </ul>

            <AttachmentUploader
              ticketId={ticket._id}
              onUploadComplete={handleUploadComplete}
            />
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

