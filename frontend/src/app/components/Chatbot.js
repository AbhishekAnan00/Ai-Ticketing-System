// import { useState, useRef, useEffect } from "react";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { sender: "assistant", text: "Hello! How can I assist with your ticket?" },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     // Add user message
//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     // Call chatbot API route
//     const res = await fetch("/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });
//     const { response } = await res.json();
//     setMessages((prev) => [
//       ...prev,
//       { sender: "assistant", text: response },
//     ]);
//   };

//   return (
//     <div className="chat-window border p-4 rounded shadow-md flex flex-col h-full">
//       <div className="messages flex-1 overflow-y-auto mb-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`mb-2 text-left ${msg.sender === "user" ? "text-blue-600" : "text-green-600"}`}
//           >
//             <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="input-area flex gap-2">
//         <input
//           type="text"
//           className="flex-1 border rounded px-2 py-1"
//           placeholder="Type your query..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//         />
//         <button
//           className="bg-blue-500 text-white px-4 py-1 rounded"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
