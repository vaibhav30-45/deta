import React, { useState, useEffect } from "react";
import "./Testimonial.css";
import RenderStars from "./RenderStars";

const Testimonial = () => {
  const [isPaused, setIsPaused] = useState(false);

  //  API data
  const [feedbackData, setFeedbackData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL ;

 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/testimonials`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeedbackData(data);
        }
        //  else {
        //   setFeedbackData(fallbackTestimonials);
        // }
      })
      .catch((err) => {
        console.warn("Failed to fetch testimonials, using fallback:", err);
        // setFeedbackData(fallbackTestimonials);
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
              <div className="testimonial-text">
  {item.message.split(" ").slice(0, 50).join(" ")}
  {item.message.split(" ").length > 50 && "..."}
</div>
               <div>
              {/* Stars */}
              <div className="testimonial-stars">
                 <RenderStars rating = {item.rating}/>
                {/* {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < item.rating ? "filled-star" : "empty-star"}
                  >
                    ★
                  </span>
                ))} */}
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
                   <p className="company-name">
    {item.company}
  </p>
                </div>
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
