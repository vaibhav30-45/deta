import React from "react";
import BlogDetail from "../../components/Blogs/BlogDetail.jsx";
import { useEffect } from "react";

const BlogDetailPage = () => {
  useEffect(() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }, []);
  return (
    <div style={{ paddingTop: "30px" }}>
      <BlogDetail />
    </div>
  );
};

export default BlogDetailPage;
