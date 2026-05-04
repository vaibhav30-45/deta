import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/contact`, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <footer className="footer">
     <div className="footer-container">

  {/* ✅ LEFT — FORM */}
  <div className="footer-left">
    <form className="contact-form-dark" onSubmit={handleSubmit}>
      
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="custom-input"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="custom-input"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Your Phone Number"
        className="custom-input"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <select
        name="service"
        className="custom-input"
        value={formData.service}
        onChange={handleChange}
        required
      >
        <option value="">Select Service</option>
        <option value="web-development">Web Development</option>
        <option value="app-development">App Development</option>
        <option value="ui-ux">UI/UX Design</option>
        <option value="digital-marketing">Digital Marketing</option>
      </select>

      <textarea
        name="message"
        placeholder="Your Message"
        rows="5"
        className="custom-input"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit" className="custom-btn" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>

  {/* ✅ MIDDLE — QUICK LINKS */}
  <div className="footer-middle">
    <h4>Quick Links</h4>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/career">Careers</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/policy">Privacy Policy</Link></li>
    </ul>
  </div>

  {/* ✅ RIGHT — BRAND + CONTACT */}
  <div className="footer-right">
    
    {/* Branding */}
    <div className="footer-brand">
      <h2>Detagenix</h2>
      <p>
        Your trusted partner in data-driven innovation and technology.
      </p>
    </div>

    {/* Contact */}
    <div className="footer-contact">
      <p>
        <FaEnvelope className="footer-icon" />
        <a href="mailto:contact@detagenix.com">
          contact@detagenix.com
        </a>
      </p>

      <p>
        <FaPhoneAlt className="footer-icon" />
        <a href="tel:+918602219118">
          +91 8602219118
        </a>
      </p>

      <p>
        📱
        <a
          href="https://wa.me/919407552249"
          target="_blank"
          rel="noopener noreferrer"
        >
          +91 9407552249
        </a>
      </p>
    </div>

    {/* Social */}
    <div className="footer-social">
      <a
        href="https://www.linkedin.com/company/detagenix/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin />
      </a>

      <a
        href="https://www.instagram.com/detagenix"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram />
      </a>
    </div>

  </div>

</div>
   

      <div className="footer-bottom">
        © {new Date().getFullYear()} Detagenix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
