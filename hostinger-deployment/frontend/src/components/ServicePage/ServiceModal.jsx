import React from "react";
import "./ServiceModal.css";

const ServiceModal = ({ service, onClose, openForm }) => {
  if (!service) return null;

  const title = service.title || service.name;
  const description =
    service.description ||
    service.desc ||
    "Detailed description will be available soon.";
  const techStack = Array.isArray(service.techStack) ? service.techStack : [];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {service.icon && (
          <img src={service.icon} alt={title} className="modal-icon" />
        )}

        <h2>{title}</h2>
        <p className="modal-desc">{description}</p>

        {techStack.length > 0 && (
          <>
            <h3>Tech Stack</h3>
            <div className="tech-stack">
              {techStack.map((tech, i) => (
                <span key={i} className="tech-item">
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {openForm && (
          <button className="modal-book-btn" onClick={openForm}>
            Book This Service
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceModal;
