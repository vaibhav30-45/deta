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
import * as Icons from "react-icons/fa";

const DynamicIcon = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) return <Icons.FaCog {...props} />; // Fallback icon
  return <IconComponent {...props} />;
};

const Servicecard = ({ service, title, desc, icon, link, onLearnMore }) => {
 

  const cardData = service
    ? {
        title: service.title,
        desc: service.subtitle || service.description,
        icon: service.icon,
        onClick: onLearnMore,
      }
    : {
        title,
        desc,
        icon,
        onClick: null,
      };

  return (
    <div className="service-card">
  <div className="service-card-content">
    {/* <img src={cardData.icon} alt={cardData.title} className="icon" /> */}
     
     <div className="service-icon" style={{ fontSize: "32px", color: "#00bfff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                       <DynamicIcon iconName={service.icon} />
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
