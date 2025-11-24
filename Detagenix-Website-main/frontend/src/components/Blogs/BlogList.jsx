import React, { useEffect, useState } from "react";
// keep imports minimal; no route-based filtering here
import axios from "axios";
import BlogCard from "./BlogCard";
import { blogsData as fallbackBlogs } from "../../data/blogsData";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [visibleCount, setVisibleCount] = useState(3);
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

        // Ensure we have an array and sort newest-first by createdAt/date
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.slice().sort((a, b) => {
            const da = new Date(a.createdAt || a.date || 0).getTime();
            const db = new Date(b.createdAt || b.date || 0).getTime();
            return db - da;
          });
          setBlogs(sorted);
        } else {
          setBlogs(fallbackBlogs);
        }
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

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
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
            const sorted = Array.isArray(blogs) ? blogs.slice().sort((a, b) => {
              const da = new Date(a.createdAt || a.date || 0).getTime();
              const db = new Date(b.createdAt || b.date || 0).getTime();
              return db - da;
            }) : [];

            const main = sorted.slice(0, 3);
            const readMore = sorted.slice(3);

            return (
              <>
                <div className="blog-grid">
                  {main.map((blog) => (
                    <BlogCard key={blog._id || blog.id || blog.slug} blog={blog} />
                  ))}
                </div>

                {readMore.length > 0 && (
                  <>
                    <h2
                      className="read-more-title"
                      onClick={() => setShowReadMore(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Load More
                    </h2>

                    {showReadMore && (
                      <div className="blog-grid">
                        {readMore.map((blog) => (
                          <BlogCard key={blog._id || blog.id || blog.slug} blog={blog} />
                        ))}
                      </div>
                    )}
                  </>
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
