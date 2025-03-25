
import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import { connectDB } from "../config/db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await connectDB();

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, name });
  res.status(201).json({ message: "User created successfully", userId: user._id });
}

