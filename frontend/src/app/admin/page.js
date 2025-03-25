"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveChat from "../components/LiveChat";
import TicketDetailModal from "../components/TicketDetailModal";
import Link from "next/link";

Chart.register(...registerables);

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    enriched: 0,
    open: 0,
    avgResolutionTime: 0,
  });
  const [trendData, setTrendData] = useState({ labels: [], data: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("User");

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || "User");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const { data } = await axios.get(`${backendURL}/api/tickets`);
        setTickets(data);
        calculateStats(data);
        calculateTrend(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to fetch tickets.");
      }
    }
    fetchTickets();
  }, [backendURL]);

  const calculateStats = (ticketsData) => {
    const total = ticketsData.length;
    const enriched = ticketsData.filter((t) => t.status === "Enriched").length;
    const open = ticketsData.filter(
      (t) => t.status === "Open" || t.status === "Processing..."
    ).length;

    const resolutionTimes = ticketsData
      .filter((t) => t.resolutionTime)
      .map((t) => t.resolutionTime);
    const avgResolutionTime =
      resolutionTimes.length > 0
        ? Math.round(resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length)
        : 0;

    setStats({ total, enriched, open, avgResolutionTime });
  };

  const calculateTrend = (ticketsData) => {
    const groups = {};
    ticketsData.forEach((ticket) => {
      const date = new Date(ticket.createdAt).toISOString().split("T")[0];
      groups[date] = (groups[date] || 0) + 1;
    });
    const sortedDates = Object.keys(groups).sort();
    setTrendData({
      labels: sortedDates,
      data: sortedDates.map((date) => groups[date]),
    });
  };

  const barData = {
    labels: ["Total", "Enriched", "Open/Processing"],
    datasets: [
      {
        label: "Ticket Counts",
        data: [stats.total, stats.enriched, stats.open],
        backgroundColor: ["#4A90E2", "#7ED321", "#F5A623"],
      },
    ],
  };

  const pieData = {
    labels: ["Enriched", "Open/Processing"],
    datasets: [
      {
        data: [stats.enriched, stats.open],
        backgroundColor: ["#7ED321", "#F5A623"],
      },
    ],
  };

  const lineData = {
    labels: trendData.labels,
    datasets: [
      {
        label: "Tickets Over Time",
        data: trendData.data,
        fill: false,
        borderColor: "#4A90E2",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: "#FFFFFF" } },
    },
    scales: {
      x: { ticks: { color: "#FFFFFF" } },
      y: { ticks: { color: "#FFFFFF" } },
    },
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setSearchQuery("");
    setStatusFilter("all");
    axios
      .get(`${backendURL}/api/tickets`)
      .then(({ data }) => {
        setTickets(data);
        calculateStats(data);
        calculateTrend(data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        toast.error("Failed to fetch tickets.");
      });
  };

  return (
    <div className="flex min-h-screen bg-[#0D102D] text-white">
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#181D46] px-6 py-8">
        <div className="flex items-center mb-10">
          <div className="h-10 w-10 bg-blue-500 rounded-full mr-3" />
          <h1 className="text-xl font-bold tracking-wide">AI Ticketing</h1>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <img
              src="https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="User"
              className="rounded-full h-10 w-10 mr-3"
            />
            <div>
              <p className="font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">AI Specialist</p>
            </div>
          </div>
          <hr className="border-gray-700" />
        </div>
        <nav className="flex flex-col gap-3 text-gray-300 text-sm">
          <Link href="/" className="flex items-center p-2 rounded hover:bg-[#222752]">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-7 4h10" />
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link href="/ticket" className="flex items-center p-2 rounded hover:bg-[#222752]">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 8c-1.85 0-3 .95-3 2 0 1.05 1.15 2 3 2s3-.95 3-2c0-1.05-1.15-2-3-2z" />
              <path d="M2 12c0-4.418 3.582-8 8-8 4.416 0 8 3.582 8 8s-3.584 8-8 8c-4.418 0-8-3.582-8-8z" />
            </svg>
            <span>Tickets</span>
          </Link>
          <Link href="/admin" className="flex items-center p-2 rounded hover:bg-[#222752]">
            <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.75 9a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9zM15.75 9a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9z" />
              <path fillRule="evenodd" d="M4.5 4.5A1.5 1.5 0 016 3h12a1.5 1.5 0 011.5 1.5v15l-6-3-6 3-3-1.5v-13.5z" clipRule="evenodd" />
            </svg>
            <span>Analytics</span>
          </Link>
          <Link href="/login" className="flex items-center p-2 rounded hover:bg-[#222752]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1118.878 6.196 9 9 0 015.121 17.804z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 bg-[#181D46] border-b border-[#2F3359]">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="bg-[#222752] px-3 py-1 rounded text-sm hover:bg-[#2F3359]">
              Generate Report
            </button>
            <div className="flex items-center">
              <img
                src="https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                alt="User"
                className="rounded-full h-8 w-8 mr-2"
              />
              <span className="text-sm font-medium">{userName}</span>
            </div>
          </div>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-2">Total Tickets</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-2">Enriched Tickets</p>
              <p className="text-2xl font-bold">{stats.enriched}</p>
            </div>
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">  
              <p className="text-gray-400 text-sm mb-2">Open / Processing</p>
              <p className="text-2xl font-bold">{stats.open}</p>
            </div>
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">
              <p className="text-gray-400 text-sm mb-2">Avg Resolution (hrs)</p>
              <p className="text-2xl font-bold">{stats.avgResolutionTime}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#1F2244] p-4 rounded-lg shadow xl:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Ticket Status Distribution</h3>
              <Pie data={pieData} options={chartOptions} />
            </div>
            <div className="bg-[#1F2244] p-4 rounded-lg shadow xl:col-span-2 mt-6 xl:mt-0">
              <h3 className="text-lg font-semibold mb-4">Tickets Over Time</h3>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Ticket Counts</h3>
              <Bar data={barData} options={chartOptions} />
            </div>
            <div className="bg-[#1F2244] p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Most Common Issue:</span>
                  <span className="font-bold text-gray-200">Billing Errors</span>
                </li>
                <li className="flex justify-between">
                  <span>Predicted Resolution Rate:</span>
                  <span className="font-bold text-gray-200">95%</span>
                </li>
                <li className="flex justify-between">
                  <span>Tickets Requiring Escalation:</span>
                  <span className="font-bold text-gray-200">12</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#1F2244] p-4 rounded-lg shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-lg font-semibold mb-2 md:mb-0">All Tickets</h3>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 rounded bg-[#2F3359] placeholder-gray-300 text-white"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 rounded bg-[#2F3359] text-white"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.93 4.93a10 10 0 0114.14 0M4.93 4.93v4.24h4.24M19.07 19.07a10 10 0 01-14.14 0M19.07 19.07v-4.24h-4.24"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-300">
                <thead>
                  <tr className="bg-[#272B52] text-left">
                    <th className="py-2 px-4 font-semibold">Title</th>
                    <th className="py-2 px-4 font-semibold">Status</th>
                    <th className="py-2 px-4 font-semibold">Created</th>
                    <th className="py-2 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="border-b border-[#2F3359] hover:bg-[#222752]"
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
                        <button className="text-red-400 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No tickets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {selectedTicket && (
          <TicketDetailModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
        <ToastContainer position="top-right" autoClose={5000} />

        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        >
          {showChat ? "Close Chat" : "Chat with Agent"}
        </button>

        {showChat && (
          <div className="fixed bottom-20 right-8 w-80 bg-[#1F2244] rounded-lg shadow-2xl z-50">
            <div className="flex justify-between items-center bg-[#272B52] text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Live Chat</h3>
              <button onClick={() => setShowChat(false)} className="text-xl leading-none">
                &times;
              </button>
            </div>
            <LiveChat />
          </div>
        )}
      </div>
    </div>
  );
}
