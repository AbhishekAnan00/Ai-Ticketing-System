"use client";

export default function ChatButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 text-xs md:text-sm"
    >
      {isOpen ? "Close Chat" : "Chat with Agent"}
    </button>
  );
}
