import React, { useState } from "react";
import "./FAQ.css";  
const FAQ = () => {
  const faqData = [
    {
      question: "How much does website development cost?",
      answer:
        "The cost of website development depends on your project requirements, design complexity, features, and technology stack. Contact us for a customized quote.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Project timelines vary based on scope and complexity. A standard website may take a few weeks, while larger applications can require more time.",
    },
    {
      question: "Do you provide support after launch?",
      answer:
        "Yes, we provide post-launch support, maintenance, bug fixes, and updates to ensure your application continues running smoothly.",
    },
    {
      question: "Can you upgrade existing software?",
      answer:
        "Yes, we can upgrade, optimize, and modernize existing software systems with improved performance and new features.",
    },
    {
      question: "Do you build AI-powered solutions?",
      answer:
        "Yes, we develop AI-powered solutions including automation, intelligent applications, machine learning integrations, and AI-based tools.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section">
      <div className="container">

        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>

        <div className="faq-wrapper">

          {faqData.map((item, index) => (
            <div className="faq-item" key={index}>

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
          ))}

        </div>

      </div>
    </section>
  );
};

export default FAQ;