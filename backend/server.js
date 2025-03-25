import express from "express";
import cors from "cors";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import ticketRoute from "./routes/ticketRoute.js"
import userRoute from "./routes/userRoute.js";;
import { socketHandler } from "./sockets/SocketHandler.js"; 
import authRoutes from "./auth/login.js";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Created uploads directory at:", uploadsDir);
} else {
  console.log("Uploads directory already exists at:", uploadsDir);
}

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();



app.use("/", authRoutes);
app.use("/api/tickets", ticketRoute);
app.use("/api/users", userRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

global.io = io;

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
