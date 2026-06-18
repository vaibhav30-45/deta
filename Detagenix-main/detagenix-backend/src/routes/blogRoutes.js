import express from "express";
import Blog from "../models/Blog.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/blogUpload.js";

const router = express.Router();
router.use((req,res,next)=>{
  console.log("BLOG ROUTE HIT:", req.method, req.url);
  next();
});

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
router.post(
  "/",
  verifyToken,
  (req,res,next)=>{
    upload.single("bannerImage")(req,res,(err)=>{
      if(err){
        console.log("UPLOAD ERROR:", err);
        return res.status(500).json({
          error: err.message
        });
      }
      next();
    })
  },
  async (req, res) =>  {
  try {
    const { title, slug, author,  metaKeywords, category, content } = req.body;
    
     const keywordsArray = metaKeywords
  ? metaKeywords.split(",").map(k => k.trim())
  : [];
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // const newBlog = new Blog({
    //   title,
    //   slug,
    //   author,
    //   bannerImage,
    //   tags,
    //   category,
    //   content,
    // });
    console.log("BLOG FILE:", req.file);
console.log("BLOG DATA:", {
  title,
  slug,
  author,
  metaKeywords: keywordsArray,
  category,
});
    const newBlog = new Blog({
  title,
  slug,
  author,

  bannerImage: req.file?.path,

  metaKeywords: keywordsArray,
  category,
  content,
});

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ 
  error: err.message 
});
  }
});


// ✅ UPDATE BLOG
router.put("/:id", verifyToken, upload.single("bannerImage"), async (req,res)=> {
  try {
    const { title, slug, author,  metaKeywords, category, content } = req.body;

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

  bannerImage: req.file?.path,

  metaKeywords,
  category,
  content,
  updatedAt:new Date()
 },
 {new:true}
)

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ✅ DELETE BLOG
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
