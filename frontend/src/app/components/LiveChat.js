// src/components/LiveChat.js
"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(backendURL);

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Emit message to the server
      socket.emit("chatMessage", input);
      // Immediately add the message to local state so the sender sees it
      setMessages((prev) => [...prev, input]);
      setInput("");
    }
  };

  return (
    <div style={chatContainerStyle}>
      <h3>Live Chat</h3>
      <div style={chatMessagesStyle}>
        {messages.map((msg, index) => (
          <div key={index} style={chatMessageStyle}>
            {msg}
          </div>
        ))}
      </div>
      <div style={chatInputContainerStyle}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={chatInputStyle}
        />
        <button onClick={sendMessage} style={chatButtonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

const chatContainerStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  marginTop: "1rem",
  borderRadius: "4px",
  background: "#fff",
};

const chatMessagesStyle = {
  maxHeight: "200px",
  overflowY: "auto",
  marginBottom: "1rem",
};

const chatMessageStyle = {
  marginBottom: "0.5rem",
};

const chatInputContainerStyle = {
  display: "flex",
};

const chatInputStyle = {
  flex: 1,
  padding: "0.5rem",
};

const chatButtonStyle = {
  padding: "0.5rem 1rem",
  background: "#4a90e2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
