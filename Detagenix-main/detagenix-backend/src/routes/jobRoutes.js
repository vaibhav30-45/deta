// src/routes/jobRoutes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

// Public
router.get("/", getAllJobs);

// Admin routes (authentication removed for admin panel compatibility)
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
