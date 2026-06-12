import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaLock, FaClock } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../asset/logo.webp";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
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

<<<<<<< HEAD
  try {
    const response = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
=======
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
>>>>>>> 7c7368d3ede34c2b2967b431c998d8ef83d27525
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

        {/* Hamburger Icon (mobile) */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Menu */}
        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          {/* <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaHome size={18} /> Home
            </Link>
          </li> */}
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/Industries" onClick={() => setIsOpen(false)}>Industries</Link></li>
          <li><Link to="/technology" onClick={() => setIsOpen(false)}>Technologies</Link></li>
          {/* <li><Link to="/project" onClick={() => setIsOpen(false)}>Projects</Link></li> */}
          <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
          <li><Link to="/career" onClick={() => setIsOpen(false)}>Careers</Link></li>
          {/* <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li> */}
        </ul>

        <div className="nav-actions">
          <button className="enquire-btn" onClick={() => setIsOpenForm(true)}>
            Enquire Now
          </button>
        </div>
      </div>

      {isOpenForm && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === "modal-overlay") {
            setIsOpenForm(false);
          }
        }}>
          <div className="modal-container-two-col">
            <button
              className="close-btn"
              onClick={() => setIsOpenForm(false)}
              aria-label="Close Modal"
            >
              ✖
            </button>

            {/* Left Info Panel */}
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

            {/* Right Form Panel */}
            <div className="modal-right-panel">
              <h3 className="form-title">Let’s Build Your Project</h3>
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
                      <option value="₹10K – ₹50K">₹10K – ₹50K</option>
                      <option value="₹50K – ₹2L">₹50K – ₹2L</option>
                      <option value="₹2L – ₹10L">₹2L – ₹10L</option>
                      <option value="₹10L+">₹10L+</option>
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
                      <option value="1–2 Weeks">1–2 Weeks</option>
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
    </nav>
  );
};

export default Navbar;
