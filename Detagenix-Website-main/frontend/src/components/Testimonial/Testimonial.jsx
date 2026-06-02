import React, { useState, useEffect } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [isPaused, setIsPaused] = useState(false);

  //  API data
  const [feedbackData, setFeedbackData] = useState([]);

  // Fallback static testimonials matching the Figma spec when API is down
  const fallbackTestimonials = [
    {
      _id: "t1",
      name: "Rahul Sen",
      company: "Tech Solutions Inc.",
      message: "Detagenix transformed our business operations... scalable MERN app, highly secure, fast.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Rahul+Sen&background=0a192f&color=00bfff"
    },
    {
      _id: "t2",
      name: "Allan Domnic",
      company: "AI Innovations",
      message: "The team was professional and delivered our AI Chatbot on time, highly recommend.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Allan+Domnic&background=0a192f&color=00bfff"
    },
    {
      _id: "t3",
      name: "Rahul Sen",
      company: "MERN Devs",
      message: "Detagenix delivered a secure and robust application, perfect for our scale.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Rahul+Sen&background=0a192f&color=00bfff"
    }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeedbackData(data);
        } else {
          setFeedbackData(fallbackTestimonials);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch testimonials, using fallback:", err);
        setFeedbackData(fallbackTestimonials);
      });
  }, []);



  const duplicatedSlides = [...feedbackData, ...feedbackData];

  return (
    <div className="testimonial-tech-container">
      {/* UI Fix: Removed duplicate h1 heading — section title is already rendered by the parent section header in Home.jsx */}

      <div
        className={`testimonial-slider-wrapper ${isPaused ? "paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonial-track">
          {duplicatedSlides.map((item, index) => (
            <div key={item._id + "-" + index} className="testimonial-card-tech">
              {/* Feedback text */}
              <div className="testimonial-text">{item.message}</div>

              {/* Stars */}
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < item.rating ? "filled-star" : "empty-star"}
                  >
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
                      className="testimonial-avatar"
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
