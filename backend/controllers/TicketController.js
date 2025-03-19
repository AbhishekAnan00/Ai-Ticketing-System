// backend/controllers/ticketController.js
import Users from "../models/Users.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await Users.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
