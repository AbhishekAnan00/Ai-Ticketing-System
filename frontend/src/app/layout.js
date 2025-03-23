import "../globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "AI Ticketing System",
  description: "An AI-powered ticketing system for efficient support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
