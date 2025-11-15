import "./ProjectModal.css";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>×</button>

        <img src={project.image} alt={project.title} className="project-modal-img" />

        <h2>{project.title}</h2>
        <p className="project-description">{project. description}</p>

        
        <h3>Tech Stack</h3>
<div className="tech-stack">
  {(project.technologies || []).map((tech, index) => (
    <span key={index} className="tech-item">{tech}</span>
  ))}
</div>

      </div>
    </div>
  );
};

export default ProjectModal;
