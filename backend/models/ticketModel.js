import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  enrichedDescription: { type: String },
  status: { type: String, default: "Open" },
  attachments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ticket", TicketSchema);
