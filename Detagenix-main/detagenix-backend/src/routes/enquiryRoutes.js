// src/routes/enquiryRoutes.js

import express from "express";
import Enquiry from "../models/Enquiry.js";

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
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching enquiries" });
  }
});

export default router;