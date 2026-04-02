// src/routes/applicationRoutes.js
import express from "express";
import {
  applyToJob,
  // getAllApplications,
} from "../controllers/applicationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();

// Public - Apply to Job (with resume upload)
router.post("/apply", upload.single("resume"), applyToJob);

// Admin - Get all applications
// router.get("/", verifyToken, getAllApplications);

export default router;
