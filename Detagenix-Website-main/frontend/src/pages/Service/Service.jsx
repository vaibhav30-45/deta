// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaRegCheckCircle,
//   FaClock,
//   FaHeadset,
//   FaCloud,
//   FaCode,
//   FaCogs,
//   FaSearch,
//   FaLightbulb,
//   FaShieldAlt,
//   FaRocket,
//   FaLifeRing,
//   FaHeartbeat,
//   FaCoins,
//   FaShoppingBag,
//   FaGraduationCap,
//   FaTruck,
//   FaIndustry,
//   FaCheckCircle
// } from "react-icons/fa";
// import servicespageData from "../../data/servicespageData";
// import ServiceModal from "../../components/ServicePage/ServiceModal";
// import BookServiceForm from "../../components/ServicePage/BookServiceForm";
// import "./Service.css";

// const Service = () => {
//   const [selectedService, setSelectedService] = useState(null);
//   const [openDetail, setOpenDetail] = useState(false);
//   const [openForm, setOpenForm] = useState(false);

//   const openFormModal = () => {
//     setSelectedService(null);
//     setOpenForm(true);
//   };

//   const openModal = (service) => {
//     setSelectedService(service);
//     setOpenDetail(true);
//   };

//   const closeModal = () => {
//     setOpenDetail(false);
//     setSelectedService(null);
//   };

//   const openBookingForm = () => {
//     setOpenDetail(false);
//     setOpenForm(true);
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const getServiceIcon = (id) => {
//     switch (id) {
//       case "core-1":
//         return <FaCloud className="service-icon" />;
//       case "core-2":
//         return <FaCode className="service-icon" />;
//       case "core-3":
//         return <FaUsers className="service-icon" />;
//       case "core-4":
//         return <FaCogs className="service-icon" />;
//       default:
//         return <FaCode className="service-icon" />;
//     }
//   };

//   return (
//     <div className="services-page">
//       {/* 1. HERO BANNER */}
//       <section className="services-hero">
//         <div className="hero-overlay"></div>
//         <div className="hero-content-container">
//           <h1 className="hero-title">Smart Solutions. <span className="highlight">Real Impact.</span></h1>
//           <p className="hero-subtitle">
//             Tailored software development, cloud modernization, and agile resource deployment designed to scale your business operations and maximize digital efficiency.
//           </p>
//           <button className="hero-cta-btn" onClick={openFormModal}>
//             Talk to an Expert
//           </button>
//         </div>

//         {/* 4 Feature Row below Hero */}
//         <div className="hero-features-row">
//           <div className="hero-feature-card">
//             <FaUsers className="feature-icon" />
//             <div className="feature-text">
//               <h4>Expert Team</h4>
//               <p>Top-tier certified engineers</p>
//             </div>
//           </div>
//           <div className="hero-feature-card">
//             <FaRegCheckCircle className="feature-icon" />
//             <div className="feature-text">
//               <h4>Quality Assured</h4>
//               <p>Rigorous automated testing</p>
//             </div>
//           </div>
//           <div className="hero-feature-card">
//             <FaClock className="feature-icon" />
//             <div className="feature-text">
//               <h4>On-Time Delivery</h4>
//               <p>Agile sprints, fast launch</p>
//             </div>
//           </div>
//           <div className="hero-feature-card">
//             <FaHeadset className="feature-icon" />
//             <div className="feature-text">
//               <h4>Dedicated Support</h4>
//               <p>24/7 post-launch maintenance</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2. OUR CORE SERVICES */}
//       <section className="services-list-section">
//         <div className="section-header">
//           <h2 className="section-title">Our Core Services</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">Comprehensive solutions designed to accelerate your growth and solve complex technological challenges.</p>
//         </div>

//         <div className="services-modern-grid">
//           {servicespageData.map((service) => (
//             <div key={service.id} className="service-card-modern">
//               <div className="card-top">
//                 <div className="service-icon-wrapper">
//                   {getServiceIcon(service.id)}
//                 </div>
//                 <h3>{service.title}</h3>
//                 <p className="service-desc-text">{service.desc}</p>
//               </div>

//               <ul className="service-bullet-list">
//                 {service.techStack.slice(0, 5).map((tech, index) => (
//                   <li key={index}>
//                     <FaCheckCircle className="bullet-check" />
//                     <span>{tech}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button className="service-learn-more" onClick={() => openModal(service)}>
//                 Learn More &rarr;
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3. HOW WE DELIVER VALUE */}
//       <section className="delivery-value-section">
//         <div className="section-header">
//           <h2 className="section-title">How We Deliver Value</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">Our structured methodology ensures high-quality execution and transparent collaboration at every stage.</p>
//         </div>

//         <div className="delivery-grid-modern">
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">01</span>
//               <FaSearch className="delivery-icon" />
//             </div>
//             <h4>Discovery & Analysis</h4>
//             <p>We deeply analyze your business workflows, constraints, and architecture objectives to design the ideal path forward.</p>
//           </div>
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">02</span>
//               <FaLightbulb className="delivery-icon" />
//             </div>
//             <h4>Strategy & Design</h4>
//             <p>Crafting clear design systems, comprehensive technical documentation, and robust database architectures before coding.</p>
//           </div>
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">03</span>
//               <FaCode className="delivery-icon" />
//             </div>
//             <h4>Agile Development</h4>
//             <p>Developing in sprint cycles with test-driven methodologies, keeping you updated with live staging environments.</p>
//           </div>
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">04</span>
//               <FaShieldAlt className="delivery-icon" />
//             </div>
//             <h4>Rigorous QA</h4>
//             <p>Executing functional, performance, security, and automated testing suites to certify production readiness.</p>
//           </div>
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">05</span>
//               <FaRocket className="delivery-icon" />
//             </div>
//             <h4>Smooth Deployment</h4>
//             <p>Configuring CI/CD pipelines, automated rollbacks, and cloud-native infrastructure for zero-downtime releases.</p>
//           </div>
//           <div className="delivery-step-card">
//             <div className="step-num-icon">
//               <span className="step-number">06</span>
//               <FaLifeRing className="delivery-icon" />
//             </div>
//             <h4>Continuous Support</h4>
//             <p>Providing 24/7 service monitoring, software upgrades, regular security updates, and performance tuning.</p>
//           </div>
//         </div>
//       </section>

//       {/* 4. SOLUTIONS ACROSS INDUSTRIES */}
//       <section className="industries-strip-section">
//         <div className="industries-strip-content">
//           <h3>Solutions Across Industries</h3>
//           <p>We empower sectors with bespoke, compliance-aligned architectures built for massive scale.</p>

//           <div className="industries-icons-row">
//             <div className="industry-icon-item">
//               <FaHeartbeat className="ind-icon" />
//               <span>Healthcare</span>
//             </div>
//             <div className="industry-icon-item">
//               <FaCoins className="ind-icon" />
//               <span>Fintech</span>
//             </div>
//             <div className="industry-icon-item">
//               <FaShoppingBag className="ind-icon" />
//               <span>Retail</span>
//             </div>
//             <div className="industry-icon-item">
//               <FaGraduationCap className="ind-icon" />
//               <span>Education</span>
//             </div>
//             <div className="industry-icon-item">
//               <FaTruck className="ind-icon" />
//               <span>Logistics</span>
//             </div>
//             <div className="industry-icon-item">
//               <FaIndustry className="ind-icon" />
//               <span>Manufacturing</span>
//             </div>
//           </div>

//           <div className="industries-cta-banner">
//             <h4>Ready to scale your next digital solution?</h4>
//             <button className="cta-banner-btn" onClick={openFormModal}>Book a Custom Demo</button>
//           </div>
//         </div>
//       </section>

//       {/* 5. WHY PARTNER WITH DETAGENIX */}
//       <section className="why-partner-section">
//         <div className="why-partner-container">
//           <div className="why-partner-left">
//             <h2 className="why-title">Why Partner With Detagenix?</h2>
//             <div className="title-underline-left"></div>
//             <p className="why-desc">
//               We don't just write code — we build digital solutions that propel businesses forward. Our commitment to deep engineering expertise, client transparency, and continuous optimization ensures your company stays years ahead of the competition.
//             </p>
//             <div className="why-stats">
//               <div className="stat-item">
//                 <span className="stat-num">98%</span>
//                 <span className="stat-label">Client Satisfaction</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-num">10+</span>
//                 <span className="stat-label">Years of Engineering</span>
//               </div>
//             </div>
//           </div>

//           <div className="why-partner-right">
//             <div className="why-grid">
//               <div className="why-card">
//                 <div className="why-card-icon-num">01</div>
//                 <h4>Experienced Specialists</h4>
//                 <p>Hire certified cloud architects and full-stack software engineers who hit the ground running.</p>
//               </div>
//               <div className="why-card">
//                 <div className="why-card-icon-num">02</div>
//                 <h4>Client-Centric Process</h4>
//                 <p>Your business needs drive our engineering choices. We maintain complete visibility and regular feedback loops.</p>
//               </div>
//               <div className="why-card">
//                 <div className="why-card-icon-num">03</div>
//                 <h4>Agile & Adaptive</h4>
//                 <p>Adapt quickly to market updates or feature pivots with sprint cycles tuned for flexibility.</p>
//               </div>
//               <div className="why-card">
//                 <div className="why-card-icon-num">04</div>
//                 <h4>Scale & Stability</h4>
//                 <p>Ensure high availability, data redundancy, and automated scaling to support millions of concurrent hits.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* MODALS */}
//       {openDetail && selectedService && (
//         <ServiceModal
//           service={selectedService}
//           onClose={closeModal}
//           openForm={openBookingForm}
//         />
//       )}

//       {openForm && (
//         <BookServiceForm
//           serviceName={selectedService?.title}
//           onClose={() => setOpenForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Service;
import React, { useState, useEffect } from "react";
import Servicecard from "../../components/ServicePage/ServiceCard/Servicecard";
import servicespageData from "../../data/servicespageData";
import ServiceModal from "../../components/ServicePage/ServiceModal";
import BookServiceForm from "../../components/ServicePage/BookServiceForm";
import axios from "axios";
import "./Service.css";

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Fetch dynamic services from backend (blog-services contains title/icon/link used on frontend)
    const fetchServices = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
        // Use blog-services which stores title, description, icon and link
        const response = await axios.get(`${BASE_URL}/api/blog-services`);
        if (Array.isArray(response.data)) setDynamicServices(response.data);
        else setDynamicServices([]);
      } catch (error) {
        // keep static services intact if backend unavailable
        setDynamicServices([]);
      }
    };
    fetchServices();
  }, []);

  // OPEN MODAL
  const openModal = (service) => {
    setSelectedService(service);
    setOpenDetail(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setOpenDetail(false);
    setSelectedService(null);
  };

  // OPEN FORM (BOOK SERVICE)
  const openBookingForm = () => {
    setOpenDetail(false);
    setOpenForm(true);
  };

  const openFormModal = () => {
    setSelectedService(null);
    setOpenForm(true);
  };

  return (
    <section className="services-section service-page">
      <div className="services-header">
    <h1>Our Services</h1>

    <button
      className="book-btn-header"
      onClick={openFormModal}
    >
      Reach Out
    </button>
  </div>
      <div className="services-grid">
        {/* Render the original static services first (preserve site appearance) */}
        {servicespageData.map((service, index) => (
          <Servicecard
            key={service.id || index}
            service={service}
            onLearnMore={() => openModal(service)}
          />
        ))}

        {/* Append admin-added dynamic services from backend */}
        {dynamicServices.map((service, index) => (
          <Servicecard
            key={service._id || `dyn-${index}`}
            service={service}
            onLearnMore={() => openModal(service)}
          />
        ))}
      </div>
      <button className="book-btn" onClick={openFormModal}>
        Book Demo
      </button>

      {openDetail && selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={closeModal}
          openForm={openBookingForm}
        />
      )}

      {openForm && (
        <BookServiceForm
          serviceName={selectedService?.title || selectedService?.name}
          onClose={() => setOpenForm(false)}
        />
      )}
    </section>
  );
};

export default Service;