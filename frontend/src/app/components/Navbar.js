// src/components/Navbar.js
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link href="/">Home</Link>
        </li>
        <li style={liStyle}>
          <Link href="/ticket">Tickets</Link>
        </li>
        <li style={liStyle}>
          <Link href="/admin">Admin Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

const navStyle = {
  background: "#4a90e2",
  padding: "1rem",
};

const ulStyle = {
  listStyle: "none",
  display: "flex",
  gap: "1rem",
  margin: 0,
  padding: 0,
};

const liStyle = {
  color: "#fff",
};
