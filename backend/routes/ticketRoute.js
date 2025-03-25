import express from "express";
import multer from "multer";
import { uploadAttachment } from "../controllers/attachmentController.js";
import { createTicket, deleteTicket, getTicketById, getTickets } from "../controllers/TicketController.js";

const router = express.Router();

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
