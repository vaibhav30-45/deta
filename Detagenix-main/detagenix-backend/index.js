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
import blogRoutes from "./src/routes/blogRoutes.js";
import blogServiceRoutes from "./src/routes/blogServiceRoutes.js"; 
import testimonialRoutes from "./src/routes/testimonialRoutes.js";
import enquiryRoutes from "./src/routes/enquiryRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;
// CORS: allow frontend dev servers (3000 and 3001) and any FRONTEND_URL from env
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const allowedOrigins = [FRONTEND_URL, "http://localhost:3001"];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog-services", blogServiceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Detagenix Backend Running ");
});

app.listen(port, () => {
  console.log(`🚀 Server running on PORT ${port}`);
});
