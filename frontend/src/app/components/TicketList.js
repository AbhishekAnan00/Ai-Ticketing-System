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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
      setTickets((prev) => [ticket, ...prev]);
      toast.info(`New ticket created: ${ticket.title}`);
    });

    socket.on("ticketUpdated", (ticket) => {
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

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`${backendURL}/api/tickets/${ticketId}`);
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Failed to delete ticket.");
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setStatusFilter("all");
    fetchTickets();
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="flex min-h-screen bg-[#0D102D] text-white p-4">
      <div className="w-full">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold">All Tickets</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded bg-[#2F3359] border border-gray-600 placeholder-gray-300 text-white w-full md:w-60"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded bg-[#2F3359] border border-gray-600 text-white w-full md:w-40"
            >
              <option value="all">All</option>
              <option value="Open">Open</option>
              <option value="Processing...">Processing</option>
              <option value="Enriched">Enriched</option>
              <option value="Closed">Closed</option>
            </select>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              title="Refresh Tickets"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1F2244] border border-gray-600 rounded-md">
            <thead>
              <tr className="bg-[#272B52] text-left">
                <th className="py-2 px-4 font-semibold">Title</th>
                <th className="py-2 px-4 font-semibold">Status</th>
                <th className="py-2 px-4 font-semibold">Created</th>
                <th className="py-2 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-b border-[#2F3359] hover:bg-[#222752] transition-colors"
                >
                  <td className="py-2 px-4">{ticket.title}</td>
                  <td className="py-2 px-4">{ticket.status}</td>
                  <td className="py-2 px-4">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-blue-400 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sortedTickets.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}



// LOGIC

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



