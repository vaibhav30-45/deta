import "./Services.css";

const Services = ({ service, title, desc, icon, link, onLearnMore }) => {
  const cardData = service
    ? {
        title: service.title || service.name,
        desc:
          service.subtitle ||
          service.desc ||
          service.description ||
          "New bespoke service curated by Detagenix.",
        icon:
          service.icon ||
          "https://via.placeholder.com/80?text=DG",
        onClick: onLearnMore,
        link: service.link,
      }
    : {
        title,
        desc,
        icon,
        onClick: null,
        link,
      };

  return (
    <div className="service-grids">
    <div className="service-cards">
  <div className="service-card-content">
    <img src={cardData.icon} alt={cardData.title} className="icon" />
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
  {!cardData.onClick && cardData.link && (
    <a className="learn-more" href={cardData.link}>
      Learn More →
    </a>
  )}
  </div>
</div>
  );
};

export default Services;
