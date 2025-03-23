"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-blue-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="text-white text-2xl font-bold">AI TICKETING</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/">
                <span className="text-white hover:text-gray-100 transition-colors text-lg">
                  Home
                </span>
              </Link>
              <Link href="/ticket">
                <span className="text-white hover:text-gray-100 transition-colors text-lg">
                  Tickets
                </span>
              </Link>
              <Link href="/admin">
                <span className="text-white hover:text-gray-100 transition-colors text-lg">
                  Admin Dashboard
                </span>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMenu}
                className="text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-[#181D46] z-50 shadow-lg"
          >
            <div className="p-4 flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="mt-4 flex flex-col space-y-4 px-4">
              <Link href="/" onClick={toggleMenu}>
                <span className="text-white hover:text-gray-300 transition-colors text-lg">
                  Home
                </span>
              </Link>
              <Link href="/ticket" onClick={toggleMenu}>
                <span className="text-white hover:text-gray-300 transition-colors text-lg">
                  Tickets
                </span>
              </Link>
              <Link href="/admin" onClick={toggleMenu}>
                <span className="text-white hover:text-gray-300 transition-colors text-lg">
                  Admin Dashboard
                </span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
