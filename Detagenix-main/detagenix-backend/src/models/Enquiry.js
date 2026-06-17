// src/models/Enquiry.js

import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone: String,
  company_name: String,
  project_type: String,
  description: String,
  budget: String,
  timeline: String,
  goal: String,
  status: {
    type: String,
    enum: ["pending", "connected"],
    default: "pending" // Nayi enquiry aate hi automatically 'pending' ho jayegi
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Enquiry", enquirySchema);