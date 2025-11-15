import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { blogsData } from "../../data/blogsData";
import "./BlogList.css";

const BlogList = () => {
  const [visibleCount, setVisibleCount] = useState(3); // for simple pagination

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="blog-list-container">
      <h1 className="blog-list-title">Latest Blogs</h1>

      <div className="blog-grid">
        {blogsData.slice(0, visibleCount).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {visibleCount < blogsData.length && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default BlogList;
