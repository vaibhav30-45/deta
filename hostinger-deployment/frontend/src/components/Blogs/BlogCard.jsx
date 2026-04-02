import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  const publishedDate = blog?.date || blog?.createdAt;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently published";

  const tags = Array.isArray(blog?.tags) ? blog.tags : [];
  const image =
    blog?.bannerImage ||
    "https://via.placeholder.com/600x400?text=Detagenix+Blog";

  return (
    <div className="blog-card-container">
      <div className="blog-card">
        <img src={image} alt={blog?.title} className="blog-card-img" />

        <div className="blog-card-body">
          <h3 className="blog-card-title">{blog?.title}</h3>
          <p className="blog-card-date">{formattedDate}</p>

          {tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.map((tag, i) => (
                <span key={i} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link to={`/blog/${blog?.slug}`} className="read-more-btn">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
