// import React, { useEffect } from "react";
// import {
//   FaLightbulb,
//   FaHandshake,
//   FaUserCheck,
//   FaRegCheckCircle,
//   FaCompass,
//   FaEye,
//   FaShieldAlt,
//   FaUserFriends,
//   FaUsers,
//   FaBrain,
//   FaAward,
//   FaRegHandshake,
//   FaRunning,
//   FaLinkedin,
//   FaTwitter,
//   FaGithub
// } from "react-icons/fa";
// import teamAvatar from "../../asset/Avatar.png";
// import "./Aboutus.css";

// const teamMembers = [
//   {
//     name: "Aman Sharma",
//     role: "CEO & Founder",
//     bio: "Ex-Google Architect with 12+ years of scaling enterprise SaaS solutions globally."
//   },
//   {
//     name: "Priya Patel",
//     role: "Chief Technology Officer",
//     bio: "Deep tech specialist in AI/ML modeling and high-throughput data pipelines."
//   },
//   {
//     name: "Rajesh Kumar",
//     role: "Head of Engineering",
//     bio: "Agile delivery expert managing our core engineering and dev squads."
//   },
//   {
//     name: "Sneha Reddy",
//     role: "Lead UI/UX Designer",
//     bio: "Passionate about creating premium, accessible, and high-converting layouts."
//   },
//   {
//     name: "Vikram Malhotra",
//     role: "Lead Cloud Architect",
//     bio: "AWS/Azure expert building highly resilient landing zones and CDNs."
//   },
//   {
//     name: "Rohan Das",
//     role: "Lead Frontend Developer",
//     bio: "Focuses on React optimization, state management, and smooth micro-animations."
//   },
//   {
//     name: "Anjali Verma",
//     role: "Lead Backend Developer",
//     bio: "Secures our API integrations and builds scalable server architecture."
//   },
//   {
//     name: "Divya Joshi",
//     role: "QA Automation Lead",
//     bio: "Ensures production reliability through end-to-end integration testing."
//   }
// ];

// function About() {
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   return (
//     <div className="about-page">
//       {/* 1. HERO SECTION */}
//       <section className="about-hero">
//         <div className="about-hero-overlay"></div>
//         <div className="about-hero-container">
//           <div className="about-hero-left">
//             <span className="hero-badge">About Detagenix</span>
//             <h1>Driving Innovation & <span className="highlight">Digital Excellence</span></h1>
//             <p className="hero-desc">
//               Detagenix is a dynamic IT consulting and digital transformation organization dedicated to empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic software development to craft tailored, enterprise-grade applications specializing in MERN Stack, AI/ML, Blockchain, and Cybersecurity.
//             </p>

//             <div className="hero-stat-chips">
//               <div className="stat-chip">
//                 <FaLightbulb className="chip-icon" />
//                 <span>Innovative Solutions</span>
//               </div>
//               <div className="stat-chip">
//                 <FaHandshake className="chip-icon" />
//                 <span>Dedicated Service</span>
//               </div>
//               <div className="stat-chip">
//                 <FaUserCheck className="chip-icon" />
//                 <span>Expert Team</span>
//               </div>
//               <div className="stat-chip">
//                 <FaRegCheckCircle className="chip-icon" />
//                 <span>Future Ready</span>
//               </div>
//             </div>
//           </div>

//           <div className="about-hero-right">
//             <div className="about-hero-visual-card">
//               <div className="visual-circle circle-1"></div>
//               <div className="visual-circle circle-2"></div>
//               <div className="visual-glass-content">
//                 <span className="visual-years">10+</span>
//                 <span className="visual-text">Years of Engineering Impact</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 2. WHAT DRIVES US */}
//       <section className="what-drives-us-section">
//         <div className="section-header">
//           <h2 className="section-title">What Drives Us</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">Our core foundation is built upon clear aspirations and long-term commitments to client success.</p>
//         </div>

//         <div className="drives-cards-row">
//           <div className="drive-card">
//             <div className="drive-icon-wrapper">
//               <FaCompass className="drive-icon" />
//             </div>
//             <h3>Our Mission</h3>
//             <p>
//               To deliver exceptional, scalable digital products and cloud-native solutions that empower companies to thrive, automate complex workflows, and unlock sustainable business growth.
//             </p>
//           </div>

//           <div className="drive-card">
//             <div className="drive-icon-wrapper">
//               <FaEye className="drive-icon" />
//             </div>
//             <h3>Our Vision</h3>
//             <p>
//               To become a globally trusted digital transformation partner, recognized for client empathy, clean technical architectures, and high-performance software engineering.
//             </p>
//           </div>

//           <div className="drive-card">
//             <div className="drive-icon-wrapper">
//               <FaShieldAlt className="drive-icon" />
//             </div>
//             <h3>Our Values</h3>
//             <p>
//               Building with integrity, choosing quality over speed, upholding transparent communication, and maintaining complete accountability in every line of code we ship.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 3. OUR CORE VALUES */}
//       <section className="core-values-grid-section">
//         <div className="section-header">
//           <h2 className="section-title">Our Core Values</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">The principles that guide our day-to-day work, engineering choices, and customer partnerships.</p>
//         </div>

//         <div className="core-values-modern-grid">
//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaUserFriends className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Customer First</h4>
//               <p>We start with your business goals and trace backward to engineer the exact solution you require.</p>
//             </div>
//           </div>

//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaUsers className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Active Collaboration</h4>
//               <p>Operating as a natural extension of your team with transparent weekly sprints and constant feedback loops.</p>
//             </div>
//           </div>

//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaBrain className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Continuous Innovation</h4>
//               <p>Constantly upgrading our tech stacks and patterns to offer modern, cost-efficient cloud architectures.</p>
//             </div>
//           </div>

//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaAward className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Engineering Excellence</h4>
//               <p>Zero compromises on clean coding principles, automated testing coverage, and detailed documentation.</p>
//             </div>
//           </div>

//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaRegHandshake className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Absolute Integrity</h4>
//               <p>Honest pricing models, transparent bandwidth reporting, and complete IP protection for our clients.</p>
//             </div>
//           </div>

//           <div className="value-item-card">
//             <div className="value-icon-box">
//               <FaRunning className="val-icon" />
//             </div>
//             <div className="value-info">
//               <h4>Agile Adaptability</h4>
//               <p>Swiftly responding to market updates, user analytics, and changing specifications without friction.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. TEAMS BEHIND OUR SOLUTIONS */}
//       <section className="team-section">
//         <div className="section-header">
//           <h2 className="section-title">Teams Behind Our Solutions</h2>
//           <div className="title-underline"></div>
//           <p className="section-subtitle">Meet the certified specialists, designers, and software engineers driving digital transformation daily.</p>
//         </div>

//         <div className="team-grid-modern">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="team-card-modern">
//               <div className="team-avatar-wrapper">
//                 <img src={teamAvatar} alt={member.name} className="team-avatar-img" />
//               </div>
//               <div className="team-member-info">
//                 <h3>{member.name}</h3>
//                 <span className="team-member-role">{member.role}</span>
//                 <p className="team-member-bio">{member.bio}</p>
//                 <div className="team-social-icons">
//                   <a href="#linkedin" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
//                   <a href="#twitter" className="social-link" aria-label="Twitter"><FaTwitter /></a>
//                   <a href="#github" className="social-link" aria-label="GitHub"><FaGithub /></a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default About;
import React, { useEffect } from "react";
import "./Aboutus.css";

function About() {
   useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");

    els.forEach((el, i) => {
      el.dataset.index = i;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = (parseInt(el.dataset.index, 10) || 0) * 120;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));

    // Infinite auto-scroll for Why Choose Us
    const slider = document.getElementById("whySlider");

    if (slider) {
      if (!slider.dataset.duplicated) {
        slider.innerHTML += slider.innerHTML;
        slider.dataset.duplicated = "true";
      }

      let scrollAmount = 0;
      const SCROLL_SPEED = 2.5;
      let rafId;

      function autoScroll() {
        if (!slider) return;

        scrollAmount += SCROLL_SPEED;
        slider.scrollLeft = scrollAmount;

        if (scrollAmount >= slider.scrollWidth / 2) {
          slider.style.scrollBehavior = "auto";
          scrollAmount = 0;
          slider.scrollLeft = 0;
          slider.style.scrollBehavior = "smooth";
        }

        rafId = requestAnimationFrame(autoScroll);
      }

      autoScroll();

      const pause = () => cancelAnimationFrame(rafId);
      const resume = () => requestAnimationFrame(autoScroll);

      slider.addEventListener("mouseenter", pause);
      slider.addEventListener("mouseleave", resume);

      return () => {
        cancelAnimationFrame(rafId);
        slider.removeEventListener("mouseenter", pause);
        slider.removeEventListener("mouseleave", resume);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-section">
     
      <section className="about-intro container text-center fade-up">
        <h1 className="section-title">Detagenix: Driving Innovation and Digital Excellence</h1>
        <p className="lead">
          {/* <span className="highlight">Detagenix</span> Organization is a dynamic IT consulting and digital transformation company 
          dedicated to empowering businesses with cutting-edge, scalable technology solutions. We go beyond basic
          software development to craft tailored, enterprise-grade applications, specializing in robust technologies
          like the <strong>MERN Stack</strong> and advanced services such as <strong>AI/ML, Data Modeling & Resource Development</strong>.
          <br />
          <br />
          Our philosophy is centered on understanding your unique needs to deliver reliable excellence, build lasting
          partnerships, and ensure your business becomes smarter, faster, and future-ready in the connected digital
          world. */}
          Detagenix is a dynamic IT consulting and digital transformation organization dedicated to empowering businesses with cutting-edge, scalable technology solutions.

We go beyond basic software development to craft tailored, enterprise-grade applications  specializing in robust technologies like the MERN Stack, and advanced services such as AI/ML solutions, Blockchain and Cybersecurity.
<br />
Our Resource Deployment model enables organizations to scale efficiently by providing skilled professionals across major technologies on hourly, pro-rata, or project-based engagements, ensuring flexibility and continuity in every development cycle.
        </p>
      </section>

      <section className="core-values container fade-up section-spacing">
        <h2 className="section-title text-center">Driven by Core Values</h2>
        <div className="row g-4 text-center">
          <div className="col-md-4 fade-up">
            <div className="glass-card p-4">
              <h4>Ingenuity-First Innovation</h4>
              <p>
                We challenge the status quo by constantly exploring technologies like AI/ML and Blockchain to create not
                just software, but transformative, future-ready business assets.
              </p>
            </div>
          </div>
          <div className="col-md-4 fade-up">
            <div className="glass-card p-4">
              <h4>Scalable Excellence</h4>
              <p>
                We are uncompromising in our commitment to deliver enterprise-grade quality and reliable performance,
                ensuring every solution—from a simple web application to complex data modeling—is built for long-term
                growth and durability.
              </p>
            </div>
          </div>
          <div className="col-md-4 fade-up">
            <div className="glass-card p-4">
              <h4>Empathetic Partnership</h4>
              <p>
                We prioritize truly understanding your unique needs, fostering transparency, and building long-term
                relationships that position us as a dedicated partner, not just a service provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="why-us-section container text-center mt-5">
        <h2 className="section-title fade-up">Why Choose Detagenix?</h2>
        <p className="lead fade-up">
          Choosing <span className="highlight">Detagenix</span> means securing a genuine partnership built on
          future-proof technology and predictable excellence. We integrate Ingenuity-First Innovation with unwavering
          Scalable Excellence, delivering enterprise-grade, end-to-end solutions — from robust MERN architecture to
          powerful AI/ML and Data Models — designed for your long-term growth.
        </p>

        <div className="why-slider-wrapper fade-up">
          <div className="why-slider" id="whySlider">
            {[
              {
                icon: "bi-lightbulb",
                title: "Innovation Driven",
                desc: "We explore modern technologies to create future-ready, transformative digital experiences.",
              },
              {
                icon: "bi-puzzle",
                title: "Tailored Solutions",
                desc: "Every project is uniquely designed to align perfectly with your business goals.",
              },
              {
                icon: "bi-shield-check",
                title: "Quality & Reliability",
                desc: "Built with precision, tested rigorously, and optimized for scalability.",
              },
              {
                icon: "bi-graph-up",
                title: "Enterprise-Grade Growth",
                desc: "We deliver solutions built for long-term impact and measurable business success.",
              },
              {
                icon: "bi-people",
                title: "Partnership Focused",
                desc: "We collaborate closely with clients to ensure transparency and shared success.",
              },
            ].map((item, index) => (
              <div className="why-card glass-card p-4 mx-3" key={index}>
                <i className={`bi ${item.icon} fs-1 mb-3 text-primary`}></i>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
