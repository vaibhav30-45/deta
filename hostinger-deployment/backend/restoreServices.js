const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/services';

const services = [
  {
    title: "Cloud Implementation & Digital Transformation",
    description: "Seamlessly migrate and optimize your infrastructure with our Cloud Implementation expertise. We help you leverage platforms like AWS, Azure, or Google Cloud for cost efficiency, flexible scaling, and enhanced disaster recovery, ensuring business continuity. We create a holistic Digital Transformation roadmap tailored to your goals. Our team integrates modern technologies, automates critical processes, and upgrades legacy systems to ensure your business is agile, efficient, and fully prepared for the future.",
    desc: "Migrate & optimize on AWS, Azure, or Google Cloud.",
    techStack: ["AWS", "Azure", "GCP", "Docker", "Automation", "Cloud Migration", "Process Optimization", "AI Integration"]
  },
  {
    title: "Custom Software Development",
    description: "Our Custom Software Development service focuses on building high-quality, scalable, and user-centric digital products that solve real business challenges. We design and develop applications tailored specifically to your requirements—whether it is enterprise platforms, web portals, mobile apps, SaaS products, or internal workflow systems. Our team follows modern engineering practices including microservices, clean architecture, secure APIs, and intuitive UI/UX design. Every product is built for performance, long-term scalability, and seamless integration with your existing tools. We work closely with stakeholders to understand business goals, automate processes, and create software that enhances productivity, supports decision-making, and gives your organization a competitive edge in the digital landscape.",
    desc: "Bespoke software crafted to solve your unique business challenges.",
    techStack: ["Custom Architecture", "API Development", "Full-Stack Engineering", "Cloud Deployment"]
  },
  {
    title: "Resource Deployment",
    description: "Resource Deployment provides businesses with access to highly skilled, pre-vetted IT professionals who can strengthen teams and accelerate delivery without the overhead of full-time hiring. We deploy developers, cloud engineers, designers, testers, DevOps specialists, data experts, and project consultants on contract, part-time, long-term, or on-demand basis. Our model ensures flexibility, allowing companies to scale teams quickly during high-priority projects, fill talent gaps, or access specialized expertise not available in-house. We handle hiring, screening, onboarding, payroll, and resource management—so you focus solely on execution. This service helps organizations reduce hiring time, minimize operational costs, and maintain high productivity while ensuring projects progress smoothly and efficiently.",
    desc: "On-demand skilled talent and strategic consulting for business growth.",
    techStack: ["Project Augmentation", "Consulting", "Talent Deployment", "Business Optimization"]
  },
  {
    title: "Business Solutions",
    description: "Our Business Solutions service helps organizations optimize operations, automate processes, and make smarter decisions using integrated, technology-driven systems. We develop end-to-end solutions such as business process automation workflows, CRM & ERP implementations, analytics dashboards, workflow engines, and cross-platform integrations. These solutions eliminate manual work, unify fragmented systems, improve team coordination, and provide real-time visibility into business performance. By leveraging modern tools and automation technologies, we help businesses reduce costs, increase efficiency, and scale operations effortlessly. Our consulting team works closely with decision-makers to understand their pain points, design efficient workflows, and implement digital frameworks that boost productivity and enable long-term, insight-driven growth.",
    desc: "Technology-driven solutions to streamline operations and accelerate growth.",
    techStack: ["Process Automation", "CRM/ERP Solutions", "Workflow Optimization", "Data Analytics"]
  }
];

(async () => {
  for (const service of services) {
    try {
      const res = await axios.post(BASE_URL, service);
      console.log(`Added: ${service.title}`);
    } catch (err) {
      console.error(`Failed to add: ${service.title}`, err.response?.data || err.message);
    }
  }
  console.log('Service restore complete.');
})();
