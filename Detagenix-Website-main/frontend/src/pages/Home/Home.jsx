import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Testimonial from "../../components/Testimonial/Testimonial";
import { useNavigate } from "react-router-dom";
import Techslider from "../../components/Techslider/Techslider";
import Services from "../../components/Servicessection/Services.jsx";
import  servicesData  from "../../data/servicesData.js";
import aboutusImage from "../../asset/culture2.png";


const Home = () => {
  const [homepageServices, setHomepageServices] = useState(servicesData);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/blog-services`);
        if (Array.isArray(data) && data.length > 0) {
          setHomepageServices(data);
        } else {
          setHomepageServices(servicesData);
        }
        setServicesError("");
      } catch (err) {
        console.error("Failed to load homepage services:", err);
        setHomepageServices(servicesData);
        setServicesError("Showing default services while the admin list loads.");
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [BASE_URL]);
  // Stats data for the highlights section
  const navigate = useNavigate();
  const stats = [
    { icon: "💼", number: "10+", label: "Services" },
    { icon: "🎓", number: "50+", label: "Interns Trained" },
    { icon: "⭐", number: "100+", label: "Projects" },
    { icon: "😊", number: "100%", label: "Client Satisfaction" },
    { icon: "🏆", number: "3+", label: "Years Experience" }
  ];
  //  const goToServices = () => {
  //   navigate("/services"); // Redirects to About component
  // };
  const goToAbout = () => {
     navigate("/about"); // Redirects to About component
   };

  return (
    <>
    
      {/* ✅ HERO SECTION */}
      <section className="hero-video-section">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="hero-background-video"
          poster="/images/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay"></div>

        <div className="hero-content">
          <h1>Transforming Ideas into Digital Reality</h1>
          <p>We build cutting-edge web solutions, AI applications, and cloud services that drive business growth</p>

          {/* <div className="hero-buttons">
            <button onClick={goToServices} className="btn-primary">Get Started</button>
            <button onClick={() => navigate("/projects")} className="btn-secondary">View Our Work</button>
          </div> */}
        </div>
      </section>
      <section className="about-section">
      <div className="about-container">

        {/* LEFT SIDE IMAGE */}
        <div className="about-image">
          <img
            src={aboutusImage}
            alt="About Us"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="about-content">
          <h2>About Us</h2>
          <p className="lead">
          <span className="highlight">Detagenix</span> is a dynamic IT consulting and digital transformation organization
          dedicated to empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic
          software development to craft tailored, enterprise-grade applications, specializing in robust technologies
          like the <strong>MERN Stack</strong> and advanced services such as <strong>AI/ML solutions, Blockchain and Cybersecurity.
</strong>.
          <br />
          <br />
          Our Resource Deployment model enables organizations to scale efficiently by providing skilled professionals across major technologies on hourly, pro-rata, or project-based engagements, ensuring flexibility and continuity in every development cycle.
        </p>

          <button onClick={goToAbout}className="about-btn">Learn More</button>
        </div>

      </div>
    </section>
       {/* ✅ PORTFOLIO SECTION
      <PortfolioSection limit={6} /> */}



      {/* ✅ SERVICES SECTION */}
      <section className="services-section">
      <h1>Our Services</h1>
      {servicesLoading ? (
        <p className="services-status">Loading services...</p>
      ) : servicesError ? (
        <p className="services-status warning">{servicesError}</p>
      ) : null}

      <div className="service-grids">
        {homepageServices.map((service, index) => (
          <Services 
            key={service._id || service.id || index}
            service={service}
          />
        ))}
      </div>
    </section>

     
      {/* ✅ HIGHLIGHTS/STATS SECTION */}
      <section className="stats-bar">
        <h1>Numbers That Define Us</h1>
  <div className="stats-slider">
    <div className="stats-track">
      {[...stats, ...stats].map((stat, index) => ( // duplicate for infinite loop
        <div key={index} className="stat-item">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>


      

 {/* <Blogs blogs={blogs} loading={loading} /> */}
 
<Techslider />
      {/* ✅ TESTIMONIAL SECTION */}
      <Testimonial />
    </>
  );
};

export default Home;