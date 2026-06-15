import { useState, useEffect } from "react";

const Testimonials = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    message: "",
    rating: "",
    image: "",
  });

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken"); 
    return {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }), 
    };
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/testimonials`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${BASE_URL}/api/testimonials`, {
        method: "POST",
        headers: getAuthHeaders(), // Yahan headers update kiye
        body: JSON.stringify(form),
      });

      setForm({ name: "", company: "", message: "", rating: "", image: "" });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(), // Yahan bhi headers add kiye kyunki delete route bhi protected hoga
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px" }}>Testimonials</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close" : "+ Add Testimonial"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              style={inputStyle}
              value={form.name}
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              style={inputStyle}
              value={form.company}
              placeholder="Company"
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              style={inputStyle}
              value={form.image}
              placeholder="Image URL (optional)"
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <textarea
              style={{ ...inputStyle, height: "80px" }}
              value={form.message}
              placeholder="Message"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <input
              style={inputStyle}
              type="number"
              value={form.rating}
              placeholder="Rating (1-5)"
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />

            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* LIST */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "15px",
        }}
      >
        {data.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1e293b",
              padding: "15px",
              borderRadius: "10px",
              transition: "0.3s",
            }}
          >
            <p style={{ color: "#cbd5f5", marginBottom: "10px" }}>
              {item.message}
            </p>

            <div style={{ color: "#facc15", marginBottom: "8px" }}>
              {"⭐".repeat(item.rating)}
            </div>

            <h4>{item.name}</h4>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              {item.company}
            </span>

            <button
              onClick={() => handleDelete(item._id)}
              style={{
                marginTop: "12px",
                marginLeft: "80px",
                padding: "6px 12px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#ef4444",
                borderRadius: "6px",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#ef4444";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(239, 68, 68, 0.1)";
                e.target.style.color = "#ef4444";
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  outline: "none",
};

export default Testimonials;