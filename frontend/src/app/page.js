"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Welcome to the AI Ticketing System
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
        Get support, create tickets, and interact with our intelligent assistant.
      </p>
      <Link
        href="/ticket"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded shadow transition-colors"
      >
        Go to Ticket Dashboard
      </Link>
    </div>
  );
}
