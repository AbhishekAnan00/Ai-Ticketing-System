"use client";

import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";


export default function TicketDashboard() {
  return (
    <div> 
      <TicketForm/>
      <TicketList />
    </div>
  );
}
