import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

// Services data for detailed responses
const servicesInfo = {
  "cybersecurity": {
    title: "🔐 CyberSecurity",
    description: "End-to-end protection that safeguards your digital infrastructure from modern cyber threats.\n\n• Vulnerability assessments\n• Penetration testing\n• Security compliance\n• Threat monitoring & response\n• Data protection strategies"
  },
  "ai": {
    title: "🤖 Artificial Intelligence",
    description: "AI-powered solutions that automate processes, enhance decision-making, and drive intelligent growth.\n\n• Machine Learning models\n• Natural Language Processing\n• Computer Vision solutions\n• Predictive Analytics\n• Process Automation"
  },
  "blockchain": {
    title: "⛓️ Blockchain Development",
    description: "Secure, decentralized, and trustless blockchain solutions for smart contracts, Web3 applications, and enterprise systems.\n\n• Smart contracts development\n• DApp development\n• Web3 solutions\n• Supply chain tracking\n• Enterprise blockchain"
  },
  "cloud": {
    title: "☁️ Cloud Implementation & Digital Transformation",
    description: "Seamlessly migrate and optimize your infrastructure with our Cloud Implementation expertise.\n\n• AWS, Azure, Google Cloud migration\n• Infrastructure optimization\n• Disaster recovery\n• Cloud-native architecture\n• Cost optimization"
  },
  "custom": {
    title: "⚙️ Custom Software Development",
    description: "Bespoke software crafted to solve your unique business challenges.\n\n• Enterprise platforms\n• Web & mobile apps\n• SaaS products\n• Microservices architecture\n• API development\n• Cloud deployment"
  },
  "resources": {
    title: "👥 Resource Deployment",
    description: "On-demand skilled talent and strategic consulting for business growth.\n\n• Dedicated developers\n• Cloud engineers\n• UI/UX designers\n• QA specialists\n• DevOps professionals\n• Project consultants"
  },
  "business": {
    title: "💼 Business Solutions",
    description: "Technology-driven solutions to streamline operations and accelerate growth.\n\n• Process automation\n• CRM & ERP implementation\n• Analytics dashboards\n• Workflow optimization\n• System integration\n• Real-time reporting"
  }
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage("👋 Hello! Welcome to Detagenix!");
      }, 500);
      setTimeout(() => {
        addBotMessage("We're a leading software development company specializing in AI, Web, and Mobile solutions. How can I assist you today?");
      }, 1500);
      setTimeout(() => {
        setShowOptions(true);
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { text, sender: "bot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { text, sender: "user", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    addUserMessage(option);

    setTimeout(() => {
      switch (option) {
        case "Our Services":
          addBotMessage("We offer a comprehensive range of services:\n\n💼 Cloud Implementation & Digital Transformation\n🤖 Artificial Intelligence & ML\n🔐 CyberSecurity\n⛓️ Blockchain Development\n⚙️ Custom Software Development\n👥 Resource Deployment\n💼 Business Solutions\n\nWhich service would you like to know more about?");
          setTimeout(() => {
            setShowOptions(true);
          }, 1000);
          break;
        case "Contact Information":
          addBotMessage("📍 Location: Indore, Madhya Pradesh, India\n📧 Email: hr@detagenix.com\n📞 Phone: +91 9407552249");
          setTimeout(() => {
            setShowOptions(true);
          }, 1000);
          break;
        case "Chat on WhatsApp":
          addBotMessage("Great! I'll redirect you to our WhatsApp Business account where our team can assist you personally. 🚀");
          setTimeout(() => {
            const phoneNumber = "919407552249";
            const message = encodeURIComponent("Hi! I'd like to get in touch with Detagenix.");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
          }, 1500);
          break;
        default:
          addBotMessage("How else can I help you?");
          setTimeout(() => {
            setShowOptions(true);
          }, 1000);
      }
    }, 800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    addUserMessage(inputValue);
    setInputValue("");
    setShowOptions(false);

    // Simple AI responses based on keywords
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      
      // Check for specific service queries
      if (lowerInput.includes("cloud") || lowerInput.includes("digital transformation")) {
        addBotMessage(servicesInfo.cloud.title + "\n\n" + servicesInfo.cloud.description);
      } else if (lowerInput.includes("cybersecurity") || lowerInput.includes("cyber security") || lowerInput.includes("security")) {
        addBotMessage(servicesInfo.cybersecurity.title + "\n\n" + servicesInfo.cybersecurity.description);
      } else if (lowerInput.includes("artificial intelligence") || lowerInput.includes("ai") || lowerInput.includes("machine learning") || lowerInput.includes("ml")) {
        addBotMessage(servicesInfo.ai.title + "\n\n" + servicesInfo.ai.description);
      } else if (lowerInput.includes("blockchain")) {
        addBotMessage(servicesInfo.blockchain.title + "\n\n" + servicesInfo.blockchain.description);
      } else if (lowerInput.includes("custom software") || lowerInput.includes("custom development")) {
        addBotMessage(servicesInfo.custom.title + "\n\n" + servicesInfo.custom.description);
      } else if (lowerInput.includes("resource") || lowerInput.includes("developer") || lowerInput.includes("talent")) {
        addBotMessage(servicesInfo.resources.title + "\n\n" + servicesInfo.resources.description);
      } else if (lowerInput.includes("business solution") || lowerInput.includes("business solutions")) {
        addBotMessage(servicesInfo.business.title + "\n\n" + servicesInfo.business.description);
      } else if (lowerInput.includes("service") || lowerInput.includes("what do you do")) {
        addBotMessage("We specialize in:\n• Cloud Implementation & Digital Transformation\n• Artificial Intelligence & ML Solutions\n• CyberSecurity\n• Blockchain Development\n• Custom Software Development\n• Resource Deployment\n• Business Solutions\n\nWhich service interests you? 😊");
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("quote")) {
        addBotMessage("Pricing depends on your project requirements. Let's connect on WhatsApp to discuss your needs and provide a custom quote! 💼");
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        addBotMessage("Hello! 👋 How can I help you today?");
      } else if (lowerInput.includes("contact") || lowerInput.includes("reach") || lowerInput.includes("call")) {
        addBotMessage("You can reach us at:\n📧 hr@detagenix.com\n📞 +91 9407552249\n\nOr chat with us on WhatsApp!");
      } else {
        addBotMessage("That's a great question! For detailed information, I'd recommend connecting with our team on WhatsApp. They'll be happy to assist you! 😊");
      }
      setTimeout(() => {
        setShowOptions(true);
      }, 1000);
    }, 800);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        className={`chatbot-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-chat-dots-fill"></i>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <i className="bi bi-robot"></i>
              </div>
              <div>
                <h4>Detagenix AI Assistant</h4>
                <span className="status">
                  <span className="status-dot"></span> Online
                </span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Quick Options */}
            {showOptions && (
              <div className="quick-options">
                <p className="options-label">Quick Options:</p>
                <button onClick={() => handleOptionClick("Our Services")} className="option-btn">
                  💼 Our Services
                </button>
                <button onClick={() => handleOptionClick("Chat on WhatsApp")} className="option-btn whatsapp-option">
                  <i className="bi bi-whatsapp"></i> Chat on WhatsApp
                </button>
                <button onClick={() => handleOptionClick("Contact Information")} className="option-btn">
                  📞 Contact Info
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" aria-label="Send message">
              <i className="bi bi-send-fill"></i>
            </button>

          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
