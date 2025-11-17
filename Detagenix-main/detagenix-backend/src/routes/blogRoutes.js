import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// ✅ GET SINGLE BLOG BY SLUG
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// ✅ CREATE NEW BLOG
router.post("/", async (req, res) => {
  try {
    const { title, slug, author, bannerImage, tags, category, content } = req.body;

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    const newBlog = new Blog({
      title,
      slug,
      author,
      bannerImage,
      tags,
      category,
      content,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// ✅ UPDATE BLOG
router.put("/:id", async (req, res) => {
  try {
    const { title, slug, author, bannerImage, tags, category, content } = req.body;

    // Check if new slug already exists (if slug is being changed)
    if (slug) {
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingBlog) {
        return res.status(400).json({ error: "Slug already exists" });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        slug,
        author,
        bannerImage,
        tags,
        category,
        content,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ✅ DELETE BLOG
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
