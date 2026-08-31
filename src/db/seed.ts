import { db } from "./index";
import {
  heroInfo,
  experiences,
  educations,
  projects,
  researchProjects,
  skillCategories,
  skills,
  certifications,
  awards,
  volunteerActivities,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Hapus data lama sebelum seed ulang
  await db.delete(volunteerActivities);
  await db.delete(awards);
  await db.delete(certifications);
  await db.delete(skills);
  await db.delete(skillCategories);
  await db.delete(researchProjects);
  await db.delete(projects);
  await db.delete(educations);
  await db.delete(experiences);
  await db.delete(heroInfo);

  // ============================================================
  // HERO INFO
  // ============================================================
  await db.insert(heroInfo).values({
    name: "M. Ikhsan Pasaribu",
    title: "Backend AI Engineering Intern & Software Engineer",
    tagline: "Building intelligent systems and scalable web applications.",
    bio: "I'm a Computer Science Education student at Universitas Negeri Padang, Indonesia, with hands-on experience in AI/ML systems, full-stack web development, and multi-agent architectures. I've built production platforms for government, contributed to AI-powered educational tools, and competed nationally in software engineering. Currently interning as a Backend AI Engineer at Flyrank AI.",
    location: "Pekanbaru, Riau, Indonesia",
    email: "mikhsanpasaribu@gmail.com",
    phone: "+6285271207118",
    linkedinUrl: "https://linkedin.com/in/mikhsanpasaribu",
    githubUrl: "https://github.com/MIkhsanPasaribu",
    websiteUrl: "https://mikhsanpasaribu.vercel.app",
    avatarPath: "/images/ikhsan.jpg",
    isVisible: true,
  });

  // ============================================================
  // EXPERIENCES
  // ============================================================
  await db.insert(experiences).values([
    {
      company: "Flyrank AI",
      role: "Backend AI Engineering Intern",
      location: "Remote, Indonesia",
      type: "work",
      startDate: "Jun 2026",
      endDate: null,
      description: [
        "Building backend AI systems with focus on retrieval-augmented generation (RAG) and structured output pipelines",
        "Designing and implementing server-side workflows for LLM-based applications, including data flow orchestration and model integration",
        "Developing evaluation harnesses to measure model performance, reliability, and failure cases",
        "Working with modern AI tooling and frameworks to simulate real-world deployment scenarios",
      ],
      order: 1,
      isVisible: true,
    },
    {
      company: "HowArts Studio",
      role: "Software Engineer",
      location: "Padang, West Sumatra, Indonesia",
      type: "work",
      startDate: "Sep 2025",
      endDate: null,
      description: [
        "Designed and developed custom web applications and digital platforms tailored to client requirements",
        "Delivered government-backed platforms including KATUMBA PAUD and UK-ORMAWA UNP, each serving hundreds of active users",
        "Contributed to AI-powered platform development using LangChain, Google Gemini, and Next.js",
      ],
      order: 2,
      isVisible: true,
    },
    {
      company: "Google",
      role: "Student Ambassador Indonesia",
      location: "Remote / Padang, West Sumatra, Indonesia",
      type: "work",
      startDate: "Sep 2025",
      endDate: "Feb 2026",
      description: [
        "Selected as Google Student Ambassador for Universitas Negeri Padang from a pool of 12,000 students nationwide",
        "Served as primary liaison between Google regional team and campus community",
        "Managed end-to-end lifecycle of technical workshops on Gemini AI",
      ],
      order: 3,
      isVisible: true,
    },
    {
      company: "Google",
      role: "Cloud Innovator",
      location: "Remote",
      type: "work",
      startDate: "Jan 2025",
      endDate: null,
      description: [
        "Engaged in Google Cloud Innovator program, maintaining active participation in the Google Developer Program",
        "Building cloud-focused technical competencies",
      ],
      order: 4,
      isVisible: true,
    },
    {
      company: "DigiStar Club by Telkom Indonesia",
      role: "Vice Chairman",
      location: "Padang, West Sumatra, Indonesia",
      type: "organization",
      startDate: "Dec 2025",
      endDate: null,
      description: [
        "Assisted the Chairman in leading a student community focused on advancing digital talent in AI, data, and emerging technologies",
        "Facilitated collaboration with industry partners and coordinated workshops and mentoring programs",
      ],
      order: 5,
      isVisible: true,
    },
    {
      company: "UK INFITECH UNP",
      role: "Vice Chairman and Secretary",
      location: "Padang, West Sumatra, Indonesia",
      type: "organization",
      startDate: "Feb 2026",
      endDate: null,
      description: [
        "Assisted in strategic decision-making, oversaw organizational operations, and managed administrative governance",
        "Coordinated internal programs, documented official correspondence, and ensured effective communication across departments",
      ],
      order: 6,
      isVisible: true,
    },
    {
      company: "UK Robotika UNP",
      role: "Head of Information Technology Department",
      location: "Padang, West Sumatra, Indonesia",
      type: "organization",
      startDate: "Feb 2025",
      endDate: null,
      description: [
        "Led creation, development, and maintenance of the official UK Robotika UNP website",
        "Designed and developed the Open Recruitment web system to streamline applicant registration and data management",
        "Oversaw internal IT governance including digital infrastructure, system operations, and technical workflows",
      ],
      order: 7,
      isVisible: true,
    },
    {
      company: "UK Robotika UNP",
      role: "Young Member",
      location: "Padang, West Sumatra, Indonesia",
      type: "organization",
      startDate: "Dec 2023",
      endDate: "Feb 2025",
      description: [
        "Served as Infocom Committee member at the 2024 UKRO UNP Work Conference",
        "Represented the IT Department at GEMASTIK in the Programming category",
        "Acted as IT Coordinating Committee member for the 15th Batch Recruitment Program in 2024",
      ],
      order: 8,
      isVisible: true,
    },
    {
      company: "Outlier",
      role: "AI Trainer and Reviewer",
      location: "Remote, Indonesia",
      type: "work",
      startDate: "Sep 2024",
      endDate: "Aug 2025",
      description: [
        "Trained and reviewed cutting-edge generative AI models on assigned projects in the field of Mathematics",
      ],
      order: 9,
      isVisible: true,
    },
    {
      company: "Appen",
      role: "AI Trainer and Reviewer",
      location: "Remote, Indonesia",
      type: "work",
      startDate: "Oct 2024",
      endDate: "Nov 2024",
      description: [
        "Trained and reviewed generative AI models on Indonesian-language writing tasks as part of the CrowdGen program",
      ],
      order: 10,
      isVisible: true,
    },
    {
      company: "Universitas Negeri Padang",
      role: "Assistant Lecturer for Journal Editorial",
      location: "West Sumatra, Indonesia",
      type: "work",
      startDate: "Aug 2024",
      endDate: "Dec 2024",
      description: [
        "Assisted lecturer in editing and preparing journal submissions for publication in the Journal of Computer Engineering and Informatics (JTEKI)",
      ],
      order: 11,
      isVisible: true,
    },
    {
      company: "Generasi Baru Indonesia (GenBI UNP)",
      role: "Member, Public Health Environmental Division",
      location: "Indonesia",
      type: "organization",
      startDate: "Oct 2024",
      endDate: null,
      description: [
        "Contributed to organizing programs promoting environmental sustainability and public health awareness as a Bank Indonesia scholarship awardee",
      ],
      order: 12,
      isVisible: true,
    },
  ]);

  // ============================================================
  // EDUCATIONS
  // ============================================================
  await db.insert(educations).values([
    {
      institution: "Universitas Negeri Padang",
      degree: "Bachelor of Education",
      field: "Informatics Engineering Education",
      location: "Padang, West Sumatra, Indonesia",
      startDate: "Aug 2023",
      endDate: null,
      description: [
        "Relevant coursework: Data Structures, Algorithm Analysis, Database Management, UI/UX Design, Research Methods, Artificial Intelligence",
        "Member of Bank Indonesia Scholarship Program (GenBI UNP)",
      ],
      order: 1,
      isVisible: true,
    },
    {
      institution: "SMAN 1 Tembilahan",
      degree: "High School Diploma",
      field: "Mathematics and Natural Science",
      location: "Indragiri Hilir, Riau, Indonesia",
      startDate: "Jan 2020",
      endDate: "Jun 2023",
      grade: "91.88 / 100",
      description: [
        "Graduated ranked 3rd in class with a diploma average score of 91.88 out of 100",
      ],
      order: 2,
      isVisible: true,
    },
  ]);

  // ============================================================
  // PROJECTS
  // ============================================================
  await db.insert(projects).values([
    {
      title: "SOCsentinel",
      subtitle: "Multi-Agent LLM Assistant for SOC Analysts",
      description:
        "A fully autonomous 9-agent LLM pipeline that automates Level 1 through Level 3 SOC analyst workflows including alert triage, evidence collection, MITRE ATT&CK mapping, Sigma rule generation, response playbook creation, and adversarial validation.",
      role: "Lead Developer",
      context: "AMD Developer Hackathon 2026, Track: AI Agents and Agentic Workflows",
      startDate: "May 2026",
      endDate: null,
      techStack: ["Python 3.11", "FastAPI", "LangChain", "Qwen3 (vLLM)", "ChromaDB", "React 18", "TypeScript", "TailwindCSS", "Docker", "AMD ROCm", "Hugging Face Spaces"],
      highlights: [
        "Reduced average alert triage time from 45 minutes to under 5 minutes",
        "Implemented ChromaDB vector RAG grounded on 697 MITRE ATT&CK Enterprise techniques",
        "Engineered Human-in-the-Loop (HITL) decision panel with confidence override and audit trail",
        "Achieved 100% test pass rate across 58 tests",
        "Delivered SOAR export compatibility for Splunk SOAR, Cortex XSOAR, and Microsoft Sentinel",
      ],
      githubUrl: "https://github.com/MIkhsanPasaribu/socsentinel",
      liveUrl: "https://lablab.ai/ai-hackathons/amd-developer/pengen-coba2-aja/socsentinel-multi-agent-llm-soc-analyst",
      featured: true,
      order: 1,
      isVisible: true,
    },
    {
      title: "AIVIA",
      subtitle: "Alzheimer Intelligent Virtual Interactive Assistant",
      description:
        "A Flutter-based Android app for Alzheimer patients and caregivers, featuring on-device face recognition with GhostFaceNet (TFLite), daily activity journaling, one-tap emergency alerts, and real-time geofencing for family dashboards.",
      role: "Lead Developer, Flutter Android Application",
      startDate: "Oct 2025",
      endDate: "Jan 2026",
      techStack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "pgvector", "PostGIS", "GhostFaceNet", "TFLite"],
      highlights: [
        "On-device face recognition with GhostFaceNet (TFLite)",
        "Backend on Supabase with pgvector for face-embedding similarity search",
        "UI compliant with WCAG AAA accessibility standards",
        "Real-time geofencing for family dashboards",
      ],
      githubUrl: "https://github.com/MIkhsanPasaribu/project_aivia",
      featured: true,
      order: 2,
      isVisible: true,
    },
    {
      title: "Fintar",
      subtitle: "AI-Powered Smart Financial Optimization Platform",
      description:
        "An AI-powered financial management platform for Indonesian families and SMEs, integrating Google Gemini 2.0 Flash via LangChain.js as a conversational Financial Co-Pilot.",
      role: "Full-Stack and AI Engineer",
      context: "HowArts Studio / National-Level Student Competition (GEMASTIK)",
      startDate: "Sep 2025",
      endDate: "Jan 2026",
      techStack: ["Next.js 15", "TypeScript", "NestJS", "PostgreSQL", "Prisma ORM", "MongoDB", "Socket.io", "Google Gemini 2.0", "LangChain.js", "Vercel", "Railway"],
      highlights: [
        "Integrated Google Gemini 2.0 Flash as conversational Financial Co-Pilot",
        "Real-time communication with Socket.io",
        "CI/CD via GitHub Actions, deployed on Vercel and Railway",
      ],
      githubUrl: "https://github.com/MIkhsanPasaribu/fintar",
      featured: true,
      order: 3,
      isVisible: true,
    },
    {
      title: "PahamKode",
      subtitle: "AI-Powered Semantic Programming Error Analysis System",
      description:
        "An educational platform analyzing programming errors from a semantic perspective using Bloom's Taxonomy to deliver adaptive, cognitive-level-appropriate explanations.",
      role: "Full-Stack and AI Engineer",
      context: "Universitas Negeri Padang",
      startDate: "Sep 2025",
      endDate: "Dec 2025",
      techStack: ["Python 3.11", "Streamlit", "Azure Cosmos DB", "LangChain", "GitHub Models API", "Azure VM"],
      highlights: [
        "Uses Bloom's Taxonomy for adaptive explanations",
        "Deployed on Azure VM with 99.9% uptime",
        "Cost-efficient inference via GitHub Models API",
      ],
      githubUrl: "https://github.com/MIkhsanPasaribu/PahamKodev2",
      order: 4,
      isVisible: true,
    },
    {
      title: "KATUMBA PAUD",
      subtitle: "Early Childhood Growth Monitoring Platform",
      description:
        "A government-backed web platform for Bukittinggi City to replace manual recording of child growth indicators with a structured digital system for PAUD educators.",
      role: "Full-Stack and Generative AI Engineer",
      context: "HowArts Studio",
      startDate: "Sep 2025",
      endDate: null,
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Google Gemini API"],
      highlights: [
        "Officially recognized by the Mayor of Bukittinggi City",
        "Replaced manual recording with structured digital system",
        "Serving hundreds of PAUD educators across Bukittinggi",
      ],
      featured: true,
      order: 5,
      isVisible: true,
    },
    {
      title: "BUMNag Madani Lubuk Malako",
      subtitle: "Official Website",
      description:
        "A public transparency platform centralizing organizational profile, financial statistics, annual reports, and community engagement data for a village-owned enterprise.",
      role: "Project Manager and Full-Stack Engineer",
      startDate: "Jan 2026",
      endDate: "Mar 2026",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      highlights: [
        "Led end-to-end development of public transparency platform",
        "Secure data handling and responsive UI",
        "Enables public access to organizational information",
      ],
      order: 6,
      isVisible: true,
    },
    {
      title: "Publishify",
      subtitle: "Manuscript Publishing Management System",
      description:
        "A monorepo full-stack system for four user roles (authors, editors, printers, administrators) spanning a 12-stage publishing pipeline including payment, editing, layout, ISBN registration, and distribution.",
      role: "Full-Stack Engineer",
      context: "Universitas Negeri Padang",
      startDate: "Sep 2025",
      endDate: "Dec 2025",
      techStack: ["NestJS", "Bun", "PostgreSQL", "Redis", "Next.js 16", "React 19", "Tailwind CSS v4", "Flutter"],
      highlights: [
        "12-stage publishing pipeline for 4 user roles",
        "Backend on NestJS with Bun runtime and Redis caching",
        "Flutter mobile companion app",
      ],
      order: 7,
      isVisible: true,
    },
    {
      title: "Sanggah: Duel Retorika",
      subtitle: "AI-Powered Educational Card Game",
      description:
        "A turn-based AI educational card game in Unity teaching critical thinking through debate simulation against an AI opponent that dynamically generates contextual arguments.",
      role: "Unity Developer",
      startDate: "Sep 2025",
      endDate: "Nov 2025",
      techStack: ["Unity 2022.3 LTS", "C#", "DOTween"],
      highlights: [
        "State-machine DebateManager and ScriptableObject-driven card data",
        "DOTween UI animations with event-driven Observer pattern",
        "AI opponent generates real-time counter-arguments",
      ],
      order: 8,
      isVisible: true,
    },
    {
      title: "UKRO UNP Recruitment Platform",
      subtitle: "Modern Web Recruitment System",
      description:
        "A modern recruitment web platform with multi-step registration, secure document upload, automated PDF email confirmation, and an admin dashboard with bulk processing, CSV export, and Chart.js analytics.",
      role: "Full-Stack Engineer",
      startDate: "Feb 2025",
      endDate: "Aug 2025",
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase PostgreSQL", "Nodemailer", "Vercel"],
      highlights: [
        "Multi-step registration with secure document upload",
        "Automated PDF email confirmation via Nodemailer",
        "Admin dashboard with Chart.js analytics and CSV export",
        "Deployed on Vercel with CI/CD",
      ],
      order: 9,
      isVisible: true,
    },
  ]);

  // ============================================================
  // RESEARCH PROJECTS
  // ============================================================
  await db.insert(researchProjects).values([
    {
      title: "SOCsentinel: Multi-Agent LLM Assistant for SOC Analysts",
      role: "Lead Developer",
      event: "AMD Developer Hackathon 2026",
      track: "AI Agents and Agentic Workflows",
      startDate: "May 2026",
      endDate: null,
      description:
        "Built a fully autonomous 9-agent LLM pipeline automating L1-L3 SOC analyst workflows with MITRE ATT&CK RAG, HITL panels, and SOAR export.",
      highlights: [
        "9-agent LLM pipeline: alert triage, evidence collection, MITRE ATT&CK mapping, Sigma rule generation",
        "ChromaDB RAG grounded on 697 MITRE ATT&CK Enterprise techniques",
        "100% test pass rate across 58 tests",
        "SOAR export for Splunk SOAR, Cortex XSOAR, Microsoft Sentinel",
      ],
      techStack: ["Python 3.11", "FastAPI", "LangChain", "Qwen3", "ChromaDB", "AMD ROCm", "vLLM"],
      githubUrl: "https://github.com/MIkhsanPasaribu/socsentinel",
      submissionUrl: "https://lablab.ai/ai-hackathons/amd-developer/pengen-coba2-aja/socsentinel-multi-agent-llm-soc-analyst",
      order: 1,
      isVisible: true,
    },
    {
      title: "AIVIA: Alzheimer Intelligent Virtual Interactive Assistant",
      role: "Lead Developer",
      startDate: "Oct 2025",
      endDate: "Jan 2026",
      description:
        "Flutter Android app for Alzheimer patients featuring on-device face recognition (GhostFaceNet), geofencing, and WCAG AAA-compliant UI.",
      highlights: [
        "On-device GhostFaceNet face recognition via TFLite",
        "pgvector similarity search for face embeddings",
        "WCAG AAA accessibility compliance",
      ],
      techStack: ["Flutter", "Dart", "Supabase", "GhostFaceNet", "TFLite", "pgvector", "PostGIS"],
      githubUrl: "https://github.com/MIkhsanPasaribu/project_aivia",
      order: 2,
      isVisible: true,
    },
    {
      title: "Fintar: AI-Powered Smart Financial Optimization Platform",
      role: "Full-Stack and AI Engineer",
      event: "GEMASTIK (National Student Exhibition in ICT)",
      startDate: "Sep 2025",
      endDate: "Jan 2026",
      description:
        "AI-powered financial management platform for Indonesian families and SMEs with Gemini 2.0 Flash Financial Co-Pilot via LangChain.js.",
      highlights: [
        "LangChain.js + Gemini 2.0 Flash conversational Financial Co-Pilot",
        "MongoDB vector storage for semantic search",
        "Real-time Socket.io communication",
      ],
      techStack: ["Next.js 15", "NestJS", "LangChain.js", "Google Gemini 2.0", "MongoDB", "PostgreSQL"],
      githubUrl: "https://github.com/MIkhsanPasaribu/fintar",
      order: 3,
      isVisible: true,
    },
    {
      title: "PahamKode: AI-Powered Semantic Programming Error Analysis",
      role: "Full-Stack and AI Engineer",
      event: "Universitas Negeri Padang",
      startDate: "Sep 2025",
      endDate: "Dec 2025",
      description:
        "Educational platform using Bloom's Taxonomy and LangChain to deliver adaptive, cognitive-level-appropriate programming error explanations.",
      highlights: [
        "Bloom's Taxonomy-based adaptive explanations",
        "Azure Cosmos DB + GitHub Models API for cost-efficient inference",
        "99.9% uptime on Azure VM",
      ],
      techStack: ["Python 3.11", "Streamlit", "LangChain", "Azure Cosmos DB", "GitHub Models API"],
      githubUrl: "https://github.com/MIkhsanPasaribu/PahamKodev2",
      order: 4,
      isVisible: true,
    },
  ]);

  // ============================================================
  // SKILL CATEGORIES & SKILLS
  // ============================================================
  const [langCat, frameworkCat, cloudCat, dbCat, aiCat, langSpokenCat] =
    await db
      .insert(skillCategories)
      .values([
        { name: "Programming Languages", icon: "CodeBracketIcon", order: 1 },
        { name: "Frameworks & Libraries", icon: "CubeIcon", order: 2 },
        { name: "Cloud & Infrastructure", icon: "CloudIcon", order: 3 },
        { name: "Databases", icon: "CircleStackIcon", order: 4 },
        { name: "AI & Machine Learning", icon: "CpuChipIcon", order: 5 },
        { name: "Languages", icon: "LanguageIcon", order: 6 },
      ])
      .returning();

  await db.insert(skills).values([
    // Programming Languages
    { categoryId: langCat.id, name: "Python", order: 1 },
    { categoryId: langCat.id, name: "JavaScript", order: 2 },
    { categoryId: langCat.id, name: "TypeScript", order: 3 },
    { categoryId: langCat.id, name: "PHP", order: 4 },
    { categoryId: langCat.id, name: "Dart (Flutter)", order: 5 },
    { categoryId: langCat.id, name: "C#", order: 6 },
    { categoryId: langCat.id, name: "SQL", order: 7 },
    { categoryId: langCat.id, name: "HTML", order: 8 },
    { categoryId: langCat.id, name: "CSS", order: 9 },

    // Frameworks & Libraries
    { categoryId: frameworkCat.id, name: "Next.js", order: 1 },
    { categoryId: frameworkCat.id, name: "NestJS", order: 2 },
    { categoryId: frameworkCat.id, name: "Laravel", order: 3 },
    { categoryId: frameworkCat.id, name: "LangChain", order: 4 },
    { categoryId: frameworkCat.id, name: "Unity", order: 5 },
    { categoryId: frameworkCat.id, name: "Flutter", order: 6 },
    { categoryId: frameworkCat.id, name: "React", order: 7 },
    { categoryId: frameworkCat.id, name: "Prisma ORM", order: 8 },
    { categoryId: frameworkCat.id, name: "Socket.io", order: 9 },
    { categoryId: frameworkCat.id, name: "Zustand", order: 10 },
    { categoryId: frameworkCat.id, name: "Tailwind CSS", order: 11 },
    { categoryId: frameworkCat.id, name: "Framer Motion", order: 12 },
    { categoryId: frameworkCat.id, name: "FastAPI", order: 13 },

    // Cloud & Infrastructure
    { categoryId: cloudCat.id, name: "Google Cloud Platform", order: 1 },
    { categoryId: cloudCat.id, name: "Microsoft Azure", order: 2 },
    { categoryId: cloudCat.id, name: "Amazon Web Services", order: 3 },
    { categoryId: cloudCat.id, name: "Alibaba Cloud", order: 4 },
    { categoryId: cloudCat.id, name: "Vercel", order: 5 },
    { categoryId: cloudCat.id, name: "Railway", order: 6 },
    { categoryId: cloudCat.id, name: "Supabase", order: 7 },
    { categoryId: cloudCat.id, name: "Firebase", order: 8 },
    { categoryId: cloudCat.id, name: "Docker", order: 9 },
    { categoryId: cloudCat.id, name: "CI/CD (GitHub Actions)", order: 10 },
    { categoryId: cloudCat.id, name: "AMD ROCm", order: 11 },
    { categoryId: cloudCat.id, name: "Hugging Face Spaces", order: 12 },
    { categoryId: cloudCat.id, name: "Wazuh (SIEM)", order: 13 },

    // Databases
    { categoryId: dbCat.id, name: "PostgreSQL", order: 1 },
    { categoryId: dbCat.id, name: "MongoDB", order: 2 },
    { categoryId: dbCat.id, name: "Redis", order: 3 },
    { categoryId: dbCat.id, name: "MySQL", order: 4 },
    { categoryId: dbCat.id, name: "Azure Cosmos DB", order: 5 },

    // AI & Machine Learning
    { categoryId: aiCat.id, name: "LangChain", order: 1 },
    { categoryId: aiCat.id, name: "Google Gemini API", order: 2 },
    { categoryId: aiCat.id, name: "Azure OpenAI", order: 3 },
    { categoryId: aiCat.id, name: "IBM Granite", order: 4 },
    { categoryId: aiCat.id, name: "TensorFlow Lite", order: 5 },
    { categoryId: aiCat.id, name: "GhostFaceNet", order: 6 },
    { categoryId: aiCat.id, name: "pgvector", order: 7 },
    { categoryId: aiCat.id, name: "ChromaDB", order: 8 },
    { categoryId: aiCat.id, name: "vLLM", order: 9 },
    { categoryId: aiCat.id, name: "Generative AI", order: 10 },
    { categoryId: aiCat.id, name: "Prompt Engineering", order: 11 },
    { categoryId: aiCat.id, name: "Multi-Agent Systems", order: 12 },
    { categoryId: aiCat.id, name: "RAG (Retrieval-Augmented Generation)", order: 13 },
    { categoryId: aiCat.id, name: "MITRE ATT&CK Framework", order: 14 },

    // Languages
    { categoryId: langSpokenCat.id, name: "Indonesian (Native or Bilingual)", order: 1 },
    { categoryId: langSpokenCat.id, name: "English (Professional Working, TOEFL 597)", order: 2 },
  ]);

  // ============================================================
  // CERTIFICATIONS
  // ============================================================
  await db.insert(certifications).values([
    {
      name: "Cybersecurity",
      issuer: "ADBI Institute (Asian Development Bank Institute)",
      credentialId: "174806-177-886-2663",
      issueDate: "May 2026",
      verifyUrl: "https://elearning-adbi.org/certificate-verifier",
      order: 1,
    },
    {
      name: "AI and Machine Learning Specialist, Talent Class Batch 18",
      issuer: "Kementerian Ketenagakerjaan Republik Indonesia",
      credentialId: "B-1/1436/PK.00/VII/2025",
      issueDate: "Jul 2025",
      order: 2,
    },
    {
      name: "MikroTik Certified Network Associate (MTCNA)",
      issuer: "MikroTik",
      credentialId: "2506NA7259",
      issueDate: "Jun 2025",
      expiryDate: "Jun 2028",
      order: 3,
    },
    {
      name: "Data Classification and Summarization Using IBM Granite",
      issuer: "IBM",
      issueDate: "Jun 2025",
      order: 4,
    },
    {
      name: "Alibaba Cloud Model Studio and Qwen (Talent Scouting Academy)",
      issuer: "Digital Talent Scholarship",
      credentialId: "20010199840-686",
      issueDate: "May 2025",
      order: 5,
    },
    {
      name: "Alibaba Cloud Certified Associate, Cloud Computing",
      issuer: "Alibaba Cloud",
      credentialId: "IACA01241100178303L",
      issueDate: "Nov 2024",
      expiryDate: "Nov 2026",
      order: 6,
    },
    {
      name: "CertNexus IoTBIZ Basic Level International Competency Certification",
      issuer: "CertNexus",
      issueDate: "Jul 2024",
      expiryDate: "Jul 2027",
      order: 7,
    },
    {
      name: "Google Cloud Skills Boost — Multiple Badges",
      issuer: "Google Cloud",
      issueDate: "Aug 2024",
      expiryDate: "Feb 2025",
      order: 8,
    },
    {
      name: "AWS Cloud Practitioner Essentials",
      issuer: "Dicoding Indonesia",
      credentialId: "1OP8WJ211XQK",
      issueDate: "Jun 2024",
      expiryDate: "Jun 2027",
      order: 9,
    },
    {
      name: "Top 10% AI4IMPACT Career Scholarship 5.0, AI Developer Track",
      issuer: "AI4IMPACT by Terra AI",
      issueDate: "Aug 2024",
      expiryDate: "Aug 2025",
      order: 10,
    },
  ]);

  // ============================================================
  // AWARDS
  // ============================================================
  await db.insert(awards).values([
    {
      title: "Google Student Ambassador, Class of 2025",
      issuer: "Google",
      date: "Feb 2026",
      description: "Selected from 12,000 national applicants to serve as Google Student Ambassador for Universitas Negeri Padang.",
      order: 1,
    },
    {
      title: "Official Recognition for KATUMBA PAUD",
      issuer: "Mayor of Bukittinggi City",
      date: "Nov 2025",
      description: "Officially recognized for contributing to the development and successful implementation of the KATUMBA PAUD early childhood growth monitoring application.",
      order: 2,
    },
    {
      title: "ASEAN Delegate, Young ASEAN Islamic Future Leader Summit (YAIFLS) 2025",
      issuer: "YAIFLS",
      date: "Aug 2025",
      description: "Competitively selected as ASEAN Delegate at YAIFLS 2025 held in Terengganu, Malaysia.",
      order: 3,
    },
    {
      title: "Bronze Medal, International Innovation and Design Expo (iIDEX 2025)",
      issuer: "Universiti Teknikal Malaysia Melaka (UTeM)",
      date: "Apr 2025",
      description: "Awarded Bronze Medal for the project AI-Powered Industrial Monitoring and Control System.",
      order: 4,
    },
    {
      title: "Bank Indonesia Scholarship Awardee",
      issuer: "Bank Indonesia",
      date: "Oct 2024",
      order: 5,
    },
    {
      title: "Top 10% National Rank, AI4IMPACT Career Scholarship 5.0",
      issuer: "AI4IMPACT by Terra AI",
      date: "Aug 2024",
      description: "Ranked in the top 10% out of 2,000 national applicants, completing the program with an AI-powered chatbot as the final project deliverable.",
      order: 6,
    },
    {
      title: "Silver Medalist, High School Olympiad (ILTI)",
      issuer: "ILTI",
      date: "Feb 2023",
      description: "Awarded silver medal equivalent to 2nd place in the numerical and mathematics category at international level.",
      order: 7,
    },
  ]);

  // ============================================================
  // VOLUNTEER ACTIVITIES
  // ============================================================
  await db.insert(volunteerActivities).values([
    {
      organization: "NASA Space Apps Challenge",
      role: "Community Engagement Officer",
      startDate: "Oct 2025",
      endDate: "Oct 2025",
      description: "Managed social media visibility and community engagement for the NASA Space Apps Challenge event.",
      order: 1,
    },
    {
      organization: "ParaNovo at NovoClub Batch 3, ParagonCorp",
      role: "Participant",
      startDate: "Mar 2024",
      endDate: "Feb 2025",
      description: "Contributed to collaborative innovation projects promoting social impact in education, health, women empowerment, and environmental initiatives.",
      order: 2,
    },
  ]);

  console.log("✅ Seed selesai!");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
