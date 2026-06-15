import React from "react";
import BlogList from "../../components/Blogs/BlogList.jsx";
import SEO from "../../components/SEO";
import { useEffect } from "react";

const BlogPage = () => {
     useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div >
      <SEO
        title="Blog | Detagenix"
        description="Explore the latest insights, technology trends, software development guides, AI innovations, and digital transformation articles from Detagenix."
        keywords="Detagenix blog, software development blog, AI blog, technology articles, web development"
        canonical="https://unique-moxie-9ac77b.netlify.app/blog"
      />
      <BlogList />
    </div>
  );
};

export default BlogPage;
