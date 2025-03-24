"use client";
import React from "react";

export default function Notification({ notifications = [] }) {
  return (
    <div style={notificationContainerStyle}>
      {notifications.map((note) => (
        <div key={note.id} style={notificationStyle}>
          {note.message}
        </div>
      ))}
    </div>
  );
}

const notificationContainerStyle = {
  position: "fixed",
  top: "1rem",
  right: "1rem",
  zIndex: 1000,
};

const notificationStyle = {
  background: "#333",
  color: "#fff",
  padding: "0.75rem 1rem",
  marginBottom: "0.5rem",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
};
