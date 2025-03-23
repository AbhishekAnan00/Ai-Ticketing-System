"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import LiveChat from "../components/LiveChat";

Chart.register(...registerables);

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, enriched: 0, open: 0 });

  useEffect(() => {
    async function fetchTickets() {
      try {
        const { data } = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/api/tickets"
        );
        setTickets(data);
        calculateStats(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }
    fetchTickets();
  }, []);

  const calculateStats = (tickets) => {
    const total = tickets.length;
    const enriched = tickets.filter((t) => t.status === "Enriched").length;
    const open = tickets.filter(
      (t) => t.status === "Open" || t.status === "Processing..."
    ).length;
    setStats({ total, enriched, open });
  };

  const chartData = {
    labels: ["Total", "Enriched", "Open/Processing"],
    datasets: [
      {
        label: "Tickets",
        data: [stats.total, stats.enriched, stats.open],
        backgroundColor: ["#4a90e2", "#7ED321", "#F5A623"],
      },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <LiveChat />
      <div style={{ marginBottom: "2rem" }}>
        <p>Total Tickets: {stats.total}</p>
        <p>Enriched Tickets: {stats.enriched}</p>
        <p>Open/Processing Tickets: {stats.open}</p>
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
