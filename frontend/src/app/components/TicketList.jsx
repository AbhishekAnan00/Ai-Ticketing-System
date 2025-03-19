// frontend/src/app/components/TicketList.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tickets");
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
    // Listen for new tickets via WebSocket
    socket.on("ticketCreated", (ticket) => {
      setTickets((prev) => [ticket, ...prev]);
    });
    return () => socket.off("ticketCreated");
  }, []);

  return (
    <div>
      <h2>Your Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
