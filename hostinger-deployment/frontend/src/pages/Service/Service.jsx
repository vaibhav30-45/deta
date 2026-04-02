import React, { useState, useEffect } from "react";
import Servicecard from "../../components/ServicePage/ServiceCard/Servicecard";
import servicespageData from "../../data/servicespageData";
import ServiceModal from "../../components/ServicePage/ServiceModal";
import BookServiceForm from "../../components/ServicePage/BookServiceForm";
import axios from "axios";
import "./Service.css";

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Fetch dynamic services from backend (blog-services contains title/icon/link used on frontend)
    const fetchServices = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
        // Use blog-services which stores title, description, icon and link
        const response = await axios.get(`${BASE_URL}/api/blog-services`);
        if (Array.isArray(response.data)) setDynamicServices(response.data);
        else setDynamicServices([]);
      } catch (error) {
        // keep static services intact if backend unavailable
        setDynamicServices([]);
      }
    };
    fetchServices();
  }, []);

  // OPEN MODAL
  const openModal = (service) => {
    setSelectedService(service);
    setOpenDetail(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setOpenDetail(false);
    setSelectedService(null);
  };

  // OPEN FORM (BOOK SERVICE)
  const openBookingForm = () => {
    setOpenDetail(false);
    setOpenForm(true);
  };

  const openFormModal = () => {
    setSelectedService(null);
    setOpenForm(true);
  };

  return (
    <section className="services-section service-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {/* Render the original static services first (preserve site appearance) */}
        {servicespageData.map((service, index) => (
          <Servicecard
            key={service.id || index}
            service={service}
            onLearnMore={() => openModal(service)}
          />
        ))}

        {/* Append admin-added dynamic services from backend */}
        {dynamicServices.map((service, index) => (
          <Servicecard
            key={service._id || `dyn-${index}`}
            service={service}
            onLearnMore={() => openModal(service)}
          />
        ))}
      </div>
      <button className="book-btn" onClick={openFormModal}>
        Book Demo
      </button>

      {openDetail && selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={closeModal}
          openForm={openBookingForm}
        />
      )}

      {openForm && (
        <BookServiceForm
          serviceName={selectedService?.title || selectedService?.name}
          onClose={() => setOpenForm(false)}
        />
      )}
    </section>
  );
};

export default Service;