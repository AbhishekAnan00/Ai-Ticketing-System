// frontend/src/app/layout.js
import "../globals.css";

export const metadata = {
  title: "AI Ticketing System",
  description: "An AI-powered ticketing system for efficient support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
