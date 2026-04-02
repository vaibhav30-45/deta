import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },      // ✅ add
  message: { type: String },                   // ✅ add
  resumeUrl: { type: String, required: true }, // ✅ add
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
