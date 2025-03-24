import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

// GET /api/users – retrieve all users (for testing)
// POST /api/users – register a new user
router.route("/")
  .get(getUsers)
  .post(createUser);

// POST /api/users/login – user login endpoint
router.post("/login", loginUser);

export default router;
