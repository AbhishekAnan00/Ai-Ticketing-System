import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/")
  .get(getUsers)
  .post(createUser);

router.post("/login", loginUser);

export default router;
