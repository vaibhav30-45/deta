import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogsData } from "../../data/blogsData";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { slug } = useParams();
const sortedBlogs = [...blogsData].sort((a, b) => a.id - b.id);
  // find blog by slug
  const blog = sortedBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return <h2 style={{ padding: "40px" }}>Blog not found</h2>;
  }


  // get index for prev/next navigation
  
const currentIndex = sortedBlogs.findIndex((b) => b.slug === slug);
const prevBlog = sortedBlogs[currentIndex - 1];
const nextBlog = sortedBlogs[currentIndex + 1];

  return (
    <div className="blog-detail-container">

      {/* Banner */}
      <img src={blog.bannerImage} alt={blog.title} className="blog-detail-banner" />

      {/* Title */}
      <h1 className="blog-detail-title">{blog.title}</h1>

      {/* Meta info */}
      <p className="blog-detail-meta">
        By <span>{blog.author}</span> • {blog.date} • {blog.category}
      </p>

      {/* Tags */}
      <div className="blog-detail-tags">
        {blog.tags.map((tag, i) => (
          <span key={i} className="blog-detail-tag">{tag}</span>
        ))}
      </div>

      {/* Blog Content */}
      <div
        className="blog-detail-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Prev / Next Navigation */}
      <div className="blog-detail-nav">
        {prevBlog ? (
          <Link to={`/blog/${prevBlog.slug}`} className="nav-btn">← Previous</Link>
        ) : (
          <div></div>
        )}

        {nextBlog ? (
          <Link to={`/blog/${nextBlog.slug}`} className="nav-btn">Next →</Link>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  );
};

export default BlogDetail;
