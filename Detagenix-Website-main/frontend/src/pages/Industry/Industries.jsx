import React, { useEffect } from "react";
import "./Industries.css";
import {
  FaLock,
  FaShoppingCart,
  FaBook,
  FaBolt,
  FaUniversity,
  FaLandmark,
  FaHeartbeat,
  FaBalanceScale,
  FaIndustry,
  FaBuilding,
  FaPhoneAlt,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

const Industries = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // All 12 industries displayed as a static card grid (Figma: "Solutions Across Industries" section)
  const industries = [
    {
      icon: <FaLock />,
      title: "Cyber Security",
      desc: "Secure systems, data protection, and threat monitoring solutions.",
    },
    {
      icon: <FaBook />,
      title: "Ed Tech",
      desc: "Smart digital learning platforms and virtual education solutions.",
    },
    {
      icon: <FaLandmark />,
      title: "Commerce",
      desc: "Secure and efficient governance commerce solutions.",
    },
    {
      icon: <FaUniversity />,
      title: "Finance & Banking",
      desc: "Modern fintech, banking security, and digital payment systems.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Legal & Services",
      desc: "Legal automation and secure professional workflow solutions.",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Telecommunication",
      desc: "Reliable communication and scalable network solutions.",
    },
    {
      icon: <FaShoppingCart />,
      title: "E-Commerce & Retail",
      desc: "Modern online shopping and customer engagement platforms.",
    },
    {
      icon: <FaBolt />,
      title: "Energy & Utility",
      desc: "Smart energy management and utility monitoring systems.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Healthcare",
      desc: "Secure healthcare platforms and digital patient solutions.",
    },
    {
      icon: <FaIndustry />,
      title: "Manufacturing",
      desc: "Automation and smart manufacturing technology solutions.",
    },
    {
      icon: <FaBuilding />,
      title: "Real Estate",
      desc: "Modern property management and real estate platforms.",
    },
    {
      icon: <FaTruck />,
      title: "Transportation & Logistics",
      desc: "Smart logistics, tracking, and supply chain solutions.",
    },
  ];


  return (
    <div className="industries-page">

      {/* — Hero Section: dark centered layout */}
      <section className="ind-hero-section">
        <div className="ind-hero-overlay" />
        <div className="ind-hero-inner">
          <h1>
            Solutions for{" "}
            <span className="ind-hero-highlight">Every Industry.</span>
          </h1>
          <p>
            At Detagenix, we help organizations across industries embrace
            technology, streamline operations, and innovate for the future.
          </p>
        </div>
      </section>

      <section className="ind-grid-section fade-up">
        <div className="ind-section-header">
          <h2>
            Solutions Across{" "}
            <span className="ind-accent">Industries</span>
          </h2>
          <div className="ind-title-underline" />
        </div>
        <div className="ind-card-grid">
          {industries.map((ind, i) => (
            <div className="ind-card" key={i}>
              <div className="ind-card-icon">{ind.icon}</div>
              <h4 className="ind-card-title">{ind.title}</h4>
              <p className="ind-card-desc">{ind.desc}</p>
              <div className="ind-card-arrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </section>




    </div>
  );
};

export default Industries;