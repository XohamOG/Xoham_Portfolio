export type ProjectCategory = "Web" | "Mobile" | "API";

export type PersonalInfo = {
  name: string;
  role: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codechef: string;
  resumeUrl: string;
};

export type Skills = {
  frontend: string[];
  backend: string[];
  devops: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
};

export type Achievement = {
  title: string;
  detail: string;
};

export const personalInfo: PersonalInfo = {
  name: "Soham Patil",
  role: "Backend and Full-Stack Developer",
  bio: "Tech enthusiast and lifelong learner focused on building reliable systems through backend engineering, full-stack development, and rapid prototyping across AI, blockchain, and real-world product workflows.",
  location: "Mumbai, India",
  email: "sohampatilarun11@gmail.com",
  github: "https://github.com/XohamOG",
  linkedin: "https://www.linkedin.com/in/soham-patil-78044727b/",
  leetcode: "https://leetcode.com/u/Xoham/",
  codechef: "https://www.codechef.com/users/xoham",
  resumeUrl: "/resume.pdf",
};

export const skills: Skills = {
  frontend: [
    "React.js",
    "Flutter",
    "React",
    "JavaScript",
    "Dart",
    "HTML/CSS",
    "REST API Integration",
  ],
  backend: [
    "Java",
    "Python",
    "Node.js",
    "Express",
    "Django",
    "Hyperledger Fabric",
    "REST APIs",
    "Distributed Systems",
  ],
  devops: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Docker",
    "Docker Compose",
    "GitHub Actions",
    "GitLab CI/CD",
    "Jenkins",
    "AWS",
    "GCP",
    "Linux",
  ],
};

export const projects: Project[] = [
  {
    id: "nocap-lottery",
    title: "NoCap Lottery",
    description:
      "No-loss DeFi lottery on Ethereum where yield is distributed to winners while every participant can withdraw principal anytime.",
    image: "/images/projects/nocap-lottery.svg",
    tech: [
      "Solidity",
      "Aave V3",
      "Chainlink VRF",
      "ERC-4626",
      "React",
      "Wagmi",
      "RainbowKit",
      "Li.Fi",
    ],
    liveUrl: "https://ethglobal.com/showcase/nocap-lottery-opx3z",
    githubUrl: "https://github.com/XohamOG/NoCap-Lottery",
    category: "Web",
  },
  {
    id: "ai-interview-prep",
    title: "AI Interview Preparation Platform",
    description:
      "AI-powered interview simulator with resume-based adaptive questions, multimodal analysis, and detailed feedback for candidates and hiring teams.",
    image: "/images/projects/ai-interview-prep.svg",
    tech: [
      "React",
      "Vite",
      "Django",
      "Firebase Auth",
      "Google Gemini",
      "Vertex AI",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "https://gdg-techsprint-iota.vercel.app",
    githubUrl: "https://github.com/XohamOG/GDG-Techsprint",
    category: "Web",
  },
  {
    id: "navibus",
    title: "NaviBus",
    description: "Real-time bus tracking backend system with mobile app integration, map APIs, and optimized routing from NMMT transport datasets.",
    image: "/images/projects/navibus.svg",
    tech: ["Flutter", "Dart", "Django", "REST APIs", "Map APIs"],
    liveUrl: "https://github.com/AadiSingh0805/NaviBus",
    githubUrl: "https://github.com/AadiSingh0805/NaviBus",
    category: "Mobile",
  },
  {
    id: "forensodont",
    title: "Forensodont",
    description: "Backend forensic pipeline using Python, OpenCV, and machine learning, containerized with Docker and automated through GitHub Actions.",
    image: "/images/projects/forensodont.svg",
    tech: ["Python", "OpenCV", "Machine Learning", "Docker", "GitHub Actions"],
    liveUrl: "https://github.com/XohamOG/Forensodont",
    githubUrl: "https://github.com/XohamOG/Forensodont",
    category: "API",
  },
  {
    id: "ashray",
    title: "Ashray",
    description: "Full-stack platform with scalable Node.js backend, React.js frontend, and MongoDB-backed APIs deployed with Docker.",
    image: "/images/projects/ashray.svg",
    tech: ["Node.js", "React.js", "REST APIs", "MongoDB", "Docker"],
    liveUrl: "https://invictus-deploy.vercel.app/",
    githubUrl: "https://invictus-deploy.vercel.app/",
    category: "Web",
  },
  {
    id: "healthcare-e-card",
    title: "Healthcare Repository System using E-Card",
    description: "Distributed healthcare repository backend on Hyperledger Fabric with Node.js APIs and containerized network deployment.",
    image: "/images/projects/healthcare-e-card.svg",
    tech: ["Hyperledger Fabric", "Node.js", "REST APIs", "Docker", "Docker Compose"],
    liveUrl: "https://github.com/XohamOG/fabric-samples/tree/health-rep",
    githubUrl: "https://github.com/XohamOG/fabric-samples/tree/health-rep",
    category: "API",
  },
];

export const experience: Experience[] = [
  {
    company: "VESIT",
    role: "Computer Vision and Backend Engineering Intern",
    duration: "May 2025 - Jul 2025",
    highlights: [
      "Developed backend services using Python and REST APIs for computer-vision workflows.",
      "Built ETL pipelines for automated data ingestion and processing.",
      "Improved system reliability with modular service design and efficient data workflows.",
    ],
  },
  {
    company: "VESIT",
    role: "Blockchain Software Engineering Intern",
    duration: "Nov 2024 - Jan 2025",
    highlights: [
      "Built distributed backend systems using Node.js and Hyperledger Fabric.",
      "Designed and deployed REST APIs in containerized environments with Docker.",
      "Debugged distributed components in Linux environments to improve stability.",
    ],
  },
  {
    company: "Global Hackathons",
    role: "Software Engineering Contributor (6x Winner)",
    duration: "2024 - Present",
    highlights: [
      "Won 6 hackathons by building production-ready systems using AI, agentic AI, blockchain, and machine learning.",
      "Developed solutions across sustainability, fintech, healthcare, and social impact aligned with UN SDGs.",
      "Collaborated in cross-functional teams while practicing rapid prototyping, debugging, and deployment.",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: "6x Hackathon Winner",
    detail:
      "Won six hackathons by shipping production-ready solutions across AI, agentic AI, blockchain, and machine-learning problem statements.",
  },
  {
    title: "9.35 CGPA (Semester 5)",
    detail:
      "Maintained strong academic performance while balancing internships, competitive coding, and end-to-end project development.",
  },
  {
    title: "Full-Stack + Backend Focus",
    detail:
      "Built and deployed systems spanning Flutter, React, Node.js, Django, Hyperledger Fabric, and containerized CI/CD workflows.",
  },
  {
    title: "UN SDG-Aligned Builds",
    detail:
      "Delivered solutions in healthcare, fintech, mobility, sustainability, and social impact with practical, user-facing outcomes.",
  },
];
