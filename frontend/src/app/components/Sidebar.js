"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar({ isOpen, setIsOpen }) {
 
  const [collapsed, setCollapsed] = useState(false);

  const handleLinkClick = () => {
    
    setIsOpen(false);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`fixed z-50 top-0 left-0 h-full bg-[#181D46] p-4 transition-all duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        ${collapsed ? "w-20" : "w-64"} lg:translate-x-0`}
    >
     
      <div className="lg:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mb-10">
        <div className="h-10 w-10 bg-blue-500 rounded-full mr-3" />
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-wide text-white">
            AI Ticketing
          </h1>
        )}
      </div>
      <nav className="flex flex-col gap-3 text-gray-300 text-sm">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center p-2 rounded hover:bg-[#222752]"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-7 4h10" />
          </svg>
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link
          href="/ticket"
          onClick={handleLinkClick}
          className="flex items-center p-2 rounded hover:bg-[#222752]"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c-1.85 0-3 .95-3 2 0 1.05 1.15 2 3 2s3-.95 3-2c0-1.05-1.15-2-3-2z" />
            <path d="M2 12c0-4.418 3.582-8 8-8 4.416 0 8 3.582 8 8s-3.584 8-8 8c-4.418 0-8-3.582-8-8z" />
          </svg>
          {!collapsed && <span>Tickets</span>}
        </Link>
        <Link
          href="/admin"
          onClick={handleLinkClick}
          className="flex items-center p-2 rounded hover:bg-[#222752]"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9.75 9a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9zM15.75 9a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0V9z" />
            <path
              fillRule="evenodd"
              d="M4.5 4.5A1.5 1.5 0 016 3h12a1.5 1.5 0 011.5 1.5v15l-6-3-6 3-3-1.5v-13.5z"
              clipRule="evenodd"
            />
          </svg>
          {!collapsed && <span>Analytics</span>}
        </Link>
        <Link href="/login"
          onClick={handleLinkClick}
          className="flex items-center p-2 rounded hover:bg-[#222752]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
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
          {!collapsed && <span>Profile</span>}
      
      </Link>
      </nav>
      <div className="hidden lg:flex absolute bottom-4 right-4">
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {collapsed ? (
            
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-white"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-white"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
