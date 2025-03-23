// src/components/Footer.js
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        <p>&copy; {new Date().getFullYear()} AI Ticketing System. All rights reserved.</p>
        <div style={footerLinks}>
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/ticket" style={linkStyle}>Tickets</Link>
          <Link href="/admin" style={linkStyle}>Admin Dashboard</Link>
        </div>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "1rem 0",
  marginTop: "2rem",
};

const footerContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const footerLinks = {
  display: "flex",
  gap: "1rem",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};
