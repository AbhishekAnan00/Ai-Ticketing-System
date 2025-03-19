// backend/models/Ticket.js or User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
