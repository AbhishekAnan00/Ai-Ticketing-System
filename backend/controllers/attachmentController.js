import Ticket from "../models/ticketModel.js";

export const uploadAttachment = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const attachmentUrl = `/uploads/${file.filename}`;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    if (!ticket.attachments) {
      ticket.attachments = [];
    }
    ticket.attachments.push(attachmentUrl);
    await ticket.save();

    res.status(200).json({ message: "File uploaded successfully", attachmentUrl });
  } catch (error) {
    console.error("Error uploading attachment:", error);
    res.status(500).json({ message: error.message });
  }
};
