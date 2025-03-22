import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { socketHandler } from "./sockets/SocketHandler.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/tickets", ticketRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
