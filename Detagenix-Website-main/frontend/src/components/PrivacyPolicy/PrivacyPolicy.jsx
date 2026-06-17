// import React from "react";
// import "./PrivacyPolicy.css";
// import { useEffect } from "react";  

// const PrivacyPolicy = () => {
//        useEffect(() => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }, []);
//   return (
//     <div className="privacy-container">
//       <h1>Privacy Policy</h1>
//       <p className="intro">
//         At <strong>DETAGenix</strong>, we value your privacy and are committed to protecting your personal
//         information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our
//         website and services.
//       </p>

//       <section className="privacy-section">
//         <h2>1. Consent</h2>
//         <p>
//           By using our website, you consent to our Privacy Policy and agree to its terms. If you do not agree, please
//           discontinue using our site and services.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>2. Information We Collect</h2>
//         <p>
//           We collect personal details such as your name, company name, email address, and phone number when you
//           contact us or register for our services. We may also collect usage data such as IP address, browser type,
//           and visited pages for analytics and service improvement.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>3. How We Use Your Information</h2>
//         <ul>
//           <li>To provide, operate, and improve our services</li>
//           <li>To personalize your user experience</li>
//           <li>To communicate updates, offers, and support</li>
//           <li>To enhance website security and prevent fraud</li>
//           <li>To comply with legal obligations</li>
//         </ul>
//       </section>

//       <section className="privacy-section">
//         <h2>4. Data Protection Rights</h2>
//         <p>You have the right to:</p>
//         <ul>
//           <li>Request access to your data</li>
//           <li>Request correction or deletion of inaccurate data</li>
//           <li>Restrict or object to our processing of your data</li>
//           <li>Request data portability to another organization</li>
//         </ul>
//         <p>
//           To exercise these rights, contact us at{" "}
//           <a href="mailto:contact@detagenix.com">contact@detagenix.com</a>.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>5. Cookies</h2>
//         <p>
//           Like most websites, we use cookies to enhance your browsing experience by remembering your preferences and
//           analyzing usage. You can disable cookies in your browser settings, but some features may not work properly.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>6. Third-Party Services</h2>
//         <p>
//           We may use third-party tools such as Google Analytics to monitor site performance. These services may collect
//           limited data according to their own privacy policies.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>7. Children’s Privacy</h2>
//         <p>
//           We do not knowingly collect information from children under 13. If your child has shared personal data, please
//           contact us immediately and we will take appropriate action.
//         </p>
//       </section>

//       <section className="privacy-section">
//         <h2>8. Updates to This Policy</h2>
//         <p>
//           We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision
//           date.
//         </p>
//       </section>

//       <p className="contact">
//         For any questions regarding our Privacy Policy, please email us at{" "}
//         <a href="mailto:support@detagenix.com">support@detagenix.com</a>.
//       </p>
//     </div>
//   );
// };

// export default PrivacyPolicy;

import React, { useEffect } from "react";
import "./PrivacyPolicy.css";

import SEO from "../../components/SEO"; 

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="privacy-container">
      <SEO
  title="Privacy Policy | Detagenix"
  description="Read Detagenix's Privacy Policy to understand how we collect, use, protect, and manage your personal information."
  keywords="Privacy Policy, Data Protection, User Privacy, Detagenix Privacy"
  canonical="https://detagenix.com/policy"
/>
      <h1>Privacy Policy</h1>

      <p className="intro">
        At <strong>DETAGenix</strong>, we respect your privacy and are committed
        to protecting your personal information. This Privacy Policy explains
        how we collect, use, store, and safeguard your information when you
        access our website, products, and services.
      </p>

      <section className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal and non-personal information, including:
        </p>
        <ul>
          <li>Name, email address, phone number, and company details</li>
          <li>Job title and professional information</li>
          <li>Information submitted through forms or inquiries</li>
          <li>IP address, browser type, device information, and usage data</li>
          <li>Communication preferences and feedback</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>2. How We Collect Information</h2>
        <p>
          Information may be collected directly from you when you contact us,
          register on our platform, subscribe to updates, participate in events,
          or interact with our website. We may also collect information through
          cookies, analytics tools, and publicly available professional sources.
        </p>
      </section>

      <section className="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our products and services</li>
          <li>To respond to inquiries and support requests</li>
          <li>To personalize your website experience</li>
          <li>To send service updates, newsletters, and marketing content</li>
          <li>To maintain website security and prevent fraud</li>
          <li>To perform analytics and business reporting</li>
          <li>To comply with legal and regulatory obligations</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>4. Cookies and Tracking Technologies</h2>
        <p>
          DETAGenix uses cookies and similar technologies to improve website
          functionality, analyze user behavior, remember preferences, and
          enhance user experience. You may disable cookies through your browser
          settings, although some website features may not function properly.
        </p>
      </section>

      <section className="privacy-section">
        <h2>5. Sharing of Information</h2>
        <p>
          We do not sell your personal information. However, we may share data
          with trusted service providers, business partners, affiliates, legal
          authorities, or regulatory bodies when necessary for business
          operations, legal compliance, or service delivery.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. International Data Transfers</h2>
        <p>
          Your information may be processed or stored in locations outside your
          country of residence. We implement appropriate safeguards to ensure
          that personal information remains protected during such transfers in
          accordance with applicable data protection laws.
        </p>
      </section>

      <section className="privacy-section">
        <h2>7. Data Protection Rights</h2>
        <p>
          Depending on applicable laws, you may have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal data</li>
          <li>Restrict or object to certain processing activities</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Request data portability where applicable</li>
        </ul>

        <p>
          To exercise these rights, please contact us using the details
          provided below.
        </p>
      </section>

      <section className="privacy-section">
        <h2>8. Data Security</h2>
        <p>
          We implement appropriate administrative, technical, and physical
          security measures to protect your personal information against
          unauthorized access, disclosure, alteration, or destruction.
          However, no method of electronic transmission or storage is completely
          secure.
        </p>
      </section>

      <section className="privacy-section">
        <h2>9. Data Retention</h2>
        <p>
          We retain personal information only for as long as necessary to
          fulfill the purposes described in this Privacy Policy, comply with
          legal obligations, resolve disputes, and enforce our agreements.
        </p>
      </section>

      <section className="privacy-section">
        <h2>10. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites or services.
          DETAGenix is not responsible for the privacy practices or content of
          such external websites. Users are encouraged to review the privacy
          policies of those websites before providing personal information.
        </p>
      </section>

      <section className="privacy-section">
        <h2>11. Children's Privacy</h2>
        <p>
          Our services are not directed toward children under the age of 13.
          We do not knowingly collect personal information from children. If
          such information is identified, we will take reasonable steps to
          delete it promptly.
        </p>
      </section>

      <section className="privacy-section">
        <h2>12. Changes to This Privacy Policy</h2>
        <p>
          DETAGenix reserves the right to update this Privacy Policy from time
          to time. Any changes will be posted on this page along with the
          updated effective date.
        </p>
      </section>

      <section className="privacy-section">
        <h2>13. Contact Us</h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or the handling of your personal information, please contact
          us:
        </p>

        <p>
          <strong>DETAGenix</strong>
          <br />
          Email: support@detagenix.com
          <br />
          Website: www.detagenix.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;