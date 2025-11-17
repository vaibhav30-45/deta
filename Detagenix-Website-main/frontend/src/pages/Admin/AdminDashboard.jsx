import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { FaUsers, FaFileAlt, FaPhone, FaBriefcase, FaGift, FaChartBar, FaSync, FaBlog, FaCog, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
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
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingService, setEditingService] = useState(null);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [adminRes, blogsRes, servicesRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/admin/data`),
        axios.get(`${BASE_URL}/api/blogs`),
        axios.get(`${BASE_URL}/api/blog-services`),
      ]);

      setData(adminRes.data);
      setBlogs(blogsRes.data);
      setBlogServices(servicesRes.data);

      setStats({
        totalAdmins: adminRes.data.admins?.length || 0,
        totalApplications: adminRes.data.applications?.length || 0,
        totalContacts: adminRes.data.contacts?.length || 0,
        totalJobs: adminRes.data.jobs?.length || 0,
        totalUsers: adminRes.data.users?.length || 0,
        totalBookings: adminRes.data.bookings?.length || 0,
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
                  <label>Title</label>
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
                  <label>Slug</label>
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
                  <label>Author</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, author: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Banner Image URL</label>
                  <input
                    type="text"
                    value={blogForm.bannerImage}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, bannerImage: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, tags: e.target.value })
                    }
                    placeholder="AI, Technology, Development"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, category: e.target.value })
                    }
                    placeholder="Technology"
                  />
                </div>
                <div className="form-group">
                  <label>Content (HTML)</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, content: e.target.value })
                    }
                    placeholder="<p>Your blog content here...</p>"
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
      </div>
    </div>
  );
};

export default AdminDashboard;        {/* Services Tab */}
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
                  <label>Service Title</label>
                  <input
                    type="text"
                    value={serviceForm.title}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, title: e.target.value })
                    }
                    placeholder="e.g., CyberSecurity"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
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
                  <label>Icon Image URL</label>
                  <input
                    type="text"
                    value={serviceForm.icon}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, icon: e.target.value })
                    }
                    placeholder="https://example.com/icon.jpg"
                  />
                </div>
                <div className="form-group">
                  <label>Link (Optional)</label>
                  <input
                    type="text"
                    value={serviceForm.link}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, link: e.target.value })
                    }
                    placeholder="/services#cybersecurity"
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
