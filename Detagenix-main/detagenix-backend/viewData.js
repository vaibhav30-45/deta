import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";
import Application from "./src/models/Application.js";
import Contact from "./src/models/Contact.js";
import Job from "./src/models/Job.js";
import { Service, User, Booking } from "./src/models/Service.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected\n");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

const viewAllData = async () => {
  try {
    // View Admin Users
    console.log("📊 ====== ADMIN USERS ======");
    const admins = await Admin.find();
    console.log(`Total: ${admins.length}`);
    console.table(admins);
    console.log("\n");

    // View Job Applications
    console.log("📊 ====== JOB APPLICATIONS ======");
    const applications = await Application.find();
    console.log(`Total: ${applications.length}`);
    console.table(applications);
    console.log("\n");

    // View Contact Submissions
    console.log("📊 ====== CONTACT SUBMISSIONS ======");
    const contacts = await Contact.find();
    console.log(`Total: ${contacts.length}`);
    console.table(contacts);
    console.log("\n");

    // View Jobs
    console.log("📊 ====== JOBS ======");
    const jobs = await Job.find();
    console.log(`Total: ${jobs.length}`);
    console.table(jobs);
    console.log("\n");

    // View Services
    console.log("📊 ====== SERVICES ======");
    const services = await Service.find();
    console.log(`Total: ${services.length}`);
    console.table(services);
    console.log("\n");

    // View Users
    console.log("📊 ====== REGISTERED USERS ======");
    const users = await User.find();
    console.log(`Total: ${users.length}`);
    console.table(users);
    console.log("\n");

    // View Bookings
    console.log("📊 ====== SERVICE BOOKINGS ======");
    const bookings = await Booking.find();
    console.log(`Total: ${bookings.length}`);
    console.table(bookings);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await viewAllData();
};

main();
