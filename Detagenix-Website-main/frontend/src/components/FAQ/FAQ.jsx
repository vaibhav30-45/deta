import React, { useState } from "react";
import "./FAQ.css";

const FAQ = ({ faqs, loading }) => {

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section">
      <div className="container">

        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>

        <div className="faq-wrapper">

          {loading ? (
            <p>Loading FAQs...</p>
          ) : faqs?.length > 0 ? (

            faqs.map((item, index) => (

              <div className="faq-item" key={item._id}>

                <button
                  className="faq-question"
                  onClick={() =>
                    setActiveIndex(
                      activeIndex === index ? null : index
                    )
                  }
                >

                  {item.question}

                  <span>
                    {activeIndex === index ? "-" : "+"}
                  </span>

                </button>


                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}

              </div>

            ))

          ) : (
            <p>No FAQs available.</p>
          )}

        </div>

      </div>
    </section>
  );
};

export default FAQ;