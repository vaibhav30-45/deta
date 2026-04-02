import Contact from "../models/Contact.js";

// 🟢 Save a new contact message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Message sent successfully ✅",
      contact: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending message ❌",
      error: error.message,
    });
  }
};

// 🟣 (Optional) Admin: View all contact messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages ❌",
      error: error.message,
    });
  }
};
