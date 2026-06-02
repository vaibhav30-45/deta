import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaUpload,
  FaShareAlt
} from "react-icons/fa";
import "./Career.css";

function Careers() {
  const [openings, setOpenings] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    // Fallback mock jobs if backend API is not available
    const fallbackJobs = [
      {
        id: "fallback-1",
        title: "Senior React Developer",
        type: "Full-time",
        duration: "Permanent",
        location: "Remote",
        stipend: "$100k - $120k",
        desc: "We are looking for experienced React developers to build scalable, high-performance web applications using modern React patterns, TypeScript, and state management solutions."
      },
      {
        id: "fallback-2",
        title: "Cloud Architect",
        type: "Full-time",
        duration: "Permanent",
        location: "Bangalore, India",
        stipend: "$120k - $150k",
        desc: "Design, deploy, and manage cloud infrastructure on AWS and Azure. Implement CI/CD pipelines, container orchestration with Kubernetes, and infrastructure as code."
      },
      {
        id: "fallback-3",
        title: "Security Analyst",
        type: "Full-time",
        duration: "Permanent",
        location: "Remote (USA)",
        stipend: "$110k - $140k",
        desc: "Monitor and safeguard our digital infrastructure against security breaches. Conduct vulnerability assessments, manage firewall rules, and establish cybersecurity compliance protocols."
      }
    ];

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
      // TODO (Backend): Connect job listings section with API when endpoint becomes available
      const response = await fetch(`${BASE_URL}/api/jobs`);
      if (response.ok) {
        const jobs = await response.json();
        // Normalize response (some backends return wrappers)
        let jobsArr = jobs;
        if (!Array.isArray(jobsArr) && jobsArr.value && Array.isArray(jobsArr.value)) jobsArr = jobsArr.value;

        if (jobsArr.length === 0) {
          setOpenings(fallbackJobs);
        } else {
          // Sort newest-first by createdAt / postedAt / date
          jobsArr = jobsArr.slice().sort((a, b) => {
            const da = new Date(a.createdAt || a.postedAt || a.date || 0).getTime();
            const db = new Date(b.createdAt || b.postedAt || b.date || 0).getTime();
            return db - da;
          });

          // Transform backend job data to match UI format
          const transformedJobs = jobsArr.map(job => ({
            id: job._id,
            title: job.title,
            type: job.type || "Full-time",
            duration: job.duration || "N/A",
            location: job.location,
            stipend: job.stipend || "Competitive",
            desc: job.description,
          }));
          setOpenings(transformedJobs);
        }
      } else {
        setOpenings(fallbackJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs, using fallback:", error);
      setOpenings(fallbackJobs);
    } finally {
      setLoadingJobs(false);
    }
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  // Testimonials sample
  const testimonials = [
    {
      name: "Sakshi Verma",
      role: "Ex-ML Intern",
      quote:
        "Interning at Detagenix gave me real projects, mentorship and an opportunity to ship code. Highly recommended!",
    },
    {
      name: "Rohit Sharma",
      role: "Full Stack Dev",
      quote:
        "Great culture and rapid learning. The team supported my growth and gave me responsibility early on.",
    },
    {
      name: "Meera Patel",
      role: "Product Intern",
      quote:
        "Hands-on mentorship and challenging tasks. Portfolio-level work and real product impact.",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // IntersectionObserver to reveal parts
  useEffect(() => {
    const els = document.querySelectorAll(".care-fade");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    setResumeFile(e.target.files[0] ? e.target.files[0] : null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.role) {
      setError("Please fill name, email and role you're applying for.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your resume (PDF/DOC).");
      return;
    }

    setUploading(true);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("role", form.role);
    fd.append("message", form.message);
    fd.append("resume", resumeFile);

    try {
      const res = await fetch(`${BASE_URL}/api/applications/apply`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Upload failed");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", role: "", message: "" });
      setResumeFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err.message || "Submission failed. Try again later.");
    } finally {
      setUploading(false);
      setTimeout(() => setSubmitted(false), 4000);
    }
  }

  return (
    <main className="careers-page">
      {/* Hero Section */}
      <header className="care-hero care-fade">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Build. Innovate. Grow. <span className="highlight">With Detagenix.</span>
            </h1>
            <p className="hero-subtitle">
              Join Detagenix — we hire curious problem solvers. Accelerate your career working on cutting-edge technology and building premium digital solutions.
            </p>
            <div className="hero-buttons">
              <a href="#openings" className="btn btn-cyan btn-lg">
                View Openings
              </a>
              <a href="#apply" className="btn btn-outline-cyan btn-lg">
                Apply Now
              </a>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="illustration-wrapper">
              <div className="floating-circle circle-1"></div>
              <div className="floating-circle circle-2"></div>
              <div className="floating-circle circle-3"></div>
              <div className="illustration-card main-card">
                <FaBriefcase className="illus-icon icon-brief" />
                <span className="illus-label">Careers</span>
              </div>
              <div className="illustration-card badge-card-1">
                <FaUsers className="illus-icon icon-users" />
                <span className="illus-label">Culture</span>
              </div>
              <div className="illustration-card badge-card-2">
                <FaCheckCircle className="illus-icon icon-check" />
                <span className="illus-label">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Openings Section */}
      <section id="openings" className="openings-section care-fade">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Opportunities</span>
            <h2 className="section-title">Current Openings</h2>
            <p className="section-desc">
              Explore open positions and internships. Click apply to pre-fill the role in the form below.
            </p>
          </div>

          {loadingJobs ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading positions...</span>
              </div>
            </div>
          ) : openings.length === 0 ? (
            <div className="no-openings-card text-center p-5">
              <FaBriefcase className="no-openings-icon" />
              <h3>No Open Positions Right Now</h3>
              <p className="text-muted">
                We're always looking for talented developers, designers, and managers.
                Submit your resume using the form below and we will contact you when a role opens up.
              </p>
              <a href="#apply" className="btn btn-cyan mt-3">Submit Resume</a>
            </div>
          ) : (
            <div className="row g-4">
              {openings.map((job) => (
                <div className="col-md-6" key={job.id}>
                  <article className="job-card">
                    <div className="job-head">
                      <h3>{job.title}</h3>
                      <span className="job-type-badge">{job.type}</span>
                    </div>
                    <p className="job-desc">{job.desc}</p>
                    <div className="job-meta-row">
                      <div className="job-meta-item">
                        <FaMapMarkerAlt className="meta-icon" />
                        <span>{job.location}</span>
                      </div>
                      <div className="job-meta-item">
                        <FaClock className="meta-icon" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="job-meta-item">
                        <FaDollarSign className="meta-icon" />
                        <span>{job.stipend}</span>
                      </div>
                    </div>
                    <div className="job-actions">
                      <a
                        href="#apply"
                        className="btn btn-cyan btn-sm w-100 text-center"
                        onClick={() => setForm(f => ({ ...f, role: job.title }))}
                      >
                        Apply Now
                      </a>
                      <button
                        className="btn btn-outline-share btn-sm"
                        title="Copy Application Info"
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            `I'm interested in the ${job.title} role at Detagenix. Check it out!`
                          );
                          alert("Link info copied to clipboard!");
                        }}
                      >
                        <FaShareAlt /> Share
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="apply-section care-fade">
        <div className="container">
          <div className="row g-5 align-items-stretch">
            {/* Left Column: Form */}
            <div className="col-lg-6">
              <div className="apply-form-container">
                <h3 className="form-heading">Submit Application</h3>
                <p className="form-subheading">Complete the fields below and attach your latest resume.</p>

                <form className="apply-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role" className="form-label">Role Applying For</label>
                    <input
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Frontend Intern"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">A Short Message (Optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Tell us about yourself or link to your portfolio"
                    />
                  </div>

                  <div className="form-group file-group">
                    <label className="form-label">Resume Upload (PDF / DOC)</label>
                    <div className="file-upload-wrapper">
                      <input
                        ref={fileRef}
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="file-input"
                      />
                      <label htmlFor="resume" className="file-label">
                        <FaUpload className="upload-icon" />
                        <span>{resumeFile ? resumeFile.name : "Choose file or drag here"}</span>
                      </label>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}
                  {submitted && (
                    <div className="alert alert-success">
                      Application sent successfully — thank you!
                    </div>
                  )}

                  <button
                    className="btn btn-cyan w-100 submit-btn"
                    type="submit"
                    disabled={uploading}
                  >
                    {uploading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Perks and Testimonials */}
            <div className="col-lg-6 d-flex flex-column justify-content-between">
              <div className="why-apply-card">
                <h3>Why join Detagenix?</h3>
                <ul className="perks-list">
                  <li>
                    <FaCheckCircle className="perk-icon" />
                    <div>
                      <strong>Real-world Projects:</strong> Get hands-on experience by contributing to production projects and shipping real code.
                    </div>
                  </li>
                  <li>
                    <FaCheckCircle className="perk-icon" />
                    <div>
                      <strong>Expert Mentorship:</strong> Direct guidance and standard reviews from senior developers and industry veterans.
                    </div>
                  </li>
                  <li>
                    <FaCheckCircle className="perk-icon" />
                    <div>
                      <strong>Growth-First Culture:</strong> Focus on constant learning, training, skill upgrades, and direct PPO paths.
                    </div>
                  </li>
                  <li>
                    <FaCheckCircle className="perk-icon" />
                    <div>
                      <strong>Competitive Stipends:</strong> Rewarding compensations and bonuses for internship and full-time positions.
                    </div>
                  </li>
                </ul>
                <div className="tip-box">
                  <strong>Pro Tip:</strong> Add links to your GitHub repositories or live portfolios in the message block to stand out!
                </div>
              </div>

              {/* Testimonials */}
              <div className="testimonials-card">
                <h4>What Our Team Says</h4>
                <div className="testi-carousel">
                  {testimonials.map((t, idx) => (
                    <div
                      className={`testi-item-wrapper ${idx === activeTestimonial ? 'active' : ''}`}
                      key={idx}
                    >
                      <blockquote className="testi-quote">
                        <p>“{t.quote}”</p>
                        <footer className="testi-footer">
                          — <strong>{t.name}</strong>, <span className="testi-role">{t.role}</span>
                        </footer>
                      </blockquote>
                    </div>
                  ))}
                </div>
                <div className="carousel-dots-row">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      className={`carousel-dot-btn ${idx === activeTestimonial ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Careers;
