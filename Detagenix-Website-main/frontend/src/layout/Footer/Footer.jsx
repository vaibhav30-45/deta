import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import logo from "../../asset/logo.webp";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/contact`, formData);
      alert("Message sent successfully! ✅");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setIsOpenForm(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <footer className="footer-new">
      <div className="footer-container-new">

        {/* Column 1: Brand & Socials */}
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

        {/* Column 2: Quick Links */}
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

        {/* Column 3: Services */}
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

        {/* Column 4: Contact Us */}
        <div className="footer-col contact-col">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:contact@detagenix.com">contact@detagenix.com</a>
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
        <p>© {new Date().getFullYear()} Detagenix. All Rights Reserved.</p>
      </div>

      {/* FOOTER MODAL FORM */}
      {isOpenForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-btn" onClick={() => setIsOpenForm(false)}>
              ✖
            </button>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select Service *</option>
                <option value="web-development">Web Development</option>
                <option value="app-development">App Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
