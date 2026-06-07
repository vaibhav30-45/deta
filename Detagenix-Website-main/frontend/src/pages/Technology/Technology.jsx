import React, { useEffect } from "react";
import "./Technology.css";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaBrain,
  FaAws,
  FaDocker,
  FaLink,
  FaRobot,
  FaJava,
  FaPython,
  FaCode,
  FaCloud,
  FaShieldAlt,
  FaMobileAlt,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  SiDjango,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiVuedotjs,
  SiAngular,
} from "react-icons/si";
import AimlImage from "../../asset/Aiml.png";

const Technologies = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // All 7 expertise categories shown as a static card grid (Figma: "Our Technology Expertise" section)
  const expertiseCards = [
    {
      icon: <FaRobot />,
      title: "Generative AI",
      desc: "AI-powered content, automation, and adaptable, scalable solutions.",
    },
    {
      icon: <FaCode />,
      title: "Full-Stack Development",
      desc: "Scalable frontend and backend development services.",
    },
    {
      icon: <FaCloud />,
      title: "Cloud & DevOps",
      desc: "Cloud infrastructure, deployment, and DevOps automation.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity & QA",
      desc: "Secure systems with advanced testing and quality assurance.",
    },
    {
      icon: <FaBrain />,
      title: "AI & ML",
      desc: "Smart and real-time machine learning-driven solutions.",
    },
    {
      icon: <FaDatabase />,
      title: "Data Modeling",
      desc: "Efficient data structuring and management solutions.",
    },
    {
      icon: <FaLink />,
      title: "Blockchain",
      desc: "Secure, transparent, and decentralised digital solutions.",
    },
  ];

  // "We Work With Technologies & Tools" — 4 category cards with logo rows (Figma section)
  const toolCategories = [
    {
      icon: <FaReact />,
      title: "Frontend",
      desc: "Building responsive, fast, and intuitive interfaces.",
      logos: [
        { icon: <FaReact />, label: "React" },
        { icon: <SiAngular />, label: "Angular" },
        { icon: <SiVuedotjs />, label: "Vue" },
        { icon: <FaMobileAlt />, label: "Mobile" },
      ],
    },
    {
      icon: <FaNodeJs />,
      title: "Backend",
      desc: "Developing secure, scalable, and server-side applications.",
      logos: [
        { icon: <FaNodeJs />, label: "Node" },
        { icon: <FaPython />, label: "Python" },
        { icon: <FaJava />, label: "Java" },
        { icon: <SiDjango />, label: "Django" },
      ],
    },
    {
      icon: <FaCloud />,
      title: "Cloud & DevOps",
      desc: "Leveraging cloud platforms, DevOps practices, and CI/CD processes.",
      logos: [
        { icon: <FaAws />, label: "AWS" },
        { icon: <FaCloud />, label: "Cloud" },
        { icon: <FaDocker />, label: "Docker" },
        { icon: <SiKubernetes />, label: "K8s" },
      ],
    },
    {
      icon: <FaBrain />,
      title: "AI & Machine Learning",
      desc: "Building intelligent models, learn, and automate business outcomes.",
      logos: [
        { icon: <SiTensorflow />, label: "TF" },
        { icon: <SiPytorch />, label: "PyTorch" },
        { icon: <FaBrain />, label: "ML" },
        { icon: <FaRobot />, label: "AI" },
      ],
    },
  ];

  // "Our Core Technologies" — 3 dark accent cards
  const coreTechnologies = [
    {
      icon: <FaRobot />,
      title: "Artificial Intelligence",
      desc: "We build intelligent systems that can understand, reason, and learn from data using advanced neural networks.",
    },
    {
      icon: <FaBrain />,
      title: "Machine Learning",
      desc: "Leverage predictive modeling, recommendation systems, and data analytics to drive smart automation.",
    },
    {
      icon: <FaBrain />,
      title: "Deep Learning",
      desc: "Develop complex models for vision, speech, and generative tasks using deep neural architectures.",
    },
  ];

  return (
    <div className="tech-page">

      {/* FIGMA UI UPDATE— Hero Section: split layout with text left + image right */}
      <section className="tech-hero-section">
        <div className="tech-hero-overlay" />
        <div className="tech-hero-inner">
          <div className="tech-hero-text">
            <h1>
              Powering Innovation with{" "}
              <span className="tech-hero-highlight">Technologies</span>
            </h1>
            <p>
              At Detagenix, we harness cutting-edge tools and technologies to deliver
              secure, scalable, and intelligent digital experiences.
            </p>
          </div>
          <div className="tech-hero-image-wrap">
            <img
              src={AimlImage}
              alt="AI Technology"
              className="tech-hero-img"
            />
          </div>
        </div>
      </section>

      {/* FIGMA UI UPDATE  — Our Technology Expertise */}
      <section className="tech-expertise-section fade-up">
        <div className="tech-section-header">
          <h2>
            Our <span className="tech-accent">Technology</span> Expertise
          </h2>
          <div className="tech-title-underline" />
        </div>
        <div className="tech-expertise-grid">
          {expertiseCards.map((card, i) => (
            <div className="tech-expertise-card" key={i}>
              <div className="tech-expertise-icon">{card.icon}</div>
              <h4 className="tech-expertise-title">{card.title}</h4>
              <p className="tech-expertise-desc">{card.desc}</p>
              <div className="tech-expertise-arrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FIGMA UI UPDATE — We Work With Technologies & Tools */}
      <section className="tech-tools-section fade-up">
        <div className="tech-section-header">
          <h2>
            We Work With <span className="tech-accent">Technologies &amp; Tools</span>
          </h2>
          <div className="tech-title-underline" />
        </div>
        <div className="tech-tools-grid">
          {toolCategories.map((cat, i) => (
            <div className="tech-tools-card" key={i}>
              <div className="tech-tools-icon">{cat.icon}</div>
              <h4 className="tech-tools-title">{cat.title}</h4>
              <p className="tech-tools-desc">{cat.desc}</p>
              <div className="tech-tools-logos">
                {cat.logos.map((logo, j) => (
                  <span className="tech-logo-badge" key={j} title={logo.label}>
                    {logo.icon}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="tech-tools-btn-wrap">
          <button className="tech-view-more-btn">View More</button>
        </div>
      </section>

      {/* FIGMA UI UPDATE  — Our Core Technologies*/}
      <section className="tech-core-section fade-up">
        <div className="tech-section-header">
          <h2>
            Our Core <span className="tech-accent">Technologies</span>
          </h2>
          <div className="tech-title-underline" />
        </div>
        <div className="tech-core-grid">
          {coreTechnologies.map((tech, i) => (
            <div className="tech-core-card" key={i}>
              <div className="tech-core-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="tech-core-title">{tech.title}</h3>
              <div className="tech-core-divider" />
              <p className="tech-core-desc">{tech.desc}</p>
              <button className="tech-core-learn-more">
                Learn More <FaArrowRight style={{ marginLeft: "6px", fontSize: "0.75rem" }} />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Technologies;