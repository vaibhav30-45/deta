import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../asset/logo.webp";
import avatar from "../../asset/Avatar.png";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="detagenix-navbar">
      
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Detagenix Logo" className="logo-image" /> 
          </Link>
        </div>

        {/* (only visible on mobile) */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
  {/* <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li> */}
  <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
  <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
  <li><Link to="/industries" onClick={() => setIsOpen(false)}>Industries</Link></li>
  <li><Link to="/technology" onClick={() => setIsOpen(false)}>Technologies</Link></li>
  {/* <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li> */}
  <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
  <li><Link to="/careers" onClick={() => setIsOpen(false)}>Careers</Link></li>
  {/* <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
  <li><Link to="/policy" onClick={() => setIsOpen(false)}>Privacy Policy</Link></li> */}
</ul>
        {/* <div className="nav-auth"> <Link to="/login" className="user-btn"> <img src={avatar} alt="User" className="user-icon" /> </Link> </div> */}
           <div className="nav-actions">
  <button className="enquire-btn" onClick={() => setIsOpenForm(true)}>
    Enquire Now
  </button>
</div>
      </div>
      {isOpenForm && (
  <div className="modal-overlay">
    <div className="modal-form">
      <button className="close-btn" onClick={() => setIsOpenForm(false)}>×</button>

      <h2>Let’s Build Your Project 🚀</h2>

      <form>
        {/* Basic Info */}
        <input type="text" placeholder="Full Name *" required />
        <input type="email" placeholder="Email *" required />
        <input type="tel" placeholder="Phone *" required />
        <input type="text" placeholder="Company Name (Optional)" />

        {/* Project Type */}
        <select required>
          <option value="">Select Project Type *</option>
          <option>Website</option>
          <option>Mobile App</option>
          <option>SaaS / Software</option>
          <option>E-commerce</option>
          <option>CRM / ERP</option>
          <option>Other</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Briefly describe your project requirements"
          required
        ></textarea>

        {/* Budget */}
        <select required>
          <option value="">Select Budget *</option>
          <option>₹10K – ₹50K</option>
          <option>₹50K – ₹2L</option>
          <option>₹2L – ₹10L</option>
          <option>₹10L+</option>
        </select>

        {/* Timeline */}
        <select required>
          <option value="">Select Timeline *</option>
          <option>ASAP</option>
          <option>1–2 Weeks</option>
          <option>1 Month</option>
          <option>Flexible</option>
        </select>

        {/* Goal */}
        <select required>
          <option value="">Project Goal *</option>
          <option>Generate leads</option>
          <option>Sell products</option>
          <option>Automate business</option>
          <option>Build MVP</option>
          <option>Scale existing system</option>
        </select>

        <button type="submit" className="submit-btn">
          Get Free Consultation
        </button>
      </form>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;
