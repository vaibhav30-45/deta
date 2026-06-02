import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { blogsData as fallbackBlogs } from "../../data/blogsData";
import "./BlogList.css";

const categories = [
  { label: "All Blogs", value: "all" },
  { label: "AI/ML", value: "AI" },
  { label: "Development", value: "Development" },
  { label: "Cloud & DevOps", value: "Cloud" },
  { label: "CyberSecurity", value: "Cybersecurity" },
  { label: "Blockchain", value: "Blockchain" },
  { label: "Data Analytics", value: "Data" }
];

const BlogList = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(fallbackBlogs);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs`);
        let data = res.data;
        if (!data) data = [];
        if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
          data = data.value;
        }

        let allBlogs = [];
        if (Array.isArray(data) && data.length > 0) {
          allBlogs = [...data];
        }

        if (Array.isArray(fallbackBlogs)) {
          allBlogs = [...allBlogs, ...fallbackBlogs];
        }

        const sorted = allBlogs.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        });

        setBlogs(sorted);
        setFilteredBlogs(sorted);
        setError("");
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setError("Unable to load latest blogs. Showing saved examples.");
        setBlogs(fallbackBlogs);
        setFilteredBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [BASE_URL]);

  // Client-side filtering logic
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) => {
        const titleMatch = blog.title?.toLowerCase().includes(activeCategory.toLowerCase());
        const categoryMatch = blog.category?.toLowerCase() === activeCategory.toLowerCase();
        const tagMatch = blog.tags?.some((t) =>
          t.toLowerCase().includes(activeCategory.toLowerCase()) ||
          (activeCategory === "Cloud" && t.toLowerCase().includes("devops")) ||
          (activeCategory === "Development" && (t.toLowerCase().includes("react") || t.toLowerCase().includes("web") || t.toLowerCase().includes("javascript")))
        );
        return titleMatch || categoryMatch || tagMatch;
      });
      setFilteredBlogs(filtered);
    }
  }, [activeCategory, blogs]);

  return (
    <div className="blog-page-wrapper">
      {/* 1. HERO BANNER */}
      <section className="blog-hero-section">
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
          <h1>Insights. Ideas. <span className="highlight">Innovation.</span></h1>
          <p>
            Stay ahead of the curve with our latest updates, industry reports, software engineering best practices, and tech tutorials.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="blog-filters-container">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-tab-btn ${activeCategory === cat.value ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. BLOG GRID */}
      <div className="blog-list-container">
        {loading ? (
          <p className="blog-status">Loading latest blogs...</p>
        ) : error ? (
          <p className="blog-status error">{error}</p>
        ) : null}

        {!loading && filteredBlogs.length === 0 ? (
          <div className="no-blogs-found">
            <p>No articles found matching this category.</p>
            <button className="reset-filter-btn" onClick={() => setActiveCategory("all")}>View All Blogs</button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id || blog.id || blog.slug}
                blog={blog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
