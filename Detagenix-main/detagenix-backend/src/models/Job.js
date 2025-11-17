import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Internship", "Full-time", "Part-time"], default: "Full-time" },
  duration: { type: String, default: "N/A" },
  location: { type: String, required: true },
  stipend: { type: String, default: "Competitive" },
  description: { type: String, required: true },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
