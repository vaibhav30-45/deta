// src/controllers/authController.js
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 Login only (no register route)
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin (only one exists)
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    // compare passwords
    if (password !== admin.password) {
  return res.status(400).json({ message: "Invalid credentials" });
}


    // generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
