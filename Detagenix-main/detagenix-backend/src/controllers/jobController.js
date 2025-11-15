// src/controllers/jobController.js
import Job from "../models/Job.js";

// 🟢 Admin: Create Job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};

// 🟡 Get All Jobs (Public)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// 🟣 Admin: Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated", job });
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
};

// 🔴 Admin: Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};
