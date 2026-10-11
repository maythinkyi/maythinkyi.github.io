// All portfolio copy lives here. Everything is placeholder text: replace it with your own.

export const site = {
  name: "May Thin Kyi",
  logoText: "May Thin Kyi",
  year: 2026,
  email: "maythinkyi2003@gmail.com",
  location: "Yangon, Myanmar",
  navLinks: [
    { label: "about", href: "/#about" },
    { label: "skills", href: "/#services" },
    { label: "work", href: "/#work" },
    { label: "contact", href: "/#contact" },
  ],
  ctaLabel: "get in touch",
};

export const hero = {
  badge: "Software Engineer · 2+ years of experience",
  headline: ["Building Software", "and Keep Learning"],
  intro:
    "Associate Software Engineer focused on building efficient and scalable software. Every project is a chance to learn, and I work with JavaScript, Go and Python ecosystems, and system integration through Apache Kafka, RabbitMQ and Redis.",
};

export const manifesto =
  "From requirements to release, follow the full Software Development Lifecycle. Plan the design, build and test each component, contribute to SIT, QA, Staging and Production environments.";

export const services: {
  title: string;
  tags: string[];
  variant: "light" | "dark";
}[] = [
  {
    title: "Frontend Development",
    tags: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "API Integration"],
    variant: "light",
  },
  {
    title: "Backend Engineering",
    tags: ["Node.js", "Go", "Python", "Concurrency Patterns", "System Integration"],
    variant: "light",
  },
  {
    title: "Asynchronous Communication & Event Streaming",
    tags: ["Apache Kafka", "RabbitMQ", "Webhooks", "Background Jobs"],
    variant: "light",
  },
  {
    title: "Database Engineering",
    tags: ["MySQL", "MongoDB", "Redis", "Schema Design", "ACID Transaction", "Replication"],
    variant: "light",
  },
];

export const industries = {
  description:
    "Systems I have built at my work, including operation support portal, ticketing platform and battery management system.",
  list: ["Operation Support Portal", "Telecom/ISP OSS Systems", "Ticketing System", "Battery Management System"],
};

export const stats = [
  { value: 2, suffix: "+", label: "years of experience" },
  { value: 4, suffix: "+", label: "projects delivered" },
  { value: 1, suffix: "", label: "industries covered" },
];

export const testimonials = [
  {
    quote: "Placeholder testimonial. Replace it with a real quote from a client about the work you did together.",
    name: "Client Name",
    role: "CEO",
    company: "Company A",
  },
  {
    quote: "Placeholder testimonial. Describe the outcome and what made working together easy.",
    name: "Client Name",
    role: "CTO",
    company: "Company B",
  },
  {
    quote: "Placeholder testimonial. Keep it short and specific to the result.",
    name: "Client Name",
    role: "Founder",
    company: "Company C",
  },
  {
    quote: "Placeholder testimonial. Mention the product and how the new design changed daily use.",
    name: "Client Name",
    role: "Co-Founder",
    company: "Company D",
  },
  {
    quote: "Placeholder testimonial. Mention the team process and the results it delivered.",
    name: "Client Name",
    role: "Product Lead",
    company: "Company E",
  },
];

export const work = [
  {
    slug: "operation-support-portal",
    title: "Operation Support Portal",
    subtitle: "Telecom/ISP OSS System",
    tone: "from-emerald-900 to-emerald-600",
    tags: ["Python", "Web2py", "FastAPI", "RabbitMQ", "MongoDB"],
    industries: ["Telecom/ISP OSS System"],
    description:
      "SBS Network Device Controllers Inventory System. It keeps track of pole locations, the devices installed on each pole, and the current status of each device.",
    outcome:
      "Centralized place to see where every pole is located, what devices are installed on it, and whether each device is operating as expected.",
  },
  {
    slug: "ticketing-system",
    title: "Ticketing System",
    subtitle: "Telecom/ISP OSS System",
    tone: "from-indigo-900 to-violet-600",
    tags: ["React", "Go", "REST APIs", "Apache Kafka", "Redis", "MySQL"],
    industries: ["Telecom/ISP OSS System"],
    description:
      "A ticketing system used by both technical and non-technical departments at a Telecom/ISP company, for tracking requests and issues from start to resolution.",
    outcome:
      "A ticketing platform for technical and non-technical departments at a Telecom/ISP company, extended with custom features and an automation workflow decision engine that routes each ticket to the right action.",
  },
];

export const footer = {
  address: ["Yangon, Myanmar"],
  phone: "(+95) 944 899 8082",
  emails: ["maythinkyi2003@gmail.com", "maythin.kyi@frontiir.net"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/may-thin-kyi-023b861b6/" },
    { label: "GitHub", href: "https://github.com/maythinkyi" },
  ],
};
