import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { blogsData as fallbackBlogs } from "../../data/blogsData";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogList, setBlogList] = useState(fallbackBlogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blogs`);
        if (Array.isArray(data) && data.length > 0) {
          setBlogList(data);
        } else {
          setBlogList(fallbackBlogs);
        }
      } catch (err) {
        console.error("Failed to load blog list:", err);
        setBlogList(fallbackBlogs);
      }
    };

    fetchBlogs();
  }, [BASE_URL]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blogs/${slug}`);
        setBlog(data);
        setError("");
      } catch (err) {
        console.error("Failed to load blog:", err);
        const backup = fallbackBlogs.find((b) => b.slug === slug);
        if (backup) {
          setBlog(backup);
          setError(
            "Live blog data unavailable. Showing last saved version instead."
          );
        } else {
          setBlog(null);
          setError("Blog not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [BASE_URL, slug]);

  const sortedBlogs = useMemo(() => {
    return [...blogList].sort((a, b) => {
      const aDate = new Date(a.createdAt || a.date || 0).getTime();
      const bDate = new Date(b.createdAt || b.date || 0).getTime();
      return aDate - bDate;
    });
  }, [blogList]);

  const currentIndex = sortedBlogs.findIndex((b) => b.slug === slug);
  const prevBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex !== -1 && currentIndex < sortedBlogs.length - 1
      ? sortedBlogs[currentIndex + 1]
      : null;

  if (loading && !blog) {
    return <p className="blog-detail-status">Loading blog...</p>;
  }

  if (!blog) {
    return <h2 className="blog-detail-status">Blog not found.</h2>;
  }

  const publishedDate = blog.date || blog.createdAt;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently published";

  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  return (
    <div className="blog-detail-container">
      {error && <p className="blog-detail-status warning">{error}</p>}

      <img
        src={
          blog.bannerImage ||
          "https://via.placeholder.com/1200x600?text=Detagenix+Blog"
        }
        alt={blog.title}
        className="blog-detail-banner"
      />

      <h1 className="blog-detail-title">{blog.title}</h1>

      <p className="blog-detail-meta">
        By <span>{blog.author}</span> • {formattedDate} • {blog.category}
      </p>

      {tags.length > 0 && (
        <div className="blog-detail-tags">
          {tags.map((tag, i) => (
            <span key={i} className="blog-detail-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="blog-detail-nav">
        {prevBlog ? (
          <Link to={`/blog/${prevBlog.slug}`} className="nav-btn">
            ← Previous
          </Link>
        ) : (
          <div></div>
        )}

        {nextBlog ? (
          <Link to={`/blog/${nextBlog.slug}`} className="nav-btn">
            Next →
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
