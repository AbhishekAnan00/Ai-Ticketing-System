// // src/components/TicketDetailModal.js
// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function TicketDetailModal({ ticket, onClose }) {
//   const [expanded, setExpanded] = useState(false);
//   if (!ticket) return null;

//   const toggleExpanded = () => setExpanded(!expanded);

//   return (
//     <AnimatePresence>
//       <motion.div
//         style={modalOverlayStyle}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           style={modalContentStyle}
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.8 }}
//         >
//           <h2>{ticket.title}</h2>
//           <p>
//             <strong>Status:</strong> {ticket.status}
//           </p>
//           <p>
//             <strong>Original Description:</strong>
//             <br />
//             {ticket.description}
//           </p>
//           {ticket.enrichedDescription && (
//             <p>
//               <strong>Enriched Description:</strong>
//               <br />
//               {expanded
//                 ? ticket.enrichedDescription
//                 : ticket.enrichedDescription.substring(0, 300) + "..."}
//               {ticket.enrichedDescription.length > 300 && (
//                 <button onClick={toggleExpanded} style={readMoreButtonStyle}>
//                   {expanded ? "Show Less" : "Read More"}
//                 </button>
//               )}
//             </p>
//           )}
//           <button onClick={onClose} style={buttonStyle}>
//             Close
//           </button>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// const modalOverlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 1000,
// };

// const modalContentStyle = {
//   background: "#fff",
//   padding: "2rem",
//   borderRadius: "8px",
//   width: "90%",
//   maxWidth: "500px",
//   maxHeight: "80vh",
//   overflowY: "auto",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
// };

// const buttonStyle = {
//   marginTop: "1rem",
//   padding: "0.5rem 1rem",
//   background: "#4a90e2",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const readMoreButtonStyle = {
//   marginLeft: "0.5rem",
//   padding: "0.25rem 0.5rem",
//   background: "#ddd",
//   border: "none",
//   borderRadius: "3px",
//   cursor: "pointer",
// };
// src/components/TicketDetailModal.js
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AttachmentUploader from "./AttachmentUploader";

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
        style={modalOverlayStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          style={modalContentStyle}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <h2>{ticket.title}</h2>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
          <p>
            <strong>Original Description:</strong>
            <br />
            {ticket.description}
          </p>
          {ticket.enrichedDescription && (
            <p>
              <strong>Enriched Description:</strong>
              <br />
              {expanded
                ? ticket.enrichedDescription
                : ticket.enrichedDescription.substring(0, 300) + "..."}
              {ticket.enrichedDescription.length > 300 && (
                <button onClick={toggleExpanded} style={readMoreButtonStyle}>
                  {expanded ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          )}
          <div>
            <strong>Attachments:</strong>
            <ul>
              {attachments.map((att, idx) => (
                <li key={idx}>
                  <a href={att} target="_blank" rel="noopener noreferrer">
                    {att}
                  </a>
                </li>
              ))}
            </ul>
            <AttachmentUploader ticketId={ticket._id} onUploadComplete={handleUploadComplete} />
          </div>
          <button onClick={onClose} style={buttonStyle}>
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "500px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.5rem 1rem",
  background: "#4a90e2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const readMoreButtonStyle = {
  marginLeft: "0.5rem",
  padding: "0.25rem 0.5rem",
  background: "#ddd",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
};
