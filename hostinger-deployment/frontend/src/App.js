import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./layout/Navbar/Navbar.jsx";
import Footer from "./layout/Footer/Footer.jsx";
import BlogPage from "./pages/Blog/BlogPage.jsx";
import BlogDetailPage from "./pages/Blog/BlogDetailPage.jsx";
import Service from "./pages/Service/Service.jsx";
import Projectpage from "./pages/Project/Projectpage.jsx";
import Contactus from "./pages/Contact/Contactus.jsx"; 
import Aboutus from "./pages/About/Aboutus.jsx"; 
import Careers from "./pages/career/Career.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.jsx";
import BookServiceForm from "./components/ServicePage/BookServiceForm.jsx";
import Technology from "./pages/Technology/Technology.jsx";
import Industry from "./pages/Industry/Industries.jsx";
import ChatBot from "./components/Chatbot/Chatbot.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import ProtectedRoute from "./pages/Admin/ProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  
  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <ChatBot />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/book-service/:service" element={<BookServiceForm />} />

        <Route path="/projects" element={<Projectpage />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/industries" element={<Industry />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;

    
