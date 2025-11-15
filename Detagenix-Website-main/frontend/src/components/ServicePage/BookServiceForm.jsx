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
      const res = await fetch(`${BASE_URL}/services/book`, {
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
      <div className="modal-content book-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Book {serviceName}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
          />

          {/* 👇 New Technology Dropdown */}
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

          <textarea
            name="service"
            placeholder="Your Requirements"
            value={form.service}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Booking..." : "Submit"}
          </button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>,
    document.body
  );
};

export default BookServiceForm;
