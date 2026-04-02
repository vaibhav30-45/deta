import cyber from "../asset/services/cybersecurity.jpg";
import ai from "../asset/services/ai.avif";
import blockchain from "../asset/services/blockchain.jpg";
const servicesData = [
  {
    title: "CyberSecurity",
    desc: "End-to-end protection that safeguards your digital infrastructure from modern cyber threats.",
    icon: cyber, 
    link: "/services#webdev"
  },
  {
    title: "Artificial Intelligence",
    desc: "AI-powered solutions that automate processes, enhance decision-making, and drive intelligent growth.",
    icon: ai,
    link: "/services#ai"
  },
  {
  title: "Blockchain Development",
  desc: "Secure, decentralized, and trustless blockchain solutions for smart contracts, Web3 applications, and enterprise systems.",
  icon: blockchain,   // make sure you import the icon
  link: "/services#blockchain"
}

//   {
//     title: "Mobile App Development",
//     desc: "Beautiful mobile apps for Android & iOS.",
//     icon: devops,
//     link: "/services#mobile"
//   },
//   {
//     title: "Mobile App Development",
//     desc: "Beautiful mobile apps for Android & iOS.",
//     icon: devops,
//     link: "/services#mobile"
//   }
 ];

export default servicesData;
