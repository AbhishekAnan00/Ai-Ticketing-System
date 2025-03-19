import { useEffect, useState } from "react";
import TicketList from "../../components/TicketList";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Tickets</h1>
      <TicketList tickets={tickets} />
    </div>
  );
}
