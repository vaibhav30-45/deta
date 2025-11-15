// src/routes/authRoutes.js
import express from "express";
import { loginAdmin } from "../controllers/authController.js";

const router = express.Router();

// only login route available
router.post("/login", loginAdmin);

export default router;
