import { Link } from "react-router-dom";
import "./Footer.css";
import "../Navbar/Navbar.css";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaUsers,
  FaLock,
  FaClock,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../../asset/logo.webp";

const initialEnquiryForm = {
  full_name: "",
  email: "",
  phone: "",
  company_name: "",
  project_type: "",
  description: "",
  budget: "",
  timeline: "",
  goal: "",
};

const Footer = () => {
  const [formData, setFormData] = useState(initialEnquiryForm);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully");
        setFormData(initialEnquiryForm);
        setIsOpenForm(false);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <footer className="footer-new">
      <div className="footer-container-new">
        <div className="footer-col brand-col">
          <Link to="/">
            <img
              src={logo}
              alt="Detagenix Logo"
              className="footer-logo-image"
            />
          </Link>

          <p className="footer-desc">
            We provide smart digital solutions to transform businesses, scaling your operations with custom software development.
          </p>
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/company/detagenix/"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/detagenix"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/technology">Technologies</Link></li>
            <li><Link to="/project">Projects</Link></li>
            <li><Link to="/career">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li><Link to="/services#webdev">Web Development</Link></li>
            <li><Link to="/services#ai">AI & ML Solutions</Link></li>
            <li><Link to="/services#mobile">Mobile App Dev</Link></li>
            <li><Link to="/services#cloud">Cloud & DevOps</Link></li>
            <li><Link to="/services#cyber">Cybersecurity</Link></li>
            <li><Link to="/services#data">Data Analytics</Link></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:support@detagenix.com">support@detagenix.com</a>
            </p>
            <p>
              <FaPhoneAlt className="contact-icon" />
              <a href="tel:+918602219118">+91 8602219118</a>
            </p>
            <p>
              <FaWhatsapp className="contact-icon" />
              <a
                href="https://wa.me/919407552249"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 9407552249
              </a>
            </p>
          </div>
          <button onClick={() => setIsOpenForm(true)} className="footer-enquire-btn">
            Enquire Now
          </button>
        </div>
      </div>

      <div className="footer-bottom-new">
        <p>&copy; {new Date().getFullYear()} Detagenix. All Rights Reserved.</p>
      </div>

      {isOpenForm && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              setIsOpenForm(false);
            }
          }}
        >
          <div className="modal-container-two-col">
            <button
              className="close-btn"
              onClick={() => setIsOpenForm(false)}
              aria-label="Close Modal"
            >
              x
            </button>

            <div className="modal-left-panel">
              <h2 className="modal-left-title">
                Transform Your Ideas into <span className="highlight">Impact.</span>
              </h2>
              <p className="modal-left-desc">
                Partner with Detagenix to scale your digital presence. Get a free consultation tailored to your project goals.
              </p>

              <div className="modal-feature-list">
                <div className="modal-feature-item">
                  <div className="modal-icon-circle">
                    <FaUsers />
                  </div>
                  <div className="modal-feature-text">
                    <h4>Expert Consultation</h4>
                    <p>Discuss details with senior consultants and software architects.</p>
                  </div>
                </div>

                <div className="modal-feature-item">
                  <div className="modal-icon-circle">
                    <FaLock />
                  </div>
                  <div className="modal-feature-text">
                    <h4>Secure & Confidential</h4>
                    <p>Your ideas and projects are fully protected by non-disclosure agreements.</p>
                  </div>
                </div>

                <div className="modal-feature-item">
                  <div className="modal-icon-circle">
                    <FaClock />
                  </div>
                  <div className="modal-feature-text">
                    <h4>Timely Response</h4>
                    <p>Expect a comprehensive project proposal and quotation within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-right-panel">
              <h3 className="form-title">Let's Build Your Project</h3>
              <p className="form-desc">Provide your project details to get a free estimate.</p>

              <form onSubmit={handleSubmit} className="modal-two-col-form">
                <div className="modal-grid">
                  <div className="modal-grid-half">
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name *"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="modal-grid-half">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="modal-grid-half">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="modal-grid-half">
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Company Name (Optional)"
                      value={formData.company_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="modal-grid-half">
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
                  </div>

                  <div className="modal-grid-half">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Budget *</option>
                      <option value="Rs 10K - Rs 50K">Rs 10K - Rs 50K</option>
                      <option value="Rs 50K - Rs 2L">Rs 50K - Rs 2L</option>
                      <option value="Rs 2L - Rs 10L">Rs 2L - Rs 10L</option>
                      <option value="Rs 10L+">Rs 10L+</option>
                    </select>
                  </div>

                  <div className="modal-grid-half">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Timeline *</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-2 Weeks">1-2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="modal-grid-half">
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
                      <option value="Scale existing system">Scale existing system</option>
                    </select>
                  </div>

                  <div className="modal-grid-full">
                    <textarea
                      name="description"
                      placeholder="Briefly describe your project requirements *"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="modal-submit-btn">
                  Get Free Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
