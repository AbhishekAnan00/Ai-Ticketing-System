// frontend/src/app/ticket/page.js
"use client";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

export default function TicketDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ticket Dashboard</h1>
      <TicketForm />
      <TicketList />
    </div>
  );
}
