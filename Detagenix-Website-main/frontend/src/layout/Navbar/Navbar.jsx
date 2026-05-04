import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../asset/logo.webp";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  goal: ""
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Form submitted successfully ✅");

      // reset form
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
      alert(data.message || "Something went wrong ❌");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error ❌");
  }
};

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
  <li><Link to="/Industries" onClick={() => setIsOpen(false)}>Industries</Link></li>
  <li><Link to="/technology" onClick={() => setIsOpen(false)}>Technologies</Link></li>
  <li><Link to="/project" onClick={() => setIsOpen(false)}>Projects</Link></li>
  <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
  <li><Link to="/career" onClick={() => setIsOpen(false)}>Careers</Link></li>
  {/* <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li> */}
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
    <option value="Scale existing system">Scale existing system</option>
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
