import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./BookServicesForm.css";

const BookServiceForm = ({ serviceName, onClose }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: serviceName || "",
    technology: "", // 👈 added field
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.name || !form.email || !form.service || !form.technology) {
      setStatus("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/services/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      setStatus("✅ Service booked successfully!");
      setForm({ name: "", email: "", service: "", technology: "" });
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      {/* UI FIX START: Reusing the 2-column premium modal layout from the Enquire Now form */}
      <div className="modal-container-two-col" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Left Branding Panel */}
        <div className="modal-left-panel">
          <h2 className="modal-left-title">
            Book <span className="highlight">{serviceName}</span>
          </h2>
          <p className="modal-left-desc">
            Partner with our expert engineers to scale your operations. Let us know your requirements.
          </p>
          <div className="modal-feature-list">
            <div className="modal-feature-item">
              <div className="modal-icon-circle">✓</div>
              <div className="modal-feature-text">
                <h4>Expert Consultation</h4>
                <p>Speak directly with a senior technical architect.</p>
              </div>
            </div>
            <div className="modal-feature-item">
              <div className="modal-icon-circle">★</div>
              <div className="modal-feature-text">
                <h4>Customized Solutions</h4>
                <p>Tailored strategies that fit your exact business needs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="modal-right-panel">
          <h3 className="form-title">Service Request</h3>
          <p className="form-desc">Fill in the details below and we will contact you shortly.</p>

          <form onSubmit={handleSubmit} className="modal-two-col-form">
            <div className="modal-grid">
              <div className="modal-grid-half">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-grid-half">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-grid-full">
                <select
                  name="technology"
                  value={form.technology}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Technology</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="HADOOP & DATA SCIENCE">HADOOP & DATA SCIENCE</option>
                  <option value="BACKEND DEVELOPMENT">BACKEND DEVELOPMENT</option>
                  <option value="IOT (INTERNET OF THINGS)">IOT (INTERNET OF THINGS)</option>
                  <option value="DEDICATED FULL-STACK">DEDICATED FULL-STACK</option>
                  <option value="CYBER SECURITY">CYBER SECURITY</option>
                  <option value="WEB DEVELOPMENT">WEB DEVELOPMENT</option>
                  <option value="QUALITY ENGINEERING">QUALITY ENGINEERING</option>
                  <option value="MOBILE APPLICATION">MOBILE APPLICATION</option>
                  <option value="SAP">SAP</option>
                  <option value="METAVERSE">METAVERSE</option>
                  <option value="DEVOPS / CLOUD DEVOPS">DEVOPS / CLOUD DEVOPS</option>
                  <option value="PYTHON AND JAVA">PYTHON AND JAVA</option>
                  <option value="CLOUD DEVELOPMENT">CLOUD DEVELOPMENT</option>
                  <option value="MICROSOFT DYNAMICS 365">MICROSOFT DYNAMICS 365</option>
                  <option value="MAINTENANCE & SUPPORT">MAINTENANCE & SUPPORT</option>
                  <option value="BLOCKCHAIN TECHNOLOGY">BLOCKCHAIN TECHNOLOGY</option>
                  <option value="REACT & ANGULAR">REACT & ANGULAR</option>
                  <option value="MACHINE LEARNING">MACHINE LEARNING</option>
                  <option value="APPLICATION DEVELOPMENT">APPLICATION DEVELOPMENT</option>
                  <option value="NETWORK OPERATION">NETWORK OPERATION</option>
                  <option value="SITECORE ORDERCLOUD">SITECORE ORDERCLOUD</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="modal-grid-full">
                <textarea
                  name="service"
                  placeholder="Your Requirements *"
                  value={form.service}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>

            <button type="submit" className="modal-submit-btn" disabled={loading}>
              {loading ? "Booking..." : "Submit Request"}
            </button>
            
            {status && (
              <p className="status-message" style={{ marginTop: '15px', fontSize: '0.9rem', color: status.includes('❌') ? '#ef4444' : '#22c55e' }}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
      {/* UI FIX END */}
    </div>,
    document.body
  );
};

export default BookServiceForm;
