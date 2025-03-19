// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { socketHandler } from "./sockets/socketHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use("/api/tickets", ticketRoutes);

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // adjust this in production
  },
});
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
