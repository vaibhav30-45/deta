import React from "react";
import "./ServiceModal.css";
const ServiceModal = ({ service, onClose, openForm }) => {
  if (!service) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* <img src={service.icon} className="modal-icon" /> */}

        <h2>{service.title}</h2>
        <p>{service.description}</p>
        
        <div>
         {service.link ? (
          service.link.split('\n').map((point, index) => (
            <p>{point}</p>  
           ))
         ) : (
         <li>No features available</li>
           )}
       </div>
       
        {/* <div className="tech-stack">
           <span className="tech-item">
              {service.link}
            </span> */}
         
          {/* {service.techStack?.map((tech, i) => (
             
            <span key={i} className="tech-item">
              {tech}
            </span>
          ))} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ServiceModal;

// import React from "react";
// import "./ServiceModal.css";

// const ServiceModal = ({ service, onClose, openForm }) => {
//   if (!service) return null;

//   const title = service.title || service.name;
//   const description =
//     service.description ||
//     service.desc ||
//     "Detailed description will be available soon.";
//   const techStack = Array.isArray(service.techStack) ? service.techStack : [];

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-btn" onClick={onClose}>
//           ×
//         </button>

//         {service.icon && (
//           <img src={service.icon} alt={title} className="modal-icon" />
//         )}

//         <h2>{title}</h2>
//         <p className="modal-desc">{description}</p>

//         {techStack.length > 0 && (
//           <>
//             <h3>Tech Stack</h3>
//             <div className="tech-stack">
//               {techStack.map((tech, i) => (
//                 <span key={i} className="tech-item">
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </>
//         )}

//         {openForm && (
//           <button className="modal-book-btn" onClick={openForm}>
//             Book This Service
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ServiceModal;
