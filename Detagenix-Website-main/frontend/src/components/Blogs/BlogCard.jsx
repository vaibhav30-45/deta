import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <div class="blog-card-container">
    <div className="blog-card">
      <img src={blog.bannerImage} alt={blog.title} className="blog-card-img" />

      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-date">{blog.date}</p>

        <div className="blog-card-tags">
          {blog.tags.map((tag, i) => (
            <span key={i} className="blog-tag">{tag}</span>
          ))}
        </div>

        <Link to={`/blog/${blog.slug}`} className="read-more-btn">
          Read  →
        </Link>
      </div>
    </div>
    </div>
  );
};

export default BlogCard;
