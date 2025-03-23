import express from "express";
import multer from "multer";
import { createTicket, getTickets, getTicketById, deleteTicket } from "../controllers/ticketController.js";
import { uploadAttachment } from "../controllers/attachmentController.js";

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });


router.route("/")
  .get(getTickets)
  .post(createTicket);


router.route("/:id")
  .get(getTicketById)
  .delete(deleteTicket);


router.post("/:id/attachments", upload.single("attachment"), uploadAttachment);


export default router;
