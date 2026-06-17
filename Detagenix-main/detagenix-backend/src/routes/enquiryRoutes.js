// src/routes/enquiryRoutes.js

import express from "express";
import Enquiry from "../models/Enquiry.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST - save enquiry
router.post("/", async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving enquiry" });
  }
});

// GET - fetch all enquiries
router.get("/", verifyToken, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching enquiries" });
  }
});

router.put("/:id/status", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validation: 
  const validStatuses = ["pending", "connected"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true } // {new: true} 
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.json({ message: "Status updated successfully", updatedEnquiry });
  } catch (err) {
    console.error("Error updating enquiry status:", err);
    res.status(500).json({ error: "Error updating enquiry status" });
  }
});

export default router;