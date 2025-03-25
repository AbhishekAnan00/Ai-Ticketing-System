"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import GeminiFileUpload from "./GeminiFileUpload";

Chart.register(...registerables);

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(backendURL);

function FileUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileUploadInput"
        className="hidden"
        onChange={handleChange}
      />
      <label
        htmlFor="fileUploadInput"
        className={`flex flex-col items-center justify-center p-4 border-dashed border-2 rounded-md cursor-pointer transition-colors ${
          dragActive ? "border-blue-500 bg-blue-100" : "border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <span className="text-4xl">📁</span>
        <span className="mt-2 text-sm text-gray-300">
          Drag & drop a file here, or click to select file
        </span>
      </label>
    </div>
  );
}

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketFile, setTicketFile] = useState(null);

  const handleFileSelect = (file) => {
    setTicketFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (ticketFile) {
        formData.append("ticketFile", ticketFile);
      }

      const { data } = await axios.post(`${backendURL}/api/tickets`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      socket.emit("newTicket", data);
      setTitle("");
      setDescription("");
      setTicketFile(null);
      toast.success("Ticket submitted successfully");
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Error creating ticket");
    }
  };

  return (
    <form
      id="unique-ticket-form"
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-[#1F2244] rounded-lg shadow"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Title:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter ticket title"
          className="mt-1 block w-full p-2 bg-[#272B52] text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue"
          rows={4}
          className="mt-1 block w-full p-2 bg-[#272B52] text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload Ticket File:
        </label>
        <FileUpload onFileSelect={handleFileSelect} />
      </div>
       {/* <GeminiFileUpload
        onUploadSuccess={(data) => console.log("Upload success:", data)}
        onUploadError={(err) => console.error("Upload error:", err)}
      />  */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit Ticket
      </button>
    </form>
  );
}

export default function TicketDashboard() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const dummyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const dummyData = [5, 10, 8, 15, 12, 20];
    setChartData({
      labels: dummyLabels,
      datasets: [
        {
          label: "Tickets Created",
          data: dummyData,
          fill: false,
          borderColor: "#4a90e2",
          tension: 0.1,
        },
      ],
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D102D] text-white">

      <div className="flex-1 p-6 overflow-y-auto">
        
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Ticket Dashboard</h2>
          <div className="text-sm">Admin User | Settings</div>
        </header>

        <TicketForm />

        <div className="p-4 bg-[#1F2244] rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">
            Ticket Trends
          </h3>
          <Line
            data={chartData}
            options={{
              plugins: {
                legend: { labels: { color: "#fff" } },
              },
              scales: {
                x: { ticks: { color: "#fff" } },
                y: { ticks: { color: "#fff" } },
              },
            }}
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}







// LOGIC

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const backendURL = "http://localhost:5000";
// const socket = io(backendURL);

// export default function TicketForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(`${backendURL}/api/tickets`, { title, description });
//       socket.emit("newTicket", data);
//       setTitle("");
//       setDescription("");
//     } catch (error) {
//       console.error("Error creating ticket:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
//       <div>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter ticket title"
//             style={{ marginLeft: "0.5rem" }}
//           />
//         </label>
//       </div>
//       <div style={{ marginTop: "0.5rem" }}>
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe your issue"
//             style={{ marginLeft: "0.5rem", verticalAlign: "top" }}
//           />
//         </label>
//       </div>
//       <button type="submit" style={{ marginTop: "0.5rem" }}>
//         Submit Ticket
//       </button>
//     </form>
//   );
// }


