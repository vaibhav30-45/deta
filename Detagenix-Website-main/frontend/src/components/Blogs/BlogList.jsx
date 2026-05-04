import React, { useEffect, useState } from "react";
// keep imports minimal; no route-based filtering here
import axios from "axios";
import BlogCard from "./BlogCard";
import { blogsData as fallbackBlogs } from "../../data/blogsData";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
  // no route-based filtering -- show exact slices

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/blogs`);
        // Normalize response: backend may return an array or an object wrapper
        let data = res.data;
        if (!data) data = [];
        if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
          data = data.value;
        }

        // Merge database blogs with fallback blogs
        let allBlogs = [];

        // Add database blogs (from API)
        if (Array.isArray(data) && data.length > 0) {
          allBlogs = [...data];
        }

        // Add fallback blogs (static data)
        if (Array.isArray(fallbackBlogs)) {
          allBlogs = [...allBlogs, ...fallbackBlogs];
        }

        // Sort all blogs newest-first by createdAt/date
        const sorted = allBlogs.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || 0);
          const dateB = new Date(b.createdAt || b.date || 0);
          return dateB - dateA;
        });

        setBlogs(sorted);
        setError("");
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setError("Unable to load latest blogs. Showing saved examples.");
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [BASE_URL]);

  // eslint-disable-next-line no-unused-vars
  const [showReadMore, setShowReadMore] = useState(false);

  return (
    <div className="blog-list-container">
      <h1 className="blog-list-title">Latest Blogs</h1>

      {loading ? (
        <p className="blog-status">Loading blogs...</p>
      ) : error ? (
        <p className="blog-status error">{error}</p>
      ) : null}

      {/* Main: show newest 3 blogs (newest first) */}
      {blogs.length > 0 && (
        <>
          {(() => {
            // Ensure strict newest-first ordering, then slice
            const sorted = Array.isArray(blogs)
              ? blogs.slice().sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
              : [];

            const main = sorted.slice(0, 3);
            const readMore = sorted.slice(3);

            return (
              <>
                <div className="blog-grid">
                  {main.map((blog) => (
                    <BlogCard
                      key={blog._id || blog.id || blog.slug}
                      blog={blog}
                    />
                  ))}
                </div>

                {readMore.length > 0 && !showReadMore && (
                  <h2
                    className="read-more-title"
                    onClick={() => setShowReadMore(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Read More
                  </h2>
                )}

                {showReadMore && (
                  <div className="read-more-section">
                    <div className="blog-grid">
                      {readMore.map((blog) => (
                        <BlogCard
                          key={blog._id || blog.id || blog.slug}
                          blog={blog}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default BlogList;
