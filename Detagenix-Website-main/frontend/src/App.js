import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/Aboutus.jsx";
import Service from "./pages/Service/Service.jsx";
import Contactus from "./pages/Contact/Contactus.jsx";
import BlogPage from "./pages/Blog/BlogPage.jsx";
import Career from "./pages/career/Career.jsx";
import Projectpage from "./pages/Project/Projectpage.jsx";
import Technology from "./pages/Technology/Technology.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ProtectedRoute from "./pages/Admin/ProtectedRoute.jsx";
import Navbar from "./layout/Navbar/Navbar.jsx";
import Footer from "./layout/Footer/Footer.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/career" element={<Career />} />
        <Route path="/project" element={<Projectpage />} />
        <Route path="/technology" element={<Technology />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
