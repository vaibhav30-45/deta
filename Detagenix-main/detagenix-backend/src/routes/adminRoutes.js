import express from "express";
import Admin from "../models/Admin.js";
import Application from "../models/Application.js";
import Contact from "../models/Contact.js";
import Job from "../models/Job.js";
import { Service, User, Booking } from "../models/Service.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(verifyToken);

// ✅ GET ALL DATA FOR ADMIN DASHBOARD
router.get("/data", async (req, res) => {
  try {
    const [admins, applications, contacts, jobs, services, users, bookings] = await Promise.all([
      Admin.find(),
      Application.find(),
      Contact.find(),
      Job.find(),
      Service.find(),
      User.find(),
      Booking.find(),
    ]);

    res.json({
      admins,
      applications,
      contacts,
      jobs,
      services,
      users,
      bookings,
    });
  } catch (err) {
    console.error("Error fetching admin data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ GET STATISTICS
router.get("/stats", async (req, res) => {
  try {
    const stats = {
      totalAdmins: await Admin.countDocuments(),
      totalApplications: await Application.countDocuments(),
      totalContacts: await Contact.countDocuments(),
      totalJobs: await Job.countDocuments(),
      totalServices: await Service.countDocuments(),
      totalUsers: await User.countDocuments(),
      totalBookings: await Booking.countDocuments(),
    };

    res.json(stats);
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// ✅ DELETE APPLICATION
router.delete("/applications/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

// ✅ DELETE CONTACT
router.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// ✅ DELETE BOOKING
router.delete("/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

export default router;
