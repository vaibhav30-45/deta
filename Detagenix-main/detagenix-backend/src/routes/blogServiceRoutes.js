import express from "express";
import BlogService from "../models/BlogService.js";

const router = express.Router();

// ✅ GET ALL SERVICES
router.get("/", async (req, res) => {
  try {
    const services = await BlogService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// ✅ GET SINGLE SERVICE
router.get("/:id", async (req, res) => {
  try {
    const service = await BlogService.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// ✅ CREATE NEW SERVICE
router.post("/", async (req, res) => {
  try {
    const { title, description, icon, link } = req.body;

    const newService = new BlogService({
      title,
      description,
      icon,
      link,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

// ✅ UPDATE SERVICE
router.put("/:id", async (req, res) => {
  try {
    const { title, description, icon, link } = req.body;

    const updatedService = await BlogService.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        icon,
        link,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedService) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service updated successfully", service: updatedService });
  } catch (err) {
    res.status(500).json({ error: "Failed to update service" });
  }
});

// ✅ DELETE SERVICE
router.delete("/:id", async (req, res) => {
  try {
    await BlogService.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

export default router;
