// backend/routes/ticketRoutes.js
import express from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";

const router = express.Router();

router.route("/").get(getTickets).post(createTicket);

export default router;
