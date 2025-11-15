import Application from "../models/Application.js";

export const applyToJob = async (req, res) => {
  try {
    const { name, email, role, message } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const application = await Application.create({
      name,
      email,
      role,
      message,
      resumeUrl: req.file.filename,
    });

    return res.status(201).json({
      message: "Application submitted successfully ✅",
      application,
    });

  } catch (error) {
    console.error("Apply Error:", error);
    return res.status(500).json({
      message: "Error applying to job ❌",
      error: error.message,
    });
  }
};
