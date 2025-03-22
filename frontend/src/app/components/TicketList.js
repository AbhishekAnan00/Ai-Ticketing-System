"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(backendURL);

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/tickets`);
      setTickets(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to load tickets.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    socket.on("ticketCreated", (ticket) => {
      setTickets((prev) => [ticket, ...prev]);
    });
    return () => socket.off("ticketCreated");
  }, []);

  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>{error}</div>;

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
