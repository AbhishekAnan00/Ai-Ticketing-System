import Ticket from "../models/ticketModel.js";
import { generateTicketDetails } from "../services/aiService.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description , status: "Processing..."});
    await ticket.save();
    res.status(201).json(ticket);

    try {
      const enrichedDetails = await generateTicketDetails(description);
      ticket.enrichedDescription = enrichedDetails;
      ticket.status = "Enriched";
      await ticket.save();

      if (global.io) {
        global.io.emit("ticketUpdated", ticket);
      } 

    } catch (aiError) {
      console.error("AI enrichment failed:", aiError);
      ticket.status = "Open";
      await ticket.save();
      if (global.io) {
        global.io.emit("ticketUpdated", ticket);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
