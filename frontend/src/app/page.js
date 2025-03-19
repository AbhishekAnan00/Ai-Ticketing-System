// frontend/src/app/page.js
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the AI Ticketing System</h1>
      <p>
        Get support, create tickets, and interact with our intelligent assistant.
      </p>
      <Link href="/ticket" style={{ color: "#4a90e2", textDecoration: "underline" }}>
        Go to Ticket Dashboard
      </Link>
    </div>
  );
}
