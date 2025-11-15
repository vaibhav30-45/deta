// src/routes/jobRoutes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllJobs);

// Admin only
router.post("/", verifyToken, createJob);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

export default router;
