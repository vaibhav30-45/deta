import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";
import logo from "../../asset/logo.webp";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    console.log("Admin panel loaded. Backend URL:", BASE_URL);
  }, [BASE_URL]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log('Attempting login with:', { email, password: '***', baseURL: BASE_URL });

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Login successful:', response.data);

      // Store token in localStorage
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminEmail", response.data.admin.email);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error('Login error:', err);
      console.error('Response:', err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <img src={logo} alt="Detagenix Logo" className="admin-login-logo" />
        <h2>Admin Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              autoComplete="off"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoComplete="off"
            />
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
