import React, { useState, useEffect } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [isPaused, setIsPaused] = useState(false);

  // ✅ API data
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA 👉", data); 
        setFeedbackData(data);
      });
  }, []);

  // ✅ duplicate for slider
  const duplicatedSlides = feedbackData;

  return (
    <div className="testimonial-tech-container">
      <h1>What Our Clients Say</h1>

      <div
        className={`testimonial-slider-wrapper ${isPaused ? "paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonial-track">
          {duplicatedSlides.map((item, index) => (
            <div key={item._id + "-" + index} className="testimonial-card-tech">

              {/* Feedback text */}
              <div className="testimonial-text">
                {item.message} 
              </div>

              {/* Stars */}
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < item.rating ? "filled-star" : "empty-star"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="testimonial-footer">
                <div className="testimonial-user">
                  {item.image && (
                   <img
  src={
    item.image ||
    `https://ui-avatars.com/api/?name=${item.name}&background=0D8ABC&color=fff`
  }
  alt={item.name}
  className="testimonial-avatar"   // 👈 IMPORTANT
/>
                  )}
                  <p className="testimonial-name">{item.name}</p>
                </div>

                <div className="testimonial-company">
                  {item.companyImage && (
                    <img
                      src={item.companyImage}
                      alt={item.company}
                      className="company-logo"
                    />
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;