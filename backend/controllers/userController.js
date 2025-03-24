
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";

export const createUser = async (req, res) => {
  try {
    await connectDB();
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "required fields", });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    await connectDB();
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

try {
  await connectDB();

  const { email, password } = req.body;
  console.log("Login attempt for email:", email);

  if (!email || !password) {
    console.error("Missing required fields");
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.error("User not found with email:", email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    console.error("Invalid password for user:", email);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not defined in environment variables");
    return res.status(500).json({ message: "Server configuration error" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  console.log("User logged in successfully:", email);
  res.status(200).json({ token });
} catch (error) {
  console.error("Login error:", error);
  res.status(500).json({ message: error.message });
};




  