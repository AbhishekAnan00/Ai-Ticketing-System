import express from "express" ;
import { createTicket, getTickets } from "../controllers/TicketController.js";

const router = express.Router();

router.route("/")
  .get(getTickets)
  .post(createTicket);

export default router;
