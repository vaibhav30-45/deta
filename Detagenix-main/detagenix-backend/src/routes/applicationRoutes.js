// src/routes/applicationRoutes.js
import express from "express";
import {
  applyToJob,
  // getAllApplications,
} from "../controllers/applicationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();

// Public - Apply to Job (with resume upload)
router.post("/apply", upload.single("resume"), applyToJob);
// router.post(
//   "/apply",
//   (req,res,next)=>{
//     console.log("API HIT");
//     next();
//   },
//   upload.single("resume"),
//   (err,req,res,next)=>{
//     console.log("MULTER ERROR:", err);
//     res.status(500).json({
//       message: err.message
//     });
//   },
//   applyToJob
// );

// Admin - Get all applications
// router.get("/", verifyToken, getAllApplications);

export default router;
