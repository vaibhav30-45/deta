import React, { useEffect } from "react";
import {
  FaLightbulb,
  FaHandshake,
  FaUserCheck,
  FaRegCheckCircle,
  FaCompass,
  FaEye,
  FaShieldAlt,
  FaUserFriends,
  FaUsers,
  FaBrain,
  FaAward,
  FaRegHandshake,
  FaRunning,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from "react-icons/fa";
import teamAvatar from "../../asset/Avatar.png";
import "./Aboutus.css";

const teamMembers = [
  {
    name: "Aman Sharma",
    role: "CEO & Founder",
    bio: "Ex-Google Architect with 12+ years of scaling enterprise SaaS solutions globally."
  },
  {
    name: "Priya Patel",
    role: "Chief Technology Officer",
    bio: "Deep tech specialist in AI/ML modeling and high-throughput data pipelines."
  },
  {
    name: "Rajesh Kumar",
    role: "Head of Engineering",
    bio: "Agile delivery expert managing our core engineering and dev squads."
  },
  {
    name: "Sneha Reddy",
    role: "Lead UI/UX Designer",
    bio: "Passionate about creating premium, accessible, and high-converting layouts."
  },
  {
    name: "Vikram Malhotra",
    role: "Lead Cloud Architect",
    bio: "AWS/Azure expert building highly resilient landing zones and CDNs."
  },
  {
    name: "Rohan Das",
    role: "Lead Frontend Developer",
    bio: "Focuses on React optimization, state management, and smooth micro-animations."
  },
  {
    name: "Anjali Verma",
    role: "Lead Backend Developer",
    bio: "Secures our API integrations and builds scalable server architecture."
  },
  {
    name: "Divya Joshi",
    role: "QA Automation Lead",
    bio: "Ensures production reliability through end-to-end integration testing."
  }
];

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-container">
          <div className="about-hero-left">
            <span className="hero-badge">About Detagenix</span>
            <h1>Driving Innovation & <span className="highlight">Digital Excellence</span></h1>
            <p className="hero-desc">
              Detagenix is a dynamic IT consulting and digital transformation organization dedicated to empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic software development to craft tailored, enterprise-grade applications specializing in MERN Stack, AI/ML, Blockchain, and Cybersecurity.
            </p>

            <div className="hero-stat-chips">
              <div className="stat-chip">
                <FaLightbulb className="chip-icon" />
                <span>Innovative Solutions</span>
              </div>
              <div className="stat-chip">
                <FaHandshake className="chip-icon" />
                <span>Dedicated Service</span>
              </div>
              <div className="stat-chip">
                <FaUserCheck className="chip-icon" />
                <span>Expert Team</span>
              </div>
              <div className="stat-chip">
                <FaRegCheckCircle className="chip-icon" />
                <span>Future Ready</span>
              </div>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-hero-visual-card">
              <div className="visual-circle circle-1"></div>
              <div className="visual-circle circle-2"></div>
              <div className="visual-glass-content">
                <span className="visual-years">10+</span>
                <span className="visual-text">Years of Engineering Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT DRIVES US */}
      <section className="what-drives-us-section">
        <div className="section-header">
          <h2 className="section-title">What Drives Us</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Our core foundation is built upon clear aspirations and long-term commitments to client success.</p>
        </div>

        <div className="drives-cards-row">
          <div className="drive-card">
            <div className="drive-icon-wrapper">
              <FaCompass className="drive-icon" />
            </div>
            <h3>Our Mission</h3>
            <p>
              To deliver exceptional, scalable digital products and cloud-native solutions that empower companies to thrive, automate complex workflows, and unlock sustainable business growth.
            </p>
          </div>

          <div className="drive-card">
            <div className="drive-icon-wrapper">
              <FaEye className="drive-icon" />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become a globally trusted digital transformation partner, recognized for client empathy, clean technical architectures, and high-performance software engineering.
            </p>
          </div>

          <div className="drive-card">
            <div className="drive-icon-wrapper">
              <FaShieldAlt className="drive-icon" />
            </div>
            <h3>Our Values</h3>
            <p>
              Building with integrity, choosing quality over speed, upholding transparent communication, and maintaining complete accountability in every line of code we ship.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OUR CORE VALUES */}
      <section className="core-values-grid-section">
        <div className="section-header">
          <h2 className="section-title">Our Core Values</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">The principles that guide our day-to-day work, engineering choices, and customer partnerships.</p>
        </div>

        <div className="core-values-modern-grid">
          <div className="value-item-card">
            <div className="value-icon-box">
              <FaUserFriends className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Customer First</h4>
              <p>We start with your business goals and trace backward to engineer the exact solution you require.</p>
            </div>
          </div>

          <div className="value-item-card">
            <div className="value-icon-box">
              <FaUsers className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Active Collaboration</h4>
              <p>Operating as a natural extension of your team with transparent weekly sprints and constant feedback loops.</p>
            </div>
          </div>

          <div className="value-item-card">
            <div className="value-icon-box">
              <FaBrain className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Continuous Innovation</h4>
              <p>Constantly upgrading our tech stacks and patterns to offer modern, cost-efficient cloud architectures.</p>
            </div>
          </div>

          <div className="value-item-card">
            <div className="value-icon-box">
              <FaAward className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Engineering Excellence</h4>
              <p>Zero compromises on clean coding principles, automated testing coverage, and detailed documentation.</p>
            </div>
          </div>

          <div className="value-item-card">
            <div className="value-icon-box">
              <FaRegHandshake className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Absolute Integrity</h4>
              <p>Honest pricing models, transparent bandwidth reporting, and complete IP protection for our clients.</p>
            </div>
          </div>

          <div className="value-item-card">
            <div className="value-icon-box">
              <FaRunning className="val-icon" />
            </div>
            <div className="value-info">
              <h4>Agile Adaptability</h4>
              <p>Swiftly responding to market updates, user analytics, and changing specifications without friction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEAMS BEHIND OUR SOLUTIONS */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Teams Behind Our Solutions</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Meet the certified specialists, designers, and software engineers driving digital transformation daily.</p>
        </div>

        <div className="team-grid-modern">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card-modern">
              <div className="team-avatar-wrapper">
                <img src={teamAvatar} alt={member.name} className="team-avatar-img" />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <span className="team-member-role">{member.role}</span>
                <p className="team-member-bio">{member.bio}</p>
                <div className="team-social-icons">
                  <a href="#linkedin" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
                  <a href="#twitter" className="social-link" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#github" className="social-link" aria-label="GitHub"><FaGithub /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
