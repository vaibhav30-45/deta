import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();


// ✅ GET - sab testimonials lana
router.get("/", async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST - naya testimonial add karna
router.post("/", async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();
    res.json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;