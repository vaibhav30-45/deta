import "./Servicecard.css";

const Servicecard = ({ service, title, desc, icon, link, onLearnMore }) => {
  const cardData = service
    ? {
        title: service.title || service.name,
        desc:
          service.subtitle ||
          service.desc ||
          service.description ||
          "More details coming soon.",
        onClick: onLearnMore,
      }
    : {
        title,
        desc,
        onClick: null,
      };

  return (
    <div className="service-card">
      <div className="service-card-content">
        {/* <img src={cardData.icon} alt={cardData.title} className="icon" /> */}
        <h3>{cardData.title}</h3>
        <p>{cardData.desc}</p>
      </div>

  {/* Modal button ONLY in services page */}
      {cardData.onClick && (
        <button className="learn-more-btn" onClick={cardData.onClick}>
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
