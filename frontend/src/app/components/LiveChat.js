"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(backendURL);

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, { text: msg, sender: "other" }]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chatMessage", input);
      setMessages((prev) => [...prev, { text: input, sender: "self" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-80 bg-[#1F2244] text-white rounded-lg shadow-lg">
      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "self" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg break-words text-sm ${
                msg.sender === "self"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-gray-600 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 mr-2 p-1 rounded bg-[#2F3359] placeholder-gray-300 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}


//LOGIC






// // // src/components/LiveChat.js
// // "use client";
// // import { useEffect, useState } from "react";
// // import { io } from "socket.io-client";

// // const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
// // const socket = io(backendURL);

// // export default function LiveChat() {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");

// //   useEffect(() => {
// //     socket.on("chatMessage", (msg) => {
// //       setMessages((prev) => [...prev, msg]);
// //     });
// //     return () => {
// //       socket.off("chatMessage");
// //     };
// //   }, []);

// //   const sendMessage = () => {
// //     if (input.trim()) {
// //       socket.emit("chatMessage", input);
// //       setMessages((prev) => [...prev, input]);
// //       setInput("");
// //     }
// //   };

// //   return (
// //     <div style={chatContainerStyle}>
// //       <h3>Live Chat</h3>
// //       <div style={chatMessagesStyle}>
// //         {messages.map((msg, index) => (
// //           <div key={index} style={chatMessageStyle}>
// //             {msg}
// //           </div>
// //         ))}
// //       </div>
// //       <div style={chatInputContainerStyle}>
// //         <input
// //           type="text"
// //           placeholder="Type your message..."
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           style={chatInputStyle}
// //         />
// //         <button onClick={sendMessage} style={chatButtonStyle}>
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // const chatContainerStyle = {
// //   border: "1px solid #ccc",
// //   padding: "1rem",
// //   marginTop: "1rem",
// //   borderRadius: "4px",
// //   background: "#fff",
// // };

// // const chatMessagesStyle = {
// //   maxHeight: "200px",
// //   overflowY: "auto",
// //   marginBottom: "1rem",
// // };

// // const chatMessageStyle = {
// //   marginBottom: "0.5rem",
// // };

// // const chatInputContainerStyle = {
// //   display: "flex",
// // };

// // const chatInputStyle = {
// //   flex: 1,
// //   padding: "0.5rem",
// // };

// // const chatButtonStyle = {
// //   padding: "0.5rem 1rem",
// //   background: "#4a90e2",
// //   color: "#fff",
// //   border: "none",
// //   borderRadius: "4px",
// //   cursor: "pointer",
// // };

