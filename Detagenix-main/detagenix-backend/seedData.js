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

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany({});
    await Application.deleteMany({});
    await Contact.deleteMany({});
    await Job.deleteMany({});
    await Service.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    console.log("🧹 Cleared existing data\n");

    // Add Sample Admin Users
    const admins = await Admin.insertMany([
      { name: "Admin User", email: "admin@detagenix.com", password: "hashed_password" },
      { name: "Manager", email: "manager@detagenix.com", password: "hashed_password" }
    ]);
    console.log(`✅ Added ${admins.length} Admin Users`);

    // Add Sample Job Applications
    const applications = await Application.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        role: "Full Stack Developer",
        message: "Excited to join Detagenix team",
        appliedAt: new Date()
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "UI/UX Designer",
        message: "Love your design philosophy",
        appliedAt: new Date()
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "DevOps Engineer",
        message: "Interested in your infrastructure",
        appliedAt: new Date()
      }
    ]);
    console.log(`✅ Added ${applications.length} Job Applications`);

    // Add Sample Contacts
    const contacts = await Contact.insertMany([
      {
        name: "Alice Cooper",
        email: "alice@example.com",
        message: "Great services! Would like to know more about your packages.",
        createdAt: new Date()
      },
      {
        name: "Bob Wilson",
        email: "bob@example.com",
        message: "Need consultation for our startup project",
        createdAt: new Date()
      },
      {
        name: "Carol Davis",
        email: "carol@example.com",
        message: "Impressed with your portfolio. Let's discuss collaboration.",
        createdAt: new Date()
      }
    ]);
    console.log(`✅ Added ${contacts.length} Contact Submissions`);

    // Add Sample Jobs
    const jobs = await Job.insertMany([
      {
        title: "Senior React Developer",
        description: "We are looking for experienced React developers",
        location: "Remote",
        salary: "$100k - $120k",
        createdAt: new Date()
      },
      {
        title: "Cloud Architect",
        description: "Design and manage cloud infrastructure",
        location: "Bangalore, India",
        salary: "$120k - $150k",
        createdAt: new Date()
      },
      {
        title: "Security Analyst",
        description: "Cybersecurity professional needed",
        location: "USA",
        salary: "$110k - $140k",
        createdAt: new Date()
      }
    ]);
    console.log(`✅ Added ${jobs.length} Job Listings`);

    // Add Sample Services
    const services = await Service.insertMany([
      {
        name: "Cybersecurity Solutions",
        description: "End-to-end protection for your digital infrastructure"
      },
      {
        name: "AI Development",
        description: "Custom AI solutions for your business"
      },
      {
        name: "Blockchain Services",
        description: "Decentralized solutions with blockchain technology"
      }
    ]);
    console.log(`✅ Added ${services.length} Services`);

    // Add Sample Users
    const users = await User.insertMany([
      {
        email: "user1@example.com",
        password: "hashed_password",
        role: "user"
      },
      {
        email: "user2@example.com",
        password: "hashed_password",
        role: "user"
      }
    ]);
    console.log(`✅ Added ${users.length} Users`);

    // Add Sample Bookings
    const bookings = await Booking.insertMany([
      {
        name: "Service Customer 1",
        email: "customer1@example.com",
        service: "Cybersecurity",
        technology: "AWS",
        bookingDate: new Date()
      },
      {
        name: "Service Customer 2",
        email: "customer2@example.com",
        service: "AI Development",
        technology: "Python",
        bookingDate: new Date()
      },
      {
        name: "Service Customer 3",
        email: "customer3@example.com",
        service: "Blockchain",
        technology: "Solidity",
        bookingDate: new Date()
      }
    ]);
    console.log(`✅ Added ${bookings.length} Bookings`);

    console.log("\n✅ Sample data seeded successfully!\n");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
