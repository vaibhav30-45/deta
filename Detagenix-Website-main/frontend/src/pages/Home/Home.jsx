// import "./Home.css";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Testimonial from "../../components/Testimonial/Testimonial";
// import Techslider from "../../components/Techslider/Techslider";
// import aboutusImage from "../../asset/culture2.png";
// import receptionImage from "../../asset/detagenix.jpeg";
// import ecommerceImg from "../../asset/projects/ecommerce-platform.jpeg";
// import aiChatbotImg from "../../asset/projects/ai-chatbot.avif";
// import mobileBankingImg from "../../asset/projects/mobile-banking-app.avif";
// import FAQ from "../../components/FAQ/FAQ";
// import axios from "axios";
// import SEO from "../../components/SEO"
// import { createPortal } from "react-dom";
// import {
//   FaCode,
//   FaBrain,
//   FaMobileAlt,
//   FaCloud,
//   FaShieldAlt,
//   FaChartBar,
//   FaUsers,
//   FaCheckCircle,
//   FaLaptopCode,
//   FaHeadset,
//   FaClock,
//   FaArrowRight,
//   FaProjectDiagram,
//   FaGraduationCap,
//   FaSmile,
//   FaAward,
//   FaServer,
//   FaHeart
// } from "react-icons/fa";
// import * as FcIcons from "react-icons/fc";

// const DynamicIcon = ({ iconName, ...props }) => {
//   const IconComponent = FcIcons[iconName];
//   if (!IconComponent) return <FcIcons.FcSettings {...props} />; // Fallback icon
//   return <IconComponent {...props} Size = {100} />;
// };

// const Home = () => {
//   const BASE_URL =
//   process.env.REACT_APP_BASE_URL || "http://localhost:5000";

//   const [latestBlogs, setLatestBlogs] = useState([]);
// const [blogLoading, setBlogLoading] = useState(true);

// //service
//   const [dynamicServices, setDynamicServices] = useState([]);

//  const [faqs, setFaqs] = useState([]);
// const [faqLoading, setFaqLoading] = useState(true);

//   const navigate = useNavigate();
//   const [isOpenForm, setIsOpenForm] = useState(false);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     company_name: "",
//     project_type: "",
//     description: "",
//     budget: "",
//     timeline: "",
//     goal: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${BASE_URL}/api/enquiry`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Form submitted successfully ✅");
//         setFormData({
//           full_name: "",
//           email: "",
//           phone: "",
//           company_name: "",
//           project_type: "",
//           description: "",
//           budget: "",
//           timeline: "",
//           goal: "",
//         });
//         setIsOpenForm(false);
//       } else {
//         alert(data.message || "Something went wrong ❌");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Server error ❌");
//     }
//   };

//    useEffect(() => {
//   const fetchFaqs = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/faqs`);
//       setFaqs(res.data);
//     } catch (error) {
//       console.error("Failed to fetch FAQs:", error);
//     } finally {
//       setFaqLoading(false);
//     }
//   };

//   fetchFaqs();
// }, [BASE_URL]);

//   useEffect(() => {
//   const fetchLatestBlogs = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/blogs`);
//        console.log("API Response:", res.data);

//       let data = res.data;

//       if (!data) data = [];

//       if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
//         data = data.value;
//       }

//       const sortedBlogs = [...data].sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.date || 0);
//         const dateB = new Date(b.createdAt || b.date || 0);
//         return dateB - dateA;
//       });

//       setLatestBlogs(sortedBlogs.slice(0, 3)); // Latest 3 blogs
//     } catch (error) {
//       console.error("Failed to fetch latest blogs:", error);
//     } finally {
//       setBlogLoading(false);
//     }
//   };
//   const fetchServices = async () => {
//       try {
//         const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
//         // Use blog-services which stores title, description, icon and link
//         const response = await axios.get(`${BASE_URL}/api/blog-services`);
//        let data = response.data;

//       if (!data) data = [];

//       if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
//         data = data.value;
//       }

//       const sortedService = [...data].sort((a, b) => {
//         const dateA = new Date(a.createdAt  || 0);
//         const dateB = new Date(b.createdAt  || 0);
//         return dateB - dateA;
//       });

//       setDynamicServices(sortedService.slice(0, 6)); // Latest 3 blogs
//     } catch (error) {
//       console.error("Failed to fetch services:", error);
//     } finally {
      
//     }
//     };
//    fetchServices();
//   fetchLatestBlogs();
// }, [BASE_URL]);

//   useEffect(() => {
//     if (isOpenForm) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpenForm]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   return (
//     <>
//     {/* SEO */}
//     <SEO
//         title="Detagenix | Web Development, Mobile Apps & Digital Solutions"
//         description="Detagenix delivers custom web development, mobile app development, UI/UX design, cloud solutions, and digital transformation services for businesses."
//         keywords="Detagenix, web development company, mobile app development, software development, MERN stack, React development, digital solutions"
//         canonical="https://detagenix.com/"
//       />

//       {/* 1. HERO SECTION (Full Background Video) */}
//       <section className="hero-video-section-new">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="hero-background-video-new"
//           poster="/images/hero-poster.jpg"
//         >
//           <source src="/hero-video.mp4" type="video/mp4" />
//         </video>
//         <div className="video-overlay-new"></div>
//         <div className="hero-content-new">
//           <h1>Digitize, Automate & Scale Your Business With Technology </h1>
//           <p>We help startups, SMEs, and enterprises streamline operations, automate workflows, strengthen their digital presence, and generate measurable business growth through custom software, AI solutions, and modern web platforms.</p>
//           <div className="hero-buttons-new">
//             <button onClick={() => setIsOpenForm(true)} className="btn-primary-new">
//               Book Free Consultation 
//             </button>
//             <button onClick={() => navigate("/about")} className="btn-secondary-new">
//              View Our Work 
//             </button>
//           </div>
//            <div className="hero-services-line">
//     Website Development | CRM & ERP Solutions | AI Integration |
//     Business Automation | SEO & Digital Growth
//   </div>
//         </div>
//       </section>

//       {/* 2. ABOUT US SECTION */}
//       <section className="about-section-new" id="about">
//         <div className="about-container-new">
//           <div className="about-image-new">
//             <img src={aboutusImage} alt="About Us Team" />
//           </div>
//           <div className="about-content-new">
//             <span className="section-subtitle-new">About <span className="highlight-blue">US</span></span>
//             <h2>Empowering Businesses Through Modern Technology</h2>
//             <p className="lead">
//               Detagenix is a dynamic IT consulting and digital transformation organization dedicated to
//               empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic
//               software development to craft tailored, enterprise-grade applications.
//             </p>
//             <p className="subtext">
//               Specializing in robust technologies like the MERN Stack, AI/ML integrations, Blockchain,
//               and Cybersecurity. Our team of skilled professionals works closely with you to deliver
//               secure, high-performance applications designed to scale.
//             </p>
//             <button onClick={() => navigate("/about")} className="about-btn-new">
//               Read More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 3. SERVICES SECTION */}
//       <section className="services-section-new" id="services">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Services</span></span> */}
//           <h2>Custom Solutions for Your Business Needs</h2>
//           <p className="section-desc">
//             We deliver cutting-edge software solutions to help your business grow and succeed in the digital era.
//           </p>
//         </div>

//         <div className="services-grid-new">

//           {dynamicServices.map((service, index) => (
//                <div className="service-card-new" key={service._id || index}>
//             <div className="service-icon-box"><DynamicIcon iconName={service.icon} /></div>
//             <h3>{service.title}</h3>
//             <p>{service.description}</p>
//             </div>
            
//         ))}
         
          
//         </div> <div className="projects-action-new">
//           <button onClick={() => navigate("/services")} className="btn-primary-new">
//             View All Service
//           </button>
//         </div>
//       </section>

//       {/* 4. WHY CHOOSE US SECTION */}
     
//       <section className="why-choose-section-new" id="why-choose-us">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Why Choose <span className="highlight-blue">Detagenix?</span></span> */}
//           <h2>Why Partner with Detagenix?</h2>
//           <p className="section-desc">
//             We bring a unique blend of industry expertise, modern tech stack, and customer commitment.
//           </p>
//         </div>

//         <div className="why-choose-grid-new">
//           {/* Left Column */}
//           <div className="why-choose-left">
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaChartBar size={24} /></div>
//               <div className="feature-text">
//                 <h3>Business-Driven Solutions</h3>
//                 <p>Technology aligned with your business goals.</p>
//               </div>
//             </div>
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaUsers size={24} /></div>
//               <div className="feature-text">
//                 <h3>Experienced Team</h3>
//                 <p>Skilled professionals across multiple technologies.</p>
//               </div>
//             </div>
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaProjectDiagram size={24} /></div>
//               <div className="feature-text">
//                 <h3>Transparent Process</h3>
//                 <p>Clear communication and project visibility.</p>
//               </div>
//             </div>
//           </div>

//           {/* Center Image */}
//           <div className="why-choose-center">
//             <img src={receptionImage} alt="Detagenix Office Desk" className="center-reception-image" />
//           </div>

//           {/* Right Column */}
//           <div className="why-choose-right">
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaLaptopCode size={24} /></div>
//               <div className="feature-text">
//                 <h3>End-to-End Development</h3>
//                 <p>From concept to deployment and support.</p>
//               </div>
//             </div>
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaServer size={24} /></div>
//               <div className="feature-text">
//                 <h3>Scalable Architecture</h3>
//                 <p>Solutions built for future growth.</p>
//               </div>
//             </div>
//             <div className="choose-feature-card">
//               <div className="feature-icon"><FaHeart size={24} /></div>
//               <div className="feature-text">
//                 <h3>Long-Term Partnership</h3>
//                 <p>Ongoing support beyond project delivery.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 5. PROCESS / WORKFLOW SECTION */}
//       <section className="process-section-new" id="process">
        
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Process / How We Work</span></span> */}
//           <h2>A step-by-step approach to bringing your digital projects to life.</h2>
//         </div>

//         <div className="process-workflow-container-new">
//           <div className="process-step-new">
//             <div className="step-number-new">01</div>
//             <h3>Discovery</h3>
//             <p>Understanding your goals and project requirements.</p>
//           </div>
//           <div className="process-step-new">
//             <div className="step-number-new">02</div>
//             <h3>Planning</h3>
//             <p>Creating a detailed roadmap and architecture.</p>
//           </div>
//           <div className="process-step-new">
//             <div className="step-number-new">03</div>
//             <h3>Design & Develop</h3>
//             <p>Building your product with clean, high-quality code.</p>
//           </div>
//           <div className="process-step-new">
//             <div className="step-number-new">04</div>
//             <h3>Testing & QA</h3>
//             <p>Thorough testing to ensure bug-free software.</p>
//           </div>
//           <div className="process-step-new">
//             <div className="step-number-new">05</div>
//             <h3>Launch & Support</h3>
//             <p>Launching your app and providing ongoing maintenance.</p>
//           </div>
//         </div>
//       </section>

//       {/* 6. TECHNOLOGY STACK SECTION */}
//       <section className="tech-stack-section-new" id="technology">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Our Technology <span className="highlight-blue">Stack</span></span> */}
//           <h2>Technologies We Specialize In</h2>
//           <p className="section-desc">
//             We leverage state-of-the-art frameworks and databases to build high-performance systems.
//           </p>
//         </div>

//         <div className="tech-slider-new">
//           <Techslider />
//         </div>
//       </section>

//       {/* 7. IMPACT / STATS SECTION */}
//       <section className="stats-section-new">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Our Impact in <span className="highlight-blue">Numbers</span></span> */}
//           <h2>Numbers That Define Us</h2>
//         </div>

//         <div className="stats-grid-new">
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaProjectDiagram size={24} /></div>
//             <h2>50+</h2>
//             <p>Projects Delivered</p>
//           </div>
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaGraduationCap size={24} /></div>
//             <h2>94+</h2>
//             <p>Interns Trained</p>
//           </div>
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaSmile size={24} /></div>
//             <h2>95%</h2>
//             <p>Client Satisfaction</p>
//           </div>
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaAward size={24} /></div>
//             <h2>3+</h2>
//             <p>Years Experience</p>
//           </div>
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaServer size={24} /></div>
//             <h2>10+</h2>
//             <p>Services Offered</p>
//           </div>
//           <div className="stat-card-new">
//             <div className="stat-icon-box-new"><FaHeart size={24} /></div>
//             <h2>50+</h2>
//             <p>Happy Clients</p>
//           </div>
//         </div>
//       </section>

//       {/* 8. RECENT PROJECTS SECTION */}
//       {/* <section className="projects-section-new" id="projects">
//         <div className="section-header-new">
//           <span className="section-subtitle-new">Our Recent <span className="highlight-blue">Projects</span></span>
//           <h2>Explore some of the custom solutions we've developed for our clients.</h2>
//         </div>

//         <div className="projects-grid-new">
//           <div className="project-card-new">
//             <div className="project-image-box-new">
//               <img src={ecommerceImg} alt="E-Commerce Platform" />
//             </div>
//             <div className="project-content-new">
//               <h3>E-Commerce Platform</h3>
//               <p>A full-featured, scalable online store with custom cart flows, search indexing, and secure Stripe payments.</p>
//               <div className="project-tech-tags-new">
//                 <span>React</span>
//                 <span>Node.js</span>
//                 <span>MongoDB</span>
//                 <span>Stripe</span>
//               </div>
//               <a href="/project" className="project-link-new">Learn More →</a>
//             </div>
//           </div>
//           <div className="project-card-new">
//             <div className="project-image-box-new">
//               <img src={aiChatbotImg} alt="AI Chatbot System" />
//             </div>
//             <div className="project-content-new">
//               <h3>AI Chatbot System</h3>
//               <p>An intelligent customer service agent built with Large Language Models to answer FAQs and triage support tickets.</p>
//               <div className="project-tech-tags-new">
//                 <span>Python</span>
//                 <span>OpenAI</span>
//                 <span>AWS</span>
//                 <span>React</span>
//               </div>
//               <a href="/project" className="project-link-new">Learn More →</a>
//             </div>
//           </div>
//           <div className="project-card-new">
//             <div className="project-image-box-new">
//               <img src={mobileBankingImg} alt="Mobile Banking App" />
//             </div>
//             <div className="project-content-new">
//               <h3>Mobile Banking App</h3>
//               <p>A secure React Native application with biometric login, real-time transaction alerts, and transfer integrations.</p>
//               <div className="project-tech-tags-new">
//                 <span>React Native</span>
//                 <span>Node.js</span>
//                 <span>Firebase</span>
//                 <span>Biometrics</span>
//               </div>
//               <a href="/project" className="project-link-new">Learn More →</a>
//             </div>
//           </div>
//         </div>

//         <div className="projects-action-new">
//           <button onClick={() => navigate("/project")} className="btn-primary-new">
//             View All Projects
//           </button>
//         </div>
//       </section> */}

//       {/* 8.5. BLOG SECTION */}
//       <section className="projects-section-new" id="blog">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Blog</span></span> */}
//           <h2>Insights and News</h2>
//           <p className="section-desc">Stay updated with the latest trends in technology, digital transformation, and software engineering.</p>
//         </div>

//        <div className="projects-grid-new">
//   {blogLoading ? (
//     <p>Loading latest blogs...</p>
//   ) : latestBlogs.length > 0 ? (
//     latestBlogs.map((blog) => (
      
//      <div
//   className="project-card-new"
//   key={blog._id || blog.id || blog.slug}
//   onClick={() =>
//     navigate(`/blog/${blog.slug || blog._id}`)
//   }
//   style={{ cursor: "pointer" }}
// >
//         <div className="project-image-box-new">
//          <img
//   src={blog.bannerImage || blog.coverImage || blog.image}
//   alt={blog.title}
// />
//         </div>

//         <div className="project-content-new">
//           <h3>{blog.title}</h3>

// <p>
//   {blog.content
//     ?.replace(/<[^>]*>/g, "") // HTML tags remove
//     .replace(/&nbsp;/g, " ")  // &nbsp; remove
//     .substring(0, 120) + "..."}
// </p>
//           {/* <div className="project-tech-tags-new">
//             {blog.tags?.slice(0, 2).map((tag, index) => (
//               <span key={index}>{tag}</span>
//             ))}
//           </div> */}

//           <button
//             className="project-link-new"
//             onClick={() =>
//               navigate(`/blog/${blog.slug || blog._id}`)
//             }
//           >
//             Read Article →
//           </button>
//         </div>
//       </div>
//     ))
//   ) : (
//     <p>No blogs available.</p>
//   )}
// </div>

//         <div className="projects-action-new">
//           <button onClick={() => navigate("/blog")} className="btn-primary-new">
//             View All Articles
//           </button>
//         </div>
//       </section>

//       {/* 9. TESTIMONIALS SECTION */}
//       <section className="testimonials-section-new" id="testimonials">
//         <div className="section-header-new">
//           {/* <span className="section-subtitle-new">What Our <span className="highlight-blue">Clients Say</span></span> */}
//           <h2>Feedback from our trusted corporate partners.</h2>
//         </div>
//         <Testimonial />
//       </section>
       
//        <FAQ faqs={faqs} loading={faqLoading} />

//       {/* 10. MODAL FORM PORTAL */}
//       {isOpenForm &&
//         createPortal(
//           <div className="modal-overlay" onClick={(e) => {
//             if (e.target.className === "modal-overlay") {
//               setIsOpenForm(false);
//             }
//           }}>
//             <div className="modal-container-two-col">
//               <button
//                 className="close-btn"
//                 onClick={() => setIsOpenForm(false)}
//                 aria-label="Close Modal"
//               >
//                 ✖
//               </button>

//               {/* Left Info Panel - Tailored for "Get Started" */}
//               <div className="modal-left-panel">
//                 <h2 className="modal-left-title">
//                   Ready to <span className="highlight">Scale?</span>
//                 </h2>
//                 <p className="modal-left-desc">
//                   Kickstart your digital transformation with Detagenix. Get a free consultation tailored to your specific business needs.
//                 </p>

//                 <div className="modal-feature-list">
//                   <div className="modal-feature-item">
//                     <div className="modal-icon-circle">
//                       <FaLaptopCode />
//                     </div>
//                     <div className="modal-feature-text">
//                       <h4>Custom Solutions</h4>
//                       <p>Tailored enterprise-grade applications designed specifically for your business.</p>
//                     </div>
//                   </div>

//                   <div className="modal-feature-item">
//                     <div className="modal-icon-circle">
//                       <FaCheckCircle />
//                     </div>
//                     <div className="modal-feature-text">
//                       <h4>Quality Assurance</h4>
//                       <p>Rigorous testing protocols to ensure bug-free, high-performance delivery.</p>
//                     </div>
//                   </div>

//                   <div className="modal-feature-item">
//                     <div className="modal-icon-circle">
//                       <FaHeadset />
//                     </div>
//                     <div className="modal-feature-text">
//                       <h4>Dedicated Support</h4>
//                       <p>Round-the-clock technical support and dedicated project consultations.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Form Panel - Your exact original form inputs */}
//               <div className="modal-right-panel">
//                 <h3 className="form-title">Let’s Build Your Project</h3>
//                 <p className="form-desc">Briefly describe your project requirements to get started.</p>

//                 <form onSubmit={handleSubmit} className="modal-two-col-form">
//                   <div className="modal-grid">
//                     <div className="modal-grid-half">
//                       <input
//                         type="text"
//                         name="full_name"
//                         placeholder="Full Name *"
//                         value={formData.full_name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="modal-grid-half">
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Email *"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="modal-grid-half">
//                       <input
//                         type="tel"
//                         name="phone"
//                         placeholder="Phone *"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="modal-grid-half">
//                       <input
//                         type="text"
//                         name="company_name"
//                         placeholder="Company Name (Optional)"
//                         value={formData.company_name}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <div className="modal-grid-half">
//                       <select
//                         name="project_type"
//                         value={formData.project_type}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Project Type *</option>
//                         <option value="Website">Website</option>
//                         <option value="Mobile App">Mobile App</option>
//                         <option value="SaaS / Software">SaaS / Software</option>
//                         <option value="E-commerce">E-commerce</option>
//                         <option value="CRM / ERP">CRM / ERP</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>

//                     <div className="modal-grid-half">
//                       <select
//                         name="budget"
//                         value={formData.budget}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Budget *</option>
//                         <option value="₹10K – ₹50K">₹10K – ₹50K</option>
//                         <option value="₹50K – ₹2L">₹50K – ₹2L</option>
//                         <option value="₹2L – ₹10L">₹2L – ₹10L</option>
//                         <option value="₹10L+">₹10L+</option>
//                       </select>
//                     </div>

//                     <div className="modal-grid-half">
//                       <select
//                         name="timeline"
//                         value={formData.timeline}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Timeline *</option>
//                         <option value="ASAP">ASAP</option>
//                         <option value="1–2 Weeks">1–2 Weeks</option>
//                         <option value="1 Month">1 Month</option>
//                         <option value="Flexible">Flexible</option>
//                       </select>
//                     </div>

//                     <div className="modal-grid-half">
//                       <select
//                         name="goal"
//                         value={formData.goal}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Project Goal *</option>
//                         <option value="Generate leads">Generate leads</option>
//                         <option value="Sell products">Sell products</option>
//                         <option value="Automate business">Automate business</option>
//                         <option value="Build MVP">Build MVP</option>
//                         <option value="Scale existing system">
//                           Scale existing system
//                         </option>
//                       </select>
//                     </div>

//                     <div className="modal-grid-full">
//                       <textarea
//                         name="description"
//                         placeholder="Briefly describe your project requirements"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                         rows="3"
//                       ></textarea>
//                     </div>
//                   </div>

//                   <button type="submit" className="modal-submit-btn">
//                     Get Free Consultation
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>,
//           document.body
//         )}
//     </>
//   );
// };

// export default Home;
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../components/Testimonial/Testimonial";
import Techslider from "../../components/Techslider/Techslider";
import aboutusImage from "../../asset/culture2.png";
import receptionImage from "../../asset/detagenix.jpeg";
import ecommerceImg from "../../asset/projects/ecommerce-platform.jpeg";
import aiChatbotImg from "../../asset/projects/ai-chatbot.avif";
import mobileBankingImg from "../../asset/projects/mobile-banking-app.avif";
import FAQ from "../../components/FAQ/FAQ";
import Homee from "../../components/Homee"
import axios from "axios";
import SEO from "../../components/SEO"
import { createPortal } from "react-dom";
import {
  FaCode,
  FaBrain,
  FaMobileAlt,
  FaCloud,
  FaShieldAlt,
  FaChartBar,
  FaUsers,
  FaCheckCircle,
  FaLaptopCode,
  FaHeadset,
  FaClock,
  FaArrowRight,
  FaProjectDiagram,
  FaGraduationCap,
  FaSmile,
  FaAward,
  FaServer,
  FaHeart
} from "react-icons/fa";
import * as FcIcons from "react-icons/fc";

const DynamicIcon = ({ iconName, ...props }) => {
  const IconComponent = FcIcons[iconName];
  if (!IconComponent) return <FcIcons.FcSettings {...props} />; // Fallback icon
  return <IconComponent {...props} Size = {100} />;
};

const Home = () => {
  const BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  const [latestBlogs, setLatestBlogs] = useState([]);
const [blogLoading, setBlogLoading] = useState(true);

 const [faqs, setFaqs] = useState([]);
const [faqLoading, setFaqLoading] = useState(true);
//service
  const [dynamicServices, setDynamicServices] = useState([]);


  const navigate = useNavigate();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    project_type: "",
    description: "",
    budget: "",
    timeline: "",
    goal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully ✅");
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          company_name: "",
          project_type: "",
          description: "",
          budget: "",
          timeline: "",
          goal: "",
        });
        setIsOpenForm(false);
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
  };

   useEffect(() => {
  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/faqs`);
      setFaqs(res.data);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setFaqLoading(false);
    }
  };

  fetchFaqs();
}, [BASE_URL]);

  useEffect(() => {
  const fetchLatestBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs`);
       console.log("API Response:", res.data);

      let data = res.data;

      if (!data) data = [];

      if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
        data = data.value;
      }

      const sortedBlogs = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0);
        const dateB = new Date(b.createdAt || b.date || 0);
        return dateB - dateA;
      });

      setLatestBlogs(sortedBlogs.slice(0, 3)); // Latest 3 blogs
    } catch (error) {
      console.error("Failed to fetch latest blogs:", error);
    } finally {
      setBlogLoading(false);
    }
  };
  const fetchServices = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
        // Use blog-services which stores title, description, icon and link
        const response = await axios.get(`${BASE_URL}/api/blog-services`);
       let data = response.data;

      if (!data) data = [];

      if (!Array.isArray(data) && data.value && Array.isArray(data.value)) {
        data = data.value;
      }

      const sortedService = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt  || 0);
        const dateB = new Date(b.createdAt  || 0);
        return dateB - dateA;
      });

      setDynamicServices(sortedService.slice(0, 6)); // Latest 3 blogs
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      
    }
    };
   fetchServices();
  fetchLatestBlogs();
}, [BASE_URL]);

  useEffect(() => {
    if (isOpenForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenForm]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
    {/* SEO */}
    <SEO
        title="Detagenix | Web Development, Mobile Apps & Digital Solutions"
        description="Detagenix delivers custom web development, mobile app development, UI/UX design, cloud solutions, and digital transformation services for businesses."
        keywords="Detagenix, web development company, mobile app development, software development, MERN stack, React development, digital solutions"
        canonical="https://detagenix.com/"
      />

      {/* 1. HERO SECTION (Full Background Video) */}
      {/* <section className="hero-video-section-new">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-background-video-new"
          poster="/images/hero-poster.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay-new"></div>
        <div className="hero-content-new">
          <h1>Digitize, Automate & Scale Your Business With Technology </h1>
          <p>We help startups, SMEs, and enterprises streamline operations, automate workflows, strengthen their digital presence, and generate measurable business growth through custom software, AI solutions, and modern web platforms.</p>
          <div className="hero-buttons-new">
            <button onClick={() => setIsOpenForm(true)} className="btn-primary-new">
              Book Free Consultation 
            </button>
            <button onClick={() => navigate("/about")} className="btn-secondary-new">
             View Our Work 
            </button>
          </div>
           <div className="hero-services-line">
    Website Development | CRM & ERP Solutions | AI Integration |
    Business Automation | SEO & Digital Growth
  </div>
        </div>
      </section> */}
      <Homee />

      {/* 2. ABOUT US SECTION */}
      <section className="about-section-new" id="about">
        <div className="about-container-new">
          <div className="about-image-new">
            <img src={aboutusImage} alt="About Us Team" />
          </div>
          <div className="about-content-new">
            <span className="section-subtitle-new">About <span className="highlight-blue">US</span></span>
            <h2>Empowering Businesses Through Modern Technology</h2>
            <p className="lead">
              Detagenix is a dynamic IT consulting and digital transformation organization dedicated to
              empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic
              software development to craft tailored, enterprise-grade applications.
            </p>
            <p className="subtext">
              Specializing in robust technologies like the MERN Stack, AI/ML integrations, Blockchain,
              and Cybersecurity. Our team of skilled professionals works closely with you to deliver
              secure, high-performance applications designed to scale.
            </p>
            <button onClick={() => navigate("/about")} className="about-btn-new">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="services-section-new" id="services">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Services</span></span> */}
          <h2>Custom Solutions for Your Business Needs</h2>
          <p className="section-desc">
            We deliver cutting-edge software solutions to help your business grow and succeed in the digital era.
          </p>
        </div>

        <div className="services-grid-new">

          {dynamicServices.map((service, index) => (
               <div className="service-card-new" key={service._id || index}>
            <div className="service-icon-box"><DynamicIcon iconName={service.icon} /></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            </div>
            
        ))}
         
          
        </div> <div className="projects-action-new">
          <button onClick={() => navigate("/services")} className="btn-primary-new">
            View All Service
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
     
      <section className="why-choose-section-new" id="why-choose-us">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Why Choose <span className="highlight-blue">Detagenix?</span></span> */}
          <h2>Why Partner with Detagenix?</h2>
          <p className="section-desc">
            We bring a unique blend of industry expertise, modern tech stack, and customer commitment.
          </p>
        </div>

        <div className="why-choose-grid-new">
          {/* Left Column */}
          <div className="why-choose-left">
            <div className="choose-feature-card">
              <div className="feature-icon"><FaChartBar size={24} /></div>
              <div className="feature-text">
                <h3>Business-Driven Solutions</h3>
                <p>Technology aligned with your business goals.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaUsers size={24} /></div>
              <div className="feature-text">
                <h3>Experienced Team</h3>
                <p>Skilled professionals across multiple technologies.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaProjectDiagram size={24} /></div>
              <div className="feature-text">
                <h3>Transparent Process</h3>
                <p>Clear communication and project visibility.</p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="why-choose-center">
            <img src={receptionImage} alt="Detagenix Office Desk" className="center-reception-image" />
          </div>

          {/* Right Column */}
          <div className="why-choose-right">
            <div className="choose-feature-card">
              <div className="feature-icon"><FaLaptopCode size={24} /></div>
              <div className="feature-text">
                <h3>End-to-End Development</h3>
                <p>From concept to deployment and support.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaServer size={24} /></div>
              <div className="feature-text">
                <h3>Scalable Architecture</h3>
                <p>Solutions built for future growth.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaHeart size={24} /></div>
              <div className="feature-text">
                <h3>Long-Term Partnership</h3>
                <p>Ongoing support beyond project delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS / WORKFLOW SECTION */}
      <section className="process-section-new" id="process">
        
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Process / How We Work</span></span> */}
          <h2>A step-by-step approach to bringing your digital projects to life.</h2>
        </div>

        <div className="process-workflow-container-new">
          <div className="process-step-new">
            <div className="step-number-new">01</div>
            <h3>Discovery</h3>
            <p>Understanding your goals and project requirements.</p>
          </div>
          <div className="process-step-new">
            <div className="step-number-new">02</div>
            <h3>Planning</h3>
            <p>Creating a detailed roadmap and architecture.</p>
          </div>
          <div className="process-step-new">
            <div className="step-number-new">03</div>
            <h3>Design & Develop</h3>
            <p>Building your product with clean, high-quality code.</p>
          </div>
          <div className="process-step-new">
            <div className="step-number-new">04</div>
            <h3>Testing & QA</h3>
            <p>Thorough testing to ensure bug-free software.</p>
          </div>
          <div className="process-step-new">
            <div className="step-number-new">05</div>
            <h3>Launch & Support</h3>
            <p>Launching your app and providing ongoing maintenance.</p>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK SECTION */}
      <section className="tech-stack-section-new" id="technology">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Our Technology <span className="highlight-blue">Stack</span></span> */}
          <h2>Technologies We Specialize In</h2>
          <p className="section-desc">
            We leverage state-of-the-art frameworks and databases to build high-performance systems.
          </p>
        </div>

        <div className="tech-slider-new">
          <Techslider />
        </div>
      </section>

      {/* 7. IMPACT / STATS SECTION */}
      <section className="stats-section-new">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Our Impact in <span className="highlight-blue">Numbers</span></span> */}
          <h2>Numbers That Define Us</h2>
        </div>

        <div className="stats-grid-new">
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaProjectDiagram size={24} /></div>
            <h2>50+</h2>
            <p>Projects Delivered</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaGraduationCap size={24} /></div>
            <h2>94+</h2>
            <p>Interns Trained</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaSmile size={24} /></div>
            <h2>95%</h2>
            <p>Client Satisfaction</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaAward size={24} /></div>
            <h2>3+</h2>
            <p>Years Experience</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaServer size={24} /></div>
            <h2>10+</h2>
            <p>Services Offered</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaHeart size={24} /></div>
            <h2>50+</h2>
            <p>Happy Clients</p>
          </div>
        </div>
      </section>

      {/* 8. RECENT PROJECTS SECTION */}
      {/* <section className="projects-section-new" id="projects">
        <div className="section-header-new">
          <span className="section-subtitle-new">Our Recent <span className="highlight-blue">Projects</span></span>
          <h2>Explore some of the custom solutions we've developed for our clients.</h2>
        </div>

        <div className="projects-grid-new">
          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src={ecommerceImg} alt="E-Commerce Platform" />
            </div>
            <div className="project-content-new">
              <h3>E-Commerce Platform</h3>
              <p>A full-featured, scalable online store with custom cart flows, search indexing, and secure Stripe payments.</p>
              <div className="project-tech-tags-new">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Stripe</span>
              </div>
              <a href="/project" className="project-link-new">Learn More →</a>
            </div>
          </div>
          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src={aiChatbotImg} alt="AI Chatbot System" />
            </div>
            <div className="project-content-new">
              <h3>AI Chatbot System</h3>
              <p>An intelligent customer service agent built with Large Language Models to answer FAQs and triage support tickets.</p>
              <div className="project-tech-tags-new">
                <span>Python</span>
                <span>OpenAI</span>
                <span>AWS</span>
                <span>React</span>
              </div>
              <a href="/project" className="project-link-new">Learn More →</a>
            </div>
          </div>
          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src={mobileBankingImg} alt="Mobile Banking App" />
            </div>
            <div className="project-content-new">
              <h3>Mobile Banking App</h3>
              <p>A secure React Native application with biometric login, real-time transaction alerts, and transfer integrations.</p>
              <div className="project-tech-tags-new">
                <span>React Native</span>
                <span>Node.js</span>
                <span>Firebase</span>
                <span>Biometrics</span>
              </div>
              <a href="/project" className="project-link-new">Learn More →</a>
            </div>
          </div>
        </div>

        <div className="projects-action-new">
          <button onClick={() => navigate("/project")} className="btn-primary-new">
            View All Projects
          </button>
        </div>
      </section> */}

      {/* 8.5. BLOG SECTION */}
      <section className="projects-section-new" id="blog">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">Our <span className="highlight-blue">Blog</span></span> */}
          <h2>Insights and News</h2>
          <p className="section-desc">Stay updated with the latest trends in technology, digital transformation, and software engineering.</p>
        </div>

       <div className="projects-grid-new">
  {blogLoading ? (
    <p>Loading latest blogs...</p>
  ) : latestBlogs.length > 0 ? (
    latestBlogs.map((blog) => (
      
     <div
  className="project-card-new"
  key={blog._id || blog.id || blog.slug}
  onClick={() =>
    navigate(`/blog/${blog.slug || blog._id}`)
  }
  style={{ cursor: "pointer" }}
>
        <div className="project-image-box-new">
         <img
  src={blog.bannerImage || blog.coverImage || blog.image}
  alt={blog.title}
/>
        </div>

        <div className="project-content-new">
          <h3>{blog.title}</h3>

<p>
  {blog.content
    ?.replace(/<[^>]*>/g, "") // HTML tags remove
    .replace(/&nbsp;/g, " ")  // &nbsp; remove
    .substring(0, 120) + "..."}
</p>
          {/* <div className="project-tech-tags-new">
            {blog.tags?.slice(0, 2).map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div> */}

          <button
            className="project-link-new"
            onClick={() =>
              navigate(`/blog/${blog.slug || blog._id}`)
            }
          >
            Read Article →
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No blogs available.</p>
  )}
</div>

        <div className="projects-action-new">
          <button onClick={() => navigate("/blog")} className="btn-primary-new">
            View All Articles
          </button>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="testimonials-section-new" id="testimonials">
        <div className="section-header-new">
          {/* <span className="section-subtitle-new">What Our <span className="highlight-blue">Clients Say</span></span> */}
          <h2>Feedback from our trusted corporate partners.</h2>
        </div>
        <Testimonial />
      </section>
       
       <FAQ faqs={faqs} loading={faqLoading} />

      {/* 10. MODAL FORM PORTAL */}
      {isOpenForm &&
        createPortal(
          <div className="modal-overlay" onClick={(e) => {
            if (e.target.className === "modal-overlay") {
              setIsOpenForm(false);
            }
          }}>
            <div className="modal-container-two-col">
              <button
                className="close-btn"
                onClick={() => setIsOpenForm(false)}
                aria-label="Close Modal"
              >
                ✖
              </button>

              {/* Left Info Panel - Tailored for "Get Started" */}
              <div className="modal-left-panel">
                <h2 className="modal-left-title">
                  Ready to <span className="highlight">Scale?</span>
                </h2>
                <p className="modal-left-desc">
                  Kickstart your digital transformation with Detagenix. Get a free consultation tailored to your specific business needs.
                </p>

                <div className="modal-feature-list">
                  <div className="modal-feature-item">
                    <div className="modal-icon-circle">
                      <FaLaptopCode />
                    </div>
                    <div className="modal-feature-text">
                      <h4>Custom Solutions</h4>
                      <p>Tailored enterprise-grade applications designed specifically for your business.</p>
                    </div>
                  </div>

                  <div className="modal-feature-item">
                    <div className="modal-icon-circle">
                      <FaCheckCircle />
                    </div>
                    <div className="modal-feature-text">
                      <h4>Quality Assurance</h4>
                      <p>Rigorous testing protocols to ensure bug-free, high-performance delivery.</p>
                    </div>
                  </div>

                  <div className="modal-feature-item">
                    <div className="modal-icon-circle">
                      <FaHeadset />
                    </div>
                    <div className="modal-feature-text">
                      <h4>Dedicated Support</h4>
                      <p>Round-the-clock technical support and dedicated project consultations.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Panel - Your exact original form inputs */}
              <div className="modal-right-panel">
                <h3 className="form-title">Let’s Build Your Project</h3>
                <p className="form-desc">Briefly describe your project requirements to get started.</p>

                <form onSubmit={handleSubmit} className="modal-two-col-form">
                  <div className="modal-grid">
                    <div className="modal-grid-half">
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name *"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="modal-grid-half">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="modal-grid-half">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="modal-grid-half">
                      <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name (Optional)"
                        value={formData.company_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="modal-grid-half">
                      <select
                        name="project_type"
                        value={formData.project_type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Project Type *</option>
                        <option value="Website">Website</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="SaaS / Software">SaaS / Software</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="CRM / ERP">CRM / ERP</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="modal-grid-half">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Budget *</option>
                        <option value="₹10K – ₹50K">₹10K – ₹50K</option>
                        <option value="₹50K – ₹2L">₹50K – ₹2L</option>
                        <option value="₹2L – ₹10L">₹2L – ₹10L</option>
                        <option value="₹10L+">₹10L+</option>
                      </select>
                    </div>

                    <div className="modal-grid-half">
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Timeline *</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1–2 Weeks">1–2 Weeks</option>
                        <option value="1 Month">1 Month</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="modal-grid-half">
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Project Goal *</option>
                        <option value="Generate leads">Generate leads</option>
                        <option value="Sell products">Sell products</option>
                        <option value="Automate business">Automate business</option>
                        <option value="Build MVP">Build MVP</option>
                        <option value="Scale existing system">
                          Scale existing system
                        </option>
                      </select>
                    </div>

                    <div className="modal-grid-full">
                      <textarea
                        name="description"
                        placeholder="Briefly describe your project requirements"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="modal-submit-btn">
                    Get Free Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Home;
