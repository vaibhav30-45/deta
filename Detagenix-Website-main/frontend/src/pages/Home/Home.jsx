import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Testimonial from "../../components/Testimonial/Testimonial";
import { useNavigate } from "react-router-dom";
import Techslider from "../../components/Techslider/Techslider";
import Services from "../../components/Servicessection/Services.jsx";
import servicesData from "../../data/servicesData.js";
import aboutusImage from "../../asset/culture2.png";
import { createPortal } from "react-dom";

const Home = () => {
  const [homepageServices, setHomepageServices] = useState(servicesData);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
  // const [videoLoaded, setVideoLoaded] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    project_type: "",
    description: "",
    budget: "",
    timeline: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully ");

        setFormData({
          full_name: "",
          email: "",
          phone: "",
          company_name: "",
          project_type: "",
          description: "",
          budget: "",
          timeline: "",
          goal: "",
        });

        setIsOpenForm(false);
      } else {
        alert(data.message || "Something went wrong ");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ");
    }
  };

  useEffect(() => {
    if (isOpenForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenForm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blog-services`);
        if (Array.isArray(data) && data.length > 0) {
          setHomepageServices(data);
        } else {
          setHomepageServices(servicesData);
        }
        setServicesError("");
      } catch (err) {
        console.error("Failed to load homepage services:", err);
        setHomepageServices(servicesData);
        setServicesError(
          "We’re updating our services. Please check back shortly.",
        );
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [BASE_URL]);
  // Stats data for the highlights section
  const navigate = useNavigate();
  const stats = [
    { icon: "💼", number: "10+", label: "Services" },
    { icon: "🎓", number: "50+", label: "Interns Trained" },
    { icon: "⭐", number: "100+", label: "Projects" },
    { icon: "😊", number: "100%", label: "Client Satisfaction" },
    { icon: "🏆", number: "3+", label: "Years Experience" },
  ];

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <>
      {/*  HERO SECTION */}

      <section className="hero-video-section">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-background-video"
          poster="/images/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay"></div>

        <div className="hero-content">
          <h1>Transforming Ideas into Digital Reality</h1>
          <p>
            We build cutting-edge web solutions, AI applications, and cloud
            services that drive business growth
          </p>

          {/* <div className="hero-buttons">
            <button onClick={goToServices} className="btn-primary">Get Started</button>
            <button onClick={() => navigate("/projects")} className="btn-secondary">View Our Work</button>
          </div> */}
          <button className="enquire-btn" onClick={() => setIsOpenForm(true)}>
            Enquire Now
          </button>
        </div>
      </section>
      <div className="page-container">
        <section className="about-section">
          <div className="about-container">
            {/* LEFT SIDE IMAGE */}
            <div className="about-image">
              <img src={aboutusImage} alt="About Us" />
            </div>

            {/* RIGHT SIDE CONTENT */}
            <div className="about-content">
              <h2>About Us</h2>
              <p className="lead">
                <span className="highlight">Detagenix</span> is a dynamic IT
                consulting and digital transformation organization dedicated to
                empowering businesses with cutting-edge, scalable technology
                solutions. We go beyond basic software development to craft
                tailored, enterprise-grade applications, specializing in robust
                technologies like the <strong>MERN Stack</strong> and advanced
                services such as{" "}
                <strong>AI/ML solutions, Blockchain and Cybersecurity.</strong>.
                <br />
                <br />
                Our Resource Deployment model enables organizations to scale
                efficiently by providing skilled professionals across major
                technologies on hourly, pro-rata, or project-based engagements,
                ensuring flexibility and continuity in every development cycle.
              </p>

              <button onClick={goToAbout} className="about-btn">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/*  SERVICES SECTION */}
        <section className="services-section">
          <h1>Our Services</h1>
          {servicesLoading ? (
            <p className="services-status">Loading services...</p>
          ) : servicesError ? (
            <p className="services-status warning">{servicesError}</p>
          ) : null}

          <div className="service-grids">
            {homepageServices.map((service, index) => (
              <Services
                key={service._id || service.id || index}
                service={service}
              />
            ))}
          </div>
        </section>
      </div>
      {/*  HIGHLIGHTS/STATS SECTION */}
      <section className="stats-bar">
        <h1>Numbers That Define Us</h1>
        <div className="stats-slider fade-edges">
          <div className="stats-track">
            {[...stats, ...stats].map(
              (
                stat,
                index, 
              ) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Techslider />
      {/*  TESTIMONIAL SECTION */}
      <Testimonial />
      {isOpenForm &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal-form">
              <button
                className="close-btn"
                onClick={() => setIsOpenForm(false)}
              >
                ✖
              </button>

              <h2>Let’s Build Your Project </h2>

              <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name *"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name (Optional)"
                  value={formData.company_name}
                  onChange={handleChange}
                />

                {/* Project Type */}
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Project Type *</option>
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="SaaS / Software">SaaS / Software</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="CRM / ERP">CRM / ERP</option>
                  <option value="Other">Other</option>
                </select>

                {/* Description */}
                <textarea
                  name="description"
                  placeholder="Briefly describe your project requirements"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>

                {/* Budget */}
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Budget *</option>
                  <option value="₹10K – ₹50K">₹10K – ₹50K</option>
                  <option value="₹50K – ₹2L">₹50K – ₹2L</option>
                  <option value="₹2L – ₹10L">₹2L – ₹10L</option>
                  <option value="₹10L+">₹10L+</option>
                </select>

                {/* Timeline */}
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Timeline *</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1–2 Weeks">1–2 Weeks</option>
                  <option value="1 Month">1 Month</option>
                  <option value="Flexible">Flexible</option>
                </select>

                {/* Goal */}
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="">Project Goal *</option>
                  <option value="Generate leads">Generate leads</option>
                  <option value="Sell products">Sell products</option>
                  <option value="Automate business">Automate business</option>
                  <option value="Build MVP">Build MVP</option>
                  <option value="Scale existing system">
                    Scale existing system
                  </option>
                </select>

                <button type="submit" className="submit-btn">
                  Get Free Consultation
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Home;
