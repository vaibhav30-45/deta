import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../components/Testimonial/Testimonial";
import Techslider from "../../components/Techslider/Techslider";
import aboutusImage from "../../asset/culture2.png";
import receptionImage from "../../asset/reception.png";
import ecommerceImg from "../../asset/projects/ecommerce-platform.jpeg";
import aiChatbotImg from "../../asset/projects/ai-chatbot.avif";
import mobileBankingImg from "../../asset/projects/mobile-banking-app.avif";
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

const Home = () => {
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
      const response = await fetch("http://localhost:5000/api/enquiry", {
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
      {/* 1. HERO SECTION (Full Background Video) */}
      <section className="hero-video-section-new">
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
          <h1>Transforming Businesses with Smart Digital Innovation</h1>
          <p>We build custom software solutions to modernise your business and scale operations.</p>
          <div className="hero-buttons-new">
            <button onClick={() => setIsOpenForm(true)} className="btn-primary-new">
              Get Started
            </button>
            <button onClick={() => navigate("/about")} className="btn-secondary-new">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

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
          <span className="section-subtitle-new">Our <span className="highlight-blue">Services</span></span>
          <h2>Custom Solutions for Your Business Needs</h2>
          <p className="section-desc">
            We deliver cutting-edge software solutions to help your business grow and succeed in the digital era.
          </p>
        </div>

        <div className="services-grid-new">
          {/* Card 1 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaCode size={28} /></div>
            <h3>Web Development Solutions</h3>
            <p>From complex web applications to custom portals, we build high-performance web systems tailored to your goals.</p>
            <a href="/services#webdev" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
          {/* Card 2 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaBrain size={28} /></div>
            <h3>AI-Powered Solutions</h3>
            <p>Leverage machine learning, LLMs, and computer vision to automate processes and generate actionable intelligence.</p>
            <a href="/services#ai" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
          {/* Card 3 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaMobileAlt size={28} /></div>
            <h3>Mobile App Development</h3>
            <p>Creating seamless, native, and cross-platform mobile experiences for both iOS and Android platforms.</p>
            <a href="/services#mobile" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
          {/* Card 4 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaCloud size={28} /></div>
            <h3>Cloud & DevOps</h3>
            <p>Scalable cloud infrastructure deployment, CI/CD pipelines, and robust automation for maximum uptime.</p>
            <a href="/services#cloud" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
          {/* Card 5 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaShieldAlt size={28} /></div>
            <h3>Cybersecurity Services</h3>
            <p>Vulnerability testing, secure system design, and threat mitigation to protect your company's critical data.</p>
            <a href="/services#cyber" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
          {/* Card 6 */}
          <div className="service-card-new">
            <div className="service-icon-box"><FaChartBar size={28} /></div>
            <h3>Data Analytics</h3>
            <p>Process big data, design dashboards, and construct data warehousing to power business intelligence.</p>
            <a href="/services#data" className="service-link-new">Learn More <FaArrowRight size={12} /></a>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="why-choose-section-new" id="why-choose-us">
        <div className="section-header-new">
          <span className="section-subtitle-new">Why Choose <span className="highlight-blue">Detagenix?</span></span>
          <h2>Why Partner with Detagenix?</h2>
          <p className="section-desc">
            We bring a unique blend of industry expertise, modern tech stack, and customer commitment.
          </p>
        </div>

        <div className="why-choose-grid-new">
          <div className="why-choose-left">
            <div className="choose-feature-card">
              <div className="feature-icon"><FaUsers size={24} /></div>
              <div className="feature-text">
                <h3>Expert Team</h3>
                <p>Our team comprises seasoned engineers, designers, and consultants specialized in MERN and AI/ML.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaCheckCircle size={24} /></div>
              <div className="feature-text">
                <h3>Quality Assurance</h3>
                <p>We deploy rigorous manual and automated QA tests before delivery to ensure bug-free deployment.</p>
              </div>
            </div>
          </div>
          <div className="why-choose-center">
            <img src={receptionImage} alt="Detagenix Office Desk" className="center-reception-image" />
          </div>
          <div className="why-choose-right">
            <div className="choose-feature-card">
              <div className="feature-icon"><FaLaptopCode size={24} /></div>
              <div className="feature-text">
                <h3>Modern Tech Stack</h3>
                <p>We use the latest tools, databases, and architectures to ensure your platforms are modern and scalable.</p>
              </div>
            </div>
            <div className="choose-feature-card">
              <div className="feature-icon"><FaHeadset size={24} /></div>
              <div className="feature-text">
                <h3>24/7 Support</h3>
                <p>Our support lines are open round-the-clock for incident management and client consultations.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="why-choose-bottom-new">
          <div className="choose-feature-card centered">
            <div className="feature-icon"><FaClock size={24} /></div>
            <div className="feature-text">
              <h3>On-Time Delivery</h3>
              <p>We respect your timelines and deliver projects on schedule without compromising quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS / WORKFLOW SECTION */}
      <section className="process-section-new" id="process">
        <div className="section-header-new">
          <span className="section-subtitle-new">Our <span className="highlight-blue">Process / How We Work</span></span>
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
          <span className="section-subtitle-new">Our Technology <span className="highlight-blue">Stack</span></span>
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
          <span className="section-subtitle-new">Our Impact in <span className="highlight-blue">Numbers</span></span>
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
            <h2>100+</h2>
            <p>Interns Trained</p>
          </div>
          <div className="stat-card-new">
            <div className="stat-icon-box-new"><FaSmile size={24} /></div>
            <h2>100%</h2>
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
      <section className="projects-section-new" id="projects">
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
      </section>

      {/* 8.5. BLOG SECTION */}
      {/* UI FIX START: Added a Blog section using the existing premium grid layout */}
      <section className="projects-section-new" id="blog">
        <div className="section-header-new">
          <span className="section-subtitle-new">Our <span className="highlight-blue">Blog</span></span>
          <h2>Insights and News</h2>
          <p className="section-desc">Stay updated with the latest trends in technology, digital transformation, and software engineering.</p>
        </div>

        <div className="projects-grid-new">
          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" alt="The Future of AI in Enterprise" />
            </div>
            <div className="project-content-new">
              <h3>The Future of AI in Enterprise</h3>
              <p>Explore how Artificial Intelligence and Large Language Models are automating workflows and reshaping modern businesses.</p>
              <div className="project-tech-tags-new">
                <span>AI/ML</span>
                <span>Innovation</span>
              </div>
              <a href="/blog" className="project-link-new">Read Article →</a>
            </div>
          </div>

          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" alt="Cloud Migration Strategies" />
            </div>
            <div className="project-content-new">
              <h3>Cloud Migration Strategies</h3>
              <p>A comprehensive guide on transitioning legacy systems to scalable cloud-native architectures with zero downtime.</p>
              <div className="project-tech-tags-new">
                <span>Cloud</span>
                <span>DevOps</span>
              </div>
              <a href="/blog" className="project-link-new">Read Article →</a>
            </div>
          </div>

          <div className="project-card-new">
            <div className="project-image-box-new">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop" alt="Securing Web Applications" />
            </div>
            <div className="project-content-new">
              <h3>Securing Web Applications</h3>
              <p>Top 10 cybersecurity best practices every developer must know to protect enterprise data and prevent breaches.</p>
              <div className="project-tech-tags-new">
                <span>Security</span>
                <span>Web Dev</span>
              </div>
              <a href="/blog" className="project-link-new">Read Article →</a>
            </div>
          </div>
        </div>

        <div className="projects-action-new">
          <button onClick={() => navigate("/blog")} className="btn-primary-new">
            View All Articles
          </button>
        </div>
      </section>
      {/* UI FIX END: Added Blog section */}

      {/* 9. TESTIMONIALS SECTION */}
      <section className="testimonials-section-new" id="testimonials">
        <div className="section-header-new">
          <span className="section-subtitle-new">What Our <span className="highlight-blue">Clients Say</span></span>
          <h2>Feedback from our trusted corporate partners.</h2>
        </div>
        <Testimonial />
      </section>

      {/* 10. MODAL FORM PORTAL */}
      {isOpenForm &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal-form">
              <button
                className="close-btn"
                onClick={() => setIsOpenForm(false)}
              >
                ✖
              </button>

              <h2>Let’s Build Your Project</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name *"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name (Optional)"
                  value={formData.company_name}
                  onChange={handleChange}
                />

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

                <textarea
                  name="description"
                  placeholder="Briefly describe your project requirements"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>

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

                <button type="submit" className="submit-btn">
                  Get Free Consultation
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Home;
