// Personal Information - SEO Optimized
export const personalInfo = {
  name: "Md. Shariar Hosain Sanny",
  title: "Senior Backend Developer & Node.js Expert",
  tagline: "Full-Stack Backend Developer specializing in Node.js, Express.js, NestJS, MongoDB, PostgreSQL, and Microservices Architecture. Building scalable APIs and distributed systems in Dhaka, Bangladesh.",
  shortTagline: "Backend Developer | Node.js | Express.js | NestJS | MongoDB | PostgreSQL | Microservices",
  description: "Experienced Backend Developer with expertise in Node.js, Express.js, NestJS, Prisma ORM, MongoDB, PostgreSQL, Redis, RabbitMQ, and RESTful API development. Specialized in building scalable microservices architecture and real-time applications.",
  keywords: "Backend Developer, Node.js Developer, Express.js, NestJS, MongoDB, PostgreSQL, Prisma, Redis, RabbitMQ, Microservices, API Development, Bangladesh Developer, Dhaka Developer",
  email: "shariarhosain131529@gmail.com",
  phone: "+880-1757525035",
  location: "Dhaka, Bangladesh",
  fullLocation: "North Kafrul, Kachukhat, Dhaka, Bangladesh",
  github: "https://github.com/Shariarhosain",
  linkedin: "https://www.linkedin.com/in/shariar-hosain-sanny",
  website: window.location.origin, // Current portfolio URL
  // SEO Meta Information
  seo: {
    metaTitle: "Md. Shariar Hosain Sanny - Senior Backend Developer | Node.js Expert | Dhaka, Bangladesh",
    metaDescription: "Experienced Backend Developer specializing in Node.js, Express.js, NestJS, MongoDB, PostgreSQL, and Microservices. Building scalable APIs and distributed systems in Dhaka, Bangladesh.",
    metaKeywords: "Shariar Hosain, Backend Developer, Node.js, Express.js, NestJS, MongoDB, PostgreSQL, Prisma, Redis, RabbitMQ, Microservices, API Development, Bangladesh, Dhaka",
    ogTitle: "Md. Shariar Hosain Sanny - Senior Backend Developer",
    ogDescription: "Backend Developer with expertise in Node.js, Express.js, NestJS, and modern database technologies. Based in Dhaka, Bangladesh.",
    ogType: "profile",
    twitterCard: "summary_large_image"
  }
};

// About Section Data
export const aboutData = {
  description: [
    "As a backend developer, I focus on building efficient, scalable, and reliable applications. I have experience in teaching, problem-solving, and leading a team. I enjoy tackling complex challenges and finding practical solutions.",
    "Currently working as a Backend Developer at MAK Tech Solution, contributing to various projects using Node.js, Express.js, Nest.js, Prisma, Redis, and RabbitMQ. I am dedicated to growing my skills continuously.",
    "My passion for education and helping others motivates me to make a positive impact in a respected organization. I graduated with a GPA of 3.86/4.00 in Computer Science and Engineering from AIUB."
  ],
  features: [
    {
      title: "Scalable Solutions",
      description: "Building efficient microservices and scalable backend architectures"
    },
    {
      title: "Team Leadership",
      description: "Leading development teams and mentoring fellow developers"
    },
    {
      title: "Problem Solving",
      description: "Tackling complex challenges with practical and innovative solutions"
    }
  ]
};

// Projects Data - Resume projects first, then other GitHub projects
export const projectsData = [
  {
    title: "Abyansf Management Mobile App",
    description: "Built microservices for transactional email sending reliably. Developed scalable image upload and optimization servers.",
    technologies: ["Node.js", "Microservices", "Express.js", "Image Processing", "Email Services"],
    image: "/images/Abyansf Management Mobile App.jpg",
    github: "https://github.com/Shariarhosain/abyansf_backend",
    demo: "#",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "BatteryQK Mobile App",
    description: "Implemented Redis-backed translation caching to speed multilingual responses and reduce API calls. Introduced background queue processing for higher throughput.",
    technologies: ["Node.js", "Express.js", "Redis", "Queue Processing", "Multilingual API"],
    image: "/images/BatteryQK-Backend.jpg",
    github: "https://github.com/Shariarhosain/BatteryQK-Backend",
    demo: "#",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Property Finder For Netherlands",
    description: "Built a robust property scraper aggregating and deduplicating external listings. Implemented Redis caching/rate-limiting for faster, reliable responses.",
    technologies: ["Node.js", "Web Scraping", "Redis", "Data Processing", "Rate Limiting"],
    image: "/images/Property Finder For Netherlands.png",
    github: "#",
    demo: "https://huurscanner.nl",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Music Platform - Beatzingeez",
    description: "Added audio metadata extraction using music-metadata and node-ffprobe. Implemented cron-based scheduled publishing and engagement tracking analytics.",
    technologies: ["Node.js", "Audio Processing", "Cron Jobs", "Analytics", "FFmpeg"],
    image: "/images/Beatzingeez.png",
    github: "#",
    demo: "https://beatzingeez.com",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "E-Commerce Platform (NestJS)",
    description: "Full-featured e-commerce application built with NestJS, TypeScript, and modern backend architecture with advanced features.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "JWT", "Prisma"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&q=80",
    github: "https://github.com/Shariarhosain/e-commerce-nestjs",
    demo: "#",
    gradient: "from-red-500 to-orange-500"
  },
  {
    title: "Community-Based Recycling Tracker",
    description: "Innovative citizen engagement platform for community recycling tracking with TypeScript and modern web technologies.",
    technologies: ["TypeScript", "React", "Node.js", "Community Platform"],
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop&q=80",
    github: "https://github.com/Shariarhosain/Community-Based-Recycling-Tracker-citizen",
    demo: "#",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "LAYLS - Dress Rental Platform",
    description: "Multi-vendor dress selling and rental marketplace system with subscription management through Stripe. Advanced e-commerce platform built with modern backend architecture.",
    technologies: ["NestJS", "MongoDB", "Redis", "Stripe", "Multi-vendor System"],
    image: "/images/layls.png",
    github: "#",
    demo: "https://layls.com/",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "TAXILOGUK - Driver Management System",
    description: "Comprehensive driver and council admin management system with document upload, license tracking, and automated notifications before license expiry. Subscription-based SaaS platform.",
    technologies: ["Node.js", "Express.js", "Subscription System", "Document Management", "Notifications"],
    image: "/images/taxiloguk.png",
    github: "#",
    demo: "https://taxiloguk.co.uk/",
    gradient: "from-blue-500 to-indigo-500"
  }
];
