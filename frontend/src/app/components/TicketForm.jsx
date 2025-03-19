// frontend/src/app/components/TicketForm.js
"use client";
import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/tickets", {
        title,
        description,
      });
      // Emit socket event to notify clients of new ticket
      socket.emit("newTicket", data);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter ticket title"
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            style={{ marginLeft: "0.5rem", verticalAlign: "top" }}
          />
        </label>
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Submit Ticket
      </button>
    </form>
  );
}
