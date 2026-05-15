import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProjectDetail from './Models/PortfolioProject.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const projects = [
  {
    projectName: "AssetVerse - HR & Asset Management Platform",
    projectDescription: "AssetVerse is a B2B web application that helps organizations efficiently manage assets and HR workflows with real-time tracking and automated reporting.",
    projectImage: "https://i.ibb.co.com/8gB5sVxs/asset-verse.jpg",
    projectLiveLink: "https://asset-verse-ldbv.vercel.app",
    projectGitHubLink: "https://github.com/itsSopno/Asset-Verse.git",
    projectTags: ["B2B", "HRMS", "Management"],
    projectStatus: "Completed",
    projectType: "Full-stack Platform",
    projectDemoLink: "https://asset-verse-ldbv.vercel.app",
    projectThumbnail: "https://i.ibb.co.com/8gB5sVxs/asset-verse.jpg",
    Tech: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Express", "Node.js"]
  },
  {
    projectName: "AI Model Inventory Manager",
    projectDescription: "An educational yet practical web application that allows AI teams and practitioners to organize AI models, manage metadata, and track performance metrics.",
    projectImage: "https://i.postimg.cc/dV8LgcVz/Gemini-Generated-Image-8kdsoi8kdsoi8kds",
    projectLiveLink: "https://visionary-fenglish-d5a583.netlify.app",
    projectGitHubLink: "https://github.com/itsSopno/ai-model.git",
    projectTags: ["AI", "Inventory", "Education"],
    projectStatus: "Completed",
    projectType: "AI Tooling",
    projectDemoLink: "https://visionary-fenglish-d5a583.netlify.app",
    projectThumbnail: "https://i.postimg.cc/dV8LgcVz/Gemini-Generated-Image-8kdsoi8kdsoi8kds",
    Tech: ["React", "Framer Motion", "Gemini AI", "Node.js", "Express"]
  },
  {
    projectName: "Dogstudio Interactive 3D Clone",
    projectDescription: "A high-end creative portfolio clone featuring advanced 3D web technologies, immersive animations, and 360-degree scroll-sync rotation.",
    projectImage: "https://i.postimg.cc/rp1T7mDz/Chat GPT Image Jan 27 2026 07 08 24 AM.p",
    projectLiveLink: "https://t-hree.vercel.app",
    projectGitHubLink: "https://github.com/your-username/dogstudio-clone",
    projectTags: ["3D", "WebGL", "Interactive"],
    projectStatus: "Under Development",
    projectType: "Creative Portfolio",
    projectDemoLink: "https://t-hree.vercel.app",
    projectThumbnail: "https://i.postimg.cc/rp1T7mDz/Chat GPT Image Jan 27 2026 07 08 24 AM.p",
    Tech: ["Three.js", "WebGL", "GSAP", "React", "Tailwind CSS"]
  },
  {
    projectName: "Studio Siners Digital Architecture",
    projectDescription: "A high-end creative agency ecosystem designed for digital architecting, featuring a sophisticated grid system and premium animations.",
    projectImage: "https://i.postimg.cc/HnQkZ2Qd/Gemini-Generated-Image-ev8pokev8pokev8p",
    projectLiveLink: "https://sinners-platform.vercel.app",
    projectGitHubLink: "https://github.com/itsSopno/Studio-Sinners.git",
    projectTags: ["Architecture", "Digital Agency", "Creative"],
    projectStatus: "Completed",
    projectType: "Agency Platform",
    projectDemoLink: "https://sinners-platform.vercel.app",
    projectThumbnail: "https://i.postimg.cc/HnQkZ2Qd/Gemini-Generated-Image-ev8pokev8pokev8p",
    Tech: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"]
  },
  {
    projectName: "Velvet Pour",
    projectDescription: "A high-end, immersive digital experience for a luxury cocktail bar, focusing on high-level front-end artistry and micro-interactions.",
    projectImage: "https://i.postimg.cc/v0XR7ZWc/Gemini-Generated-Image-afgujrafgujrafgu",
    projectLiveLink: "https://coctail-omega.vercel.app",
    projectGitHubLink: "https://github.com/itsSopno/Coctail.git",
    projectTags: ["Hospitality", "Luxury", "UI/UX"],
    projectStatus: "Completed",
    projectType: "Brand Experience",
    projectDemoLink: "https://coctail-omega.vercel.app",
    projectThumbnail: "https://i.postimg.cc/v0XR7ZWc/Gemini-Generated-Image-afgujrafgujrafgu",
    Tech: ["React", "Framer Motion", "GSAP", "Tailwind CSS"]
  },
  {
    projectName: "NEZIN e-commerce",
    projectDescription: "NEZIN is an immersive, high-performance e-commerce platform and architectural archive with advanced filtering and dynamic layouts.",
    projectImage: "https://i.ibb.co.com/4ZmLSzp3/Gemini-Generated-Image-nqgymrnqgymrnqgy.png",
    projectLiveLink: "https://nezin.vercel.app",
    projectGitHubLink: "https://github.com/itsSopno/NEZIN.git",
    projectTags: ["E-commerce", "Archive", "Immersive"],
    projectStatus: "Completed",
    projectType: "E-commerce Site",
    projectDemoLink: "https://nezin.vercel.app",
    projectThumbnail: "https://i.ibb.co.com/4ZmLSzp3/Gemini-Generated-Image-nqgymrnqgymrnqgy.png",
    Tech: ["React", "Tailwind CSS", "Express", "MongoDB", "Node.js"]
  }
];

const seedProjects = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb+srv://itsSopno:Sinners-Tech@ac-hghe7rr-shard-00-01.zfok7is.mongodb.net/test?authSource=admin&replicaSet=atlas-zfok7is-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing projects
    await ProjectDetail.deleteMany({});
    console.log("Cleared existing projects.");

    // Insert new projects
    await ProjectDetail.insertMany(projects);
    console.log("Successfully seeded projects!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding projects:", error);
    process.exit(1);
  }
};

seedProjects();
