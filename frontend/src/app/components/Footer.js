"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AI Ticketing System. All rights
          reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/" className="text-sm hover:text-gray-300">
            Home
          </Link>
          <Link href="/ticket" className="text-sm hover:text-gray-300">
            Tickets
          </Link>
          <Link href="/admin" className="text-sm hover:text-gray-300">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
