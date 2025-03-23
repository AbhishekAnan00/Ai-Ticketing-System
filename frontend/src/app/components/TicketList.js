// // src/components/TicketList.js
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
// const socket = io(backendURL);

// export default function TicketList() {
//   const [tickets, setTickets] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const router = useRouter();

//   const fetchTickets = async () => {
//     try {
//       const { data } = await axios.get(`${backendURL}/api/tickets`);
//       setTickets(data);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//       toast.error("Failed to fetch tickets.");
//     }
//   };

//   useEffect(() => {
//     fetchTickets();

//     socket.on("ticketCreated", (ticket) => {
//       console.log("Received ticketCreated event:", ticket);
//       setTickets((prev) => [ticket, ...prev]);
//       toast.info(`New ticket created: ${ticket.title}`);
//     });

//     socket.on("ticketUpdated", (ticket) => {
//       console.log("Received ticketUpdated event:", ticket);
//       setTickets((prev) =>
//         prev.map((t) => (t._id === ticket._id ? ticket : t))
//       );
//       toast.success(`Ticket updated: ${ticket.title} is now ${ticket.status}`);
//     });

//     return () => {
//       socket.off("ticketCreated");
//       socket.off("ticketUpdated");
//     };
//   }, []);

//   const filteredTickets = tickets.filter((ticket) =>
//     ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
//     ticket.status.toLowerCase().includes(filter.toLowerCase())
//   );

//   const sortedTickets = filteredTickets.sort((a, b) => {
//     if (sortOrder === "desc") {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     } else {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     }
//   });

//   const handleTicketClick = (ticket) => {
//     router.push(`/ticket/${ticket._id}`);
//   };

//   return (
//     <div>
//       <h2>Your Tickets</h2>
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Filter by title or status..."
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           style={{ padding: "0.5rem", marginRight: "1rem", width: "200px" }}
//         />
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           style={{ padding: "0.5rem", marginRight: "1rem" }}
//         >
//           <option value="desc">Newest First</option>
//           <option value="asc">Oldest First</option>
//         </select>
//         <button
//           onClick={fetchTickets}
//           style={{
//             padding: "0.5rem 1rem",
//             background: "#4a90e2",
//             color: "#fff",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Refresh Tickets
//         </button>
//       </div>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {sortedTickets.map((ticket) => (
//           <li
//             key={ticket._id}
//             onClick={() => handleTicketClick(ticket)}
//             style={{
//               cursor: "pointer",
//               marginBottom: "1rem",
//               padding: "0.5rem",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <div style={{ flex: 1 }}>
//               <strong>{ticket.title}</strong> - {ticket.status}
//             </div>
//             {ticket.status === "Processing..." && (
//               <div style={{ marginLeft: "1rem" }}>
//                 <span>⏳</span>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// }

// src/components/TicketList.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import TicketDetailModal from "./TicketDetailModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(backendURL);

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/tickets`);
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch tickets.");
    }
  };

  useEffect(() => {
    fetchTickets();

    socket.on("ticketCreated", (ticket) => {
      console.log("Received ticketCreated event:", ticket);
      setTickets((prev) => [ticket, ...prev]);
      toast.info(`New ticket created: ${ticket.title}`);
    });

    socket.on("ticketUpdated", (ticket) => {
      console.log("Received ticketUpdated event:", ticket);
      setTickets((prev) =>
        prev.map((t) => (t._id === ticket._id ? ticket : t))
      );
      toast.success(`Ticket updated: ${ticket.title} is now ${ticket.status}`);
    });

    return () => {
      socket.off("ticketCreated");
      socket.off("ticketUpdated");
    };
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(filter.toLowerCase()) ||
    ticket.status.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTickets = filteredTickets.sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div>
      <h2>Your Tickets</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Filter by title or status..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem", width: "200px" }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <button
          onClick={fetchTickets}
          style={{
            padding: "0.5rem 1rem",
            background: "#4a90e2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Refresh Tickets
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedTickets.map((ticket) => (
          <li
            key={ticket._id}
            onClick={() => setSelectedTicket(ticket)}
            style={{
              cursor: "pointer",
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{ticket.title}</strong> - {ticket.status}
            </div>
            {ticket.status === "Processing..." && (
              <div style={{ marginLeft: "1rem" }}>
                <span>⏳</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

