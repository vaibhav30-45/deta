import express from "express";
import { sendMessage, getAllMessages } from "../controllers/contactController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route — anyone can send a message
router.post("/", sendMessage);

// Admin route — view all messages
router.get("/", verifyToken, getAllMessages);

export default router;
