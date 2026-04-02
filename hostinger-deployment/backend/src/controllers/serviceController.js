import { Service,User } from '../models/Service.js'; // Adjust path as needed
import bcrypt from 'bcryptjs';

import { Booking } from "../models/Service.js"; // ✅ correct import




export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const bookService = async (req, res) => {
  try {
    // console.log("Booking request body:", req.body); // check what is received

    const { name, email, service, technology } = req.body;
    if (!name || !email || !service || !technology) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save booking
    const newBooking = new Booking({ name, email, service ,technology });
    const savedBooking = await newBooking.save();

    // console.log("Saved booking:", savedBooking); // Should print saved document

    res.status(201).json({ message: "Booking applied successfully!" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




export const addService = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newService = new Service({ name, description });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const editService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { name, description },
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const deleted = await Service.findByIdAndDelete(serviceId);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
