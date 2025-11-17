// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js"; 

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:3000", // frontend port
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);


app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Detagenix Backend Running ");
});

app.listen(port, () => {
  console.log(`🚀 Server running on PORT ${port}`);
});
