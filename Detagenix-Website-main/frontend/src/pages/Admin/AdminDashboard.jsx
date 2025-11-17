import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { FaUsers, FaFileAlt, FaPhone, FaBriefcase, FaGift, FaChartBar, FaSync } from "react-icons/fa";
import logo from "../../asset/logo.webp";

const AdminDashboard = () => {
  const [data, setData] = useState({
    admins: [],
    applications: [],
    contacts: [],
    jobs: [],
    services: [],
    users: [],
    bookings: [],
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalApplications: 0,
    totalContacts: 0,
    totalJobs: 0,
    totalUsers: 0,
    totalBookings: 0,
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/data`);
      setData(response.data);
      
      // Calculate stats
      setStats({
        totalAdmins: response.data.admins?.length || 0,
        totalApplications: response.data.applications?.length || 0,
        totalContacts: response.data.contacts?.length || 0,
        totalJobs: response.data.jobs?.length || 0,
        totalUsers: response.data.users?.length || 0,
        totalBookings: response.data.bookings?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch data. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ color }}>
        <Icon />
      </div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );

  const DataTable = ({ data, columns, title }) => (
    <div className="data-table-container">
      <h2 className="table-title">{title}</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col}>
                      {typeof row[col] === "object"
                        ? JSON.stringify(row[col]).substring(0, 50) + "..."
                        : String(row[col] || "-").substring(0, 50)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-dashboard loading-container">
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Professional Header with Logo */}
      <div className="admin-header">
        <div className="header-top">
          <img src={logo} alt="Detagenix Logo" className="header-logo" />
          <div className="header-title">
            <h1>Admin Portal</h1>
            <p>Detagenix Data Management System</p>
          </div>
        </div>
        <button className="refresh-btn" onClick={fetchData}>
          <FaSync /> Refresh Data
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <FaChartBar /> Overview
        </button>
        <button
          className={`nav-btn ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => setActiveTab("applications")}
        >
          <FaFileAlt /> Applications
        </button>
        <button
          className={`nav-btn ${activeTab === "contacts" ? "active" : ""}`}
          onClick={() => setActiveTab("contacts")}
        >
          <FaPhone /> Contacts
        </button>
        <button
          className={`nav-btn ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => setActiveTab("jobs")}
        >
          <FaBriefcase /> Jobs
        </button>
        <button
          className={`nav-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <FaGift /> Bookings
        </button>
        <button
          className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <FaUsers /> Users
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2 className="section-title">System Statistics</h2>
            <div className="stats-grid">
              <StatCard
                icon={FaFileAlt}
                title="Job Applications"
                value={stats.totalApplications}
                color="#00bfff"
              />
              <StatCard
                icon={FaPhone}
                title="Contact Messages"
                value={stats.totalContacts}
                color="#25D366"
              />
              <StatCard
                icon={FaBriefcase}
                title="Active Jobs"
                value={stats.totalJobs}
                color="#ff6b9d"
              />
              <StatCard
                icon={FaGift}
                title="Service Bookings"
                value={stats.totalBookings}
                color="#ffa500"
              />
              <StatCard
                icon={FaUsers}
                title="Registered Users"
                value={stats.totalUsers}
                color="#9b59b6"
              />
              <StatCard
                icon={FaUsers}
                title="Admin Users"
                value={stats.totalAdmins}
                color="#e74c3c"
              />
            </div>

            {/* Quick Overview Tables */}
            <div className="overview-tables">
              <DataTable
                data={data.applications?.slice(0, 5)}
                columns={["name", "email", "role", "appliedAt"]}
                title="Recent Job Applications"
              />
              <DataTable
                data={data.contacts?.slice(0, 5)}
                columns={["name", "email", "message", "createdAt"]}
                title="Recent Contact Messages"
              />
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <DataTable
            data={data.applications}
            columns={["_id", "name", "email", "role", "message", "appliedAt"]}
            title="All Job Applications"
          />
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <DataTable
            data={data.contacts}
            columns={["_id", "name", "email", "message", "createdAt"]}
            title="All Contact Submissions"
          />
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <DataTable
            data={data.jobs}
            columns={["_id", "title", "description", "location", "createdAt"]}
            title="All Job Listings"
          />
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <DataTable
            data={data.bookings}
            columns={["_id", "name", "email", "service", "technology", "bookingDate"]}
            title="All Service Bookings"
          />
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <DataTable
            data={data.users}
            columns={["_id", "email", "role", "createdAt"]}
            title="All Registered Users"
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
