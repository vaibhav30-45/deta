import "./Servicecard.css";
import {
  FaCode,
  FaMobileAlt,
  FaRobot,
  FaUsers,
  FaDatabase,
  FaCloud,
  FaShoppingCart,
  FaWordpress,
  FaSearch,
  FaTools,
  FaProjectDiagram,
  FaPalette,
  FaChartLine,
  FaCogs,
  FaServer,
  FaBriefcase,
} from "react-icons/fa";

import {
  MdCloudDone,
  MdAnalytics,
  MdApi,
} from "react-icons/md";

const Servicecard = ({ service, title, desc, icon, link, onLearnMore }) => {
  //  If the component receives a `service` object (Services Page)
  const getIcon = (title) => {
  switch (title) {
    case "Cloud Implementation & Digital Transformation":
      return <MdCloudDone />;

    case "Custom Software Development":
      return <FaCode />;

    case "Resource Deployment":
      return <FaBriefcase />;

    case "Business Solutions & Automation":
      return <FaCogs />;

    case "Web Design & Development":
      return <FaCode />;

    case "Mobile Application Development":
      return <FaMobileAlt />;

    case "Enterprise Resource Planning (ERP) Solutions":
      return <FaDatabase />;

    case "Customer Relationship Management (CRM)":
      return <FaUsers />;

    case "Human Resource Management System (HRMS)":
      return <FaUsers />;

    case "Artificial Intelligence & Machine Learning":
      return <FaRobot />;

    case "UI/UX Design Services":
      return <FaPalette />;

    case "API Development & System Integration":
      return <MdApi />;

    case "Digital Transformation Consulting":
      return <FaChartLine />;

    case "SEO & Digital Growth Solutions":
      return <FaSearch />;

    case "Dedicated Development Teams":
      return <FaProjectDiagram />;

    case "Maintenance & Support Services":
      return <FaTools />;

    case "WordPress Development Services":
      return <FaWordpress />;

    case "Shopify Development Services":
      return <FaShoppingCart />;

    case "CMS & E-Commerce Platform Solutions":
      return <FaShoppingCart />;

    case "Cloud & DevOps Services":
      return <FaCloud />;

    case "Business Intelligence & Analytics":
      return <MdAnalytics />;

    case "E-Commerce Development":
      return <FaShoppingCart />;

    default:
      return <FaServer />;
  }
};
  const cardData = service
    ? {
        title: service.title,
        desc: service.subtitle || service.desc,
        // icon: service.icon,
        onClick: onLearnMore,
      }
    : {
        title,
        desc,
        // icon,
        onClick: null,
      };

  return (
    <div className="service-card">
  <div className="service-card-content">
    {/* <img src={cardData.icon} alt={cardData.title} className="icon" /> */}
     <div className="service-icon">
    {getIcon(cardData.title)}
  </div>
    <h3>{cardData.title}</h3>
    <p>{cardData.desc}</p>
  </div>

  {/* Modal button ONLY in services page */}
  {cardData.onClick && (
    <button
      className="learn-more-btn"
      onClick={cardData.onClick}
    >
      Learn More →
    </button>
  )}

  {/* Link ONLY in homepage */}
  {!cardData.onClick && link && (
    <a className="learn-more" href={link}>
      Learn More →
    </a>
  )}
</div>
  );
};

export default Servicecard;
