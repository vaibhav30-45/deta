import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
import { FaUsers, FaFileAlt, FaPhone, FaBriefcase, FaGift, FaChartBar, FaSync, FaBlog, FaCog, FaTrash, FaEdit, FaPlus, FaSignOutAlt } from "react-icons/fa";
import logo from "../../asset/logo.webp";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    admins: [],
    applications: [],
    contacts: [],
    jobs: [],
    services: [],
    users: [],
    bookings: [],
  });

  const [blogs, setBlogs] = useState([]);
  const [blogServices, setBlogServices] = useState([]);
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

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "Detagenix Team",
    bannerImage: "",
    tags: "",
    category: "",
    content: "",
  });

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "",
    link: "",
  });
  const [enquiry, setEnquiries] = useState([]);

  const [jobForm, setJobForm] = useState({
    title: "",
    type: "Full-time",
    duration: "N/A",
    location: "",
    stipend: "Competitive",
    description: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin");
        return;
      }

      const [adminRes, blogsRes, servicesRes, enquiryRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/admin/data`),
        axios.get(`${BASE_URL}/api/blogs`),
        axios.get(`${BASE_URL}/api/blog-services`),
        axios.get(`${BASE_URL}/api/enquiry`)
      ]);
      console.log("Enquiry Data:", enquiryRes.data);

      setData(adminRes.data);
      setBlogs(blogsRes.data);
      setBlogServices(servicesRes.data);
      setEnquiries(enquiryRes.data);

      setStats({
        totalAdmins: adminRes.data.admins?.length || 0,
        totalApplications: adminRes.data.applications?.length || 0,
        totalContacts: adminRes.data.contacts?.length || 0,
        totalJobs: adminRes.data.jobs?.length || 0,
        totalUsers: adminRes.data.users?.length || 0,
        totalBookings: adminRes.data.bookings?.length || 0,
        totalEnquiries: enquiryRes.data?.length || 0
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

  const handleCreateBlog = async () => {
    if (!blogForm.title || !blogForm.slug || !blogForm.content) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingBlog) {
        await axios.put(`${BASE_URL}/api/blogs/${editingBlog._id}`, {
          ...blogForm,
          tags: blogForm.tags.split(",").map((t) => t.trim()),
        });
        alert("Blog updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/blogs`, {
          ...blogForm,
          tags: blogForm.tags.split(",").map((t) => t.trim()),
        });
        alert("Blog created successfully");
      }
      setBlogForm({
        title: "",
        slug: "",
        author: "Detagenix Team",
        bannerImage: "",
        tags: "",
        category: "",
        content: "",
      });
      setEditingBlog(null);
      setShowBlogForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert(err.response?.data?.error || "Failed to save blog");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${BASE_URL}/api/blogs/${id}`);
        alert("Blog deleted successfully");
        fetchData();
      } catch (err) {
        alert("Failed to delete blog");
      }
    }
  };

  const handleCreateService = async () => {
    if (!serviceForm.title || !serviceForm.description || !serviceForm.icon) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingService) {
        await axios.put(`${BASE_URL}/api/blog-services/${editingService._id}`, serviceForm);
        alert("Service updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/blog-services`, serviceForm);
        alert("Service created successfully");
      }
      setServiceForm({
        title: "",
        description: "",
        icon: "",
        link: "",
      });
      setEditingService(null);
      setShowServiceForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving service:", err);
      alert(err.response?.data?.error || "Failed to save service");
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`${BASE_URL}/api/blog-services/${id}`);
        alert("Service deleted successfully");
        fetchData();
      } catch (err) {
        alert("Failed to delete service");
      }
    }
  };

  const handleCreateJob = async () => {
    if (!jobForm.title || !jobForm.location || !jobForm.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingJob) {
        await axios.put(`${BASE_URL}/api/jobs/${editingJob._id}`, jobForm);
        alert("Job updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/jobs`, jobForm);
        alert("Job created successfully");
      }
      setJobForm({
        title: "",
        type: "Full-time",
        duration: "N/A",
        location: "",
        stipend: "Competitive",
        description: "",
      });
      setEditingJob(null);
      setShowJobForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving job:", err);
      alert(err.response?.data?.error || "Failed to save job");
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${BASE_URL}/api/jobs/${id}`);
        alert("Job deleted successfully");
        fetchData();
      } catch (err) {
        alert("Failed to delete job");
      }
    }
  };

  const handleEditJob = (job) => {
    setJobForm(job);
    setEditingJob(job);
    setShowJobForm(true);
  };

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
  {col === "resumeUrl" && row[col] ? (
    <a 
      href={row[col].startsWith('http') ? row[col] : `${BASE_URL}${row[col]}`} 
      target="_blank" 
      rel="noopener noreferrer"
      download
      style={{ color: "#007bff", textDecoration: "underline", fontWeight: "500" }}
    >
      📄 Download Resume
    </a>
  ) : col === "createdAt" ? (
    new Date(row[col]).toLocaleString()
  ) : typeof row[col] === "object" ? (
    JSON.stringify(row[col]).substring(0, 50) + "..."
  ) : (
    String(row[col] || "-").substring(0, 50)
  )}
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
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchData}>
            <FaSync /> Refresh Data
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
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
  className={`nav-btn ${activeTab === "enquiry" ? "active" : ""}`}
  onClick={() => setActiveTab("enquiry")}
>
  📩 Enquiries
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
        <button
          className={`nav-btn ${activeTab === "blogs" ? "active" : ""}`}
          onClick={() => setActiveTab("blogs")}
        >
          <FaBlog /> Blogs
        </button>
        <button
          className={`nav-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <FaCog /> Services
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
              <StatCard
  icon={FaPhone}
  title="Enquiries"
  value={stats.totalEnquiries}
  color="#ff9800"
/>
            </div>

            {/* Quick Overview Tables */}
            <div className="overview-tables">
              <DataTable
                data={data.applications?.slice(0, 5)}
                columns={["name", "email", "role", "resumeUrl", "appliedAt"]}
                title="Recent Job Applications"
              />
              <DataTable
                data={data.contacts?.slice(0, 5)}
                columns={["name", "email", "message", "createdAt"]}
                title="Recent Contact Messages"
              />
              <DataTable
  data={enquiry?.slice(0, 5) || []}
  columns={[
    "full_name",
    "email",
    "phone",
    "project_type",
    "budget",
    "timeline"
  ]}
  title="Recent Enquiries"
/>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <DataTable
            data={data.applications}
            columns={["_id", "name", "email", "role", "message", "resumeUrl", "appliedAt"]}
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
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 className="section-title">Job Openings Management</h2>
              <button
                className="btn-add"
                onClick={() => {
                  setJobForm({ title: "", type: "Full-time", duration: "N/A", location: "", stipend: "Competitive", description: "" });
                  setEditingJob(null);
                  setShowJobForm(true);
                }}
                style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#007bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                <FaPlus /> Add New Job
              </button>
            </div>

            {showJobForm && (
              <div className="form-modal" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #dee2e6" }}>
                <h3>{editingJob ? "Edit Job" : "Create New Job"}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}
                  />
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 6 months, 3-6 months)"
                    value={jobForm.duration}
                    onChange={(e) => setJobForm({ ...jobForm, duration: e.target.value })}
                    style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}
                  />
                  <input
                    type="text"
                    placeholder="Stipend (e.g., Paid, Competitive)"
                    value={jobForm.stipend}
                    onChange={(e) => setJobForm({ ...jobForm, stipend: e.target.value })}
                    style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", fontFamily: "inherit" }}
                  />
                </div>
                <textarea
                  placeholder="Job Description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", marginTop: "15px", fontFamily: "inherit", minHeight: "100px" }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button
                    onClick={handleCreateJob}
                    style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", flex: 1 }}
                  >
                    {editingJob ? "Update Job" : "Create Job"}
                  </button>
                  <button
                    onClick={() => {
                      setShowJobForm(false);
                      setEditingJob(null);
                      setJobForm({ title: "", type: "Full-time", duration: "N/A", location: "", stipend: "Competitive", description: "" });
                    }}
                    style={{ backgroundColor: "#6c757d", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="jobs-list" style={{ display: "grid", gap: "15px" }}>
              {data.jobs && data.jobs.length > 0 ? (
                data.jobs.map((job) => (
                  <div key={job._id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #dee2e6", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>{job.title}</h4>
                        <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}><strong>Type:</strong> {job.type} | <strong>Duration:</strong> {job.duration}</p>
                        <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}><strong>Location:</strong> {job.location} | <strong>Stipend:</strong> {job.stipend}</p>
                        <p style={{ margin: "8px 0", color: "#555", fontSize: "13px", lineHeight: "1.5" }}>{job.description.substring(0, 150)}...</p>
                        <p style={{ margin: "5px 0", fontSize: "12px", color: "#999" }}>Posted: {new Date(job.postedAt).toLocaleDateString()}</p>
                      </div>
                      <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
                        <button
                          onClick={() => handleEditJob(job)}
                          style={{ backgroundColor: "#0d6efd", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          style={{ backgroundColor: "#dc3545", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "12px" }}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#999", padding: "30px" }}>No jobs posted yet. Create one to get started!</p>
              )}
            </div>
          </div>
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

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="section-with-form">
            <div className="form-header">
              <h2 className="section-title">Manage Blogs</h2>
              <button
                className="add-btn"
                onClick={() => {
                  setShowBlogForm(!showBlogForm);
                  setEditingBlog(null);
                  setBlogForm({
                    title: "",
                    slug: "",
                    author: "Detagenix Team",
                    bannerImage: "",
                    tags: "",
                    category: "",
                    content: "",
                  });
                }}
              >
                <FaPlus /> Add New Blog
              </button>
            </div>

            {showBlogForm && (
              <div className="form-container">
                <h3>{editingBlog ? "Edit Blog" : "Create New Blog"}</h3>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, title: e.target.value })
                    }
                    placeholder="Blog title"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, slug: e.target.value })
                    }
                    placeholder="blog-slug-format"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, author: e.target.value })
                    }
                    placeholder="Author name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.bannerImage}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, bannerImage: e.target.value })
                    }
                    placeholder="Banner Image URL: https://example.com/image.jpg"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, tags: e.target.value })
                    }
                    placeholder="Tags (comma-separated): AI, Technology, Development"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, category: e.target.value })
                    }
                    placeholder="Category: Technology"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, content: e.target.value })
                    }
                    placeholder="Content (HTML): <p>Your blog content here...</p>"
                    rows="10"
                  ></textarea>
                </div>
                <div className="form-buttons">
                  <button className="submit-btn" onClick={handleCreateBlog}>
                    {editingBlog ? "Update Blog" : "Create Blog"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowBlogForm(false);
                      setEditingBlog(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="items-grid">
              {blogs.map((blog) => (
                <div key={blog._id} className="item-card">
                  <div className="item-image">
                    <img src={blog.bannerImage} alt={blog.title} />
                  </div>
                  <div className="item-content">
                    <h4>{blog.title}</h4>
                    <p className="item-meta">By {blog.author} • {blog.category}</p>
                    <div className="item-actions">
                      <button
                        className="edit-icon"
                        onClick={() => {
                          setEditingBlog(blog);
                          setBlogForm({
                            title: blog.title,
                            slug: blog.slug,
                            author: blog.author,
                            bannerImage: blog.bannerImage,
                            tags: blog.tags.join(", "),
                            category: blog.category,
                            content: blog.content,
                          });
                          setShowBlogForm(true);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-icon"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="section-with-form">
            <div className="form-header">
              <h2 className="section-title">Manage Services</h2>
              <button
                className="add-btn"
                onClick={() => {
                  setShowServiceForm(!showServiceForm);
                  setEditingService(null);
                  setServiceForm({
                    title: "",
                    description: "",
                    icon: "",
                    link: "",
                  });
                }}
              >
                <FaPlus /> Add New Service
              </button>
            </div>

            {showServiceForm && (
              <div className="form-container">
                <h3>{editingService ? "Edit Service" : "Create New Service"}</h3>
                <div className="form-group">
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, title: e.target.value })
                    }
                    placeholder="Service Title: e.g., CyberSecurity"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={serviceForm.description}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, description: e.target.value })
                    }
                    placeholder="Service description"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={serviceForm.icon}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, icon: e.target.value })
                    }
                    placeholder="Icon Image URL: https://example.com/icon.jpg"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={serviceForm.link}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, link: e.target.value })
                    }
                    placeholder="Link (Optional): /services#cybersecurity"
                  />
                </div>
                <div className="form-buttons">
                  <button className="submit-btn" onClick={handleCreateService}>
                    {editingService ? "Update Service" : "Create Service"}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setShowServiceForm(false);
                      setEditingService(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="items-grid">
              {blogServices.map((service) => (
                <div key={service._id} className="service-card">
                  <div className="service-icon">
                    <img src={service.icon} alt={service.title} />
                  </div>
                  <div className="service-content">
                    <h4>{service.title}</h4>
                    <p>{service.description.substring(0, 100)}...</p>
                    <div className="service-actions">
                      <button
                        className="edit-icon"
                        onClick={() => {
                          setEditingService(service);
                          setServiceForm({
                            title: service.title,
                            description: service.description,
                            icon: service.icon,
                            link: service.link,
                          });
                          setShowServiceForm(true);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-icon"
                        onClick={() => handleDeleteService(service._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "enquiry" && (
  <DataTable
    data={enquiry}
    columns={[
      "_id",
      "full_name",
      "email",
      "phone",
      "company_name",
      "project_type",
      "description",
      "budget",
      "timeline",
      "goal",
      "createdAt"
    ]}
    title="All Enquiries"
  />
)}
      </div>
    </div>
  );
};

export default AdminDashboard;
