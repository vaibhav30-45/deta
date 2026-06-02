import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaPaperPlane
} from "react-icons/fa";
import "./Contactus.css";

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/contact`, formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="contact-section-dark">
      <div className="container contact-container">
        {/* Header Block */}
        <div className="contact-header text-center">
          <span className="contact-tag">Get In Touch</span>
          <h1 className="contact-title">Let’s Connect</h1>
          <p className="contact-subtitle">
            Have a project in mind or a question? Reach out to our team — we’ll get back to you soon.
          </p>
        </div>

        <div className="row contact-row g-5">
          {/* Left Column: Info & Map */}
          <div className="col-lg-5">
            <div className="contact-info-card">
              <h3 className="info-title">Contact Information</h3>
              <p className="info-desc">Feel free to connect with us via email, phone, or visit our office.</p>

              <ul className="info-list">
                <li>
                  <div className="info-icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-text">
                    <strong>Address</strong>
                    <span>Indore, Madhya Pradesh, India</span>
                  </div>
                </li>

                <li>
                  <div className="info-icon-wrapper">
                    <FaEnvelope />
                  </div>
                  <div className="info-text">
                    <strong>Email Us</strong>
                    <span>hr@detagenix.com</span>
                  </div>
                </li>

                <li>
                  <div className="info-icon-wrapper">
                    <FaWhatsapp />
                  </div>
                  <div className="info-text">
                    <strong>WhatsApp</strong>
                    <span>+91-7489834717</span>
                  </div>
                </li>

                <li>
                  <div className="info-icon-wrapper">
                    <FaPhoneAlt />
                  </div>
                  <div className="info-text">
                    <strong>Call Us</strong>
                    <span>+91 8607997261 || +91 7489834717</span>
                  </div>
                </li>
              </ul>

              <div className="social-links-row">
                <a
                  href="https://www.linkedin.com/company/detagenix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="LinkedIn"
                >
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/detagenix_/?igsh=djVpcjZheDV4MXU2&utm_source=qr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="Instagram"
                >
                  <FaInstagram /> <span>Instagram</span>
                </a>
              </div>

              <div className="map-container-dark">
                <iframe
                  title="Detagenix Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.185020692897!2d75.90306007349591!3d22.72136342750494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e2cc1c37e2c1%3A0x88be41cfe5eb3331!2sRupal%20Regency!5e0!3m2!1sen!2sin!4v1762178512148!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="col-lg-7">
            <div className="contact-form-container">
              {!submitted ? (
                <>
                  <h3 className="form-heading">Send Us a Message</h3>
                  <p className="form-subheading">Fill in the fields and our team will get in touch with you shortly.</p>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group mb-4">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="message" className="form-label">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        className="form-control"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-cyan w-100 submit-btn" disabled={loading}>
                      {loading ? (
                        "Sending..."
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center success-container">
                  <div className="success-icon-wrapper">
                    <FaPaperPlane className="success-icon" />
                  </div>
                  <h3 className="success-heading">Message Sent Successfully!</h3>
                  <p className="success-subheading">
                    Thank you for reaching out. A Detagenix representative will contact you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contactus;
