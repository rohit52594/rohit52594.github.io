/**
 * Portfolio content from Rohit_Senior_Software_Engineer.pdf
 */
export const profile = {
  name: 'Rohit Sahu',
  title: 'Senior Software Engineer',
  location: 'Hyderabad, India',
  email: 'rohitsahu728@gmail.com',
  phone: '+91 84020-81401',
  website: 'https://rohit52594.github.io',
  resumeUrl: '/Rohit_Senior_Software_Engineer.pdf',
  summary:
    'Senior Software Engineer with 7 years of experience building scalable enterprise and AI-driven applications using React.js, TypeScript, and Node.js. Experienced in enterprise POS systems, healthcare platforms, legacy modernization, and distributed architectures. Strong expertise in frontend engineering, performance optimization, scalable application design, and AI-assisted development workflows. Experienced leading teams, delivering production-grade solutions, and collaborating across cross-functional environments in agile development ecosystems.',
  social: {
    github: 'https://github.com/rohit52594',
    linkedin: 'https://www.linkedin.com/in/rtsu/',
  },
};

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Manipal University, Jaipur',
    year: '2024',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Nazira College',
    year: '2018',
  },
];

export const certifications = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI',
  },
];

export const skillCategories = [
  {
    name: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java'],
  },
  {
    name: 'Frontend',
    skills: ['React.js', 'Vue.js', 'Next.js', 'Redux', 'Material UI', 'CSS'],
  },
  {
    name: 'Backend & Database',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    name: 'Cloud & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'JIRA', 'Agile Practices', 'Scrum', 'Performance Optimization'],
  },
  {
    name: 'AI-Assisted Development',
    skills: ['GitHub Copilot', 'Claude', 'Copilot CLI', 'Cursor', 'Antigravity'],
  },
  {
    name: 'Domain Expertise',
    skills: ['System Design', 'POS', 'Healthcare', 'Retail', 'Legacy Modernization'],
  },
];

export const experience = [
  {
    id: 'ncr-voyix',
    company: 'NCR Voyix',
    role: 'Senior Software Engineer',
    period: 'Mar 2025 — Present',
    highlights: [
      'Contributing to modernization of enterprise POS systems used in large-scale retail environments.',
      'Migrating legacy UI and API systems into scalable modern architectures using AI-assisted development systems.',
      'Working with React.js, TypeScript, Docker, and Kubernetes in enterprise-grade distributed environments.',
      'Analyzing and debugging complex production issues across integrated POS ecosystems.',
      'Collaborating with cross-functional teams on transaction workflows, peripheral integrations, and operational systems.',
      'Improving development efficiency using GitHub Copilot and Claude for migration and development workflows.',
    ],
    tech: ['React.js', 'TypeScript', 'Vue.js', 'Docker', 'Kubernetes', 'MySQL', 'GitHub Copilot', 'POS Systems'],
  },
  {
    id: 'thinkhat',
    company: 'Thinkhat Software',
    role: 'Senior Software Engineer',
    period: 'Dec 2022 — Feb 2025',
    highlights: [
      'Led a team of 8 in building scalable AI-driven healthcare application features in agile environments.',
      'Delivered scalable healthcare application features for production by collaborating with distributed teams across critical modules.',
      'Developed reusable, performance-optimized modules for patient and clinical workflows using React.js and TypeScript.',
      'Improved development through structured code reviews and agile practices for better collaboration and delivery quality.',
      'Worked closely with product, backend, and QA teams to ensure smooth delivery of production-ready features.',
    ],
    tech: ['React.js', 'TypeScript', 'Redux', 'Node.js', 'Healthcare Systems', 'FHIR'],
  },
  {
    id: 'infistack',
    company: 'Infistack',
    role: 'Software Consultant',
    period: 'Mar 2022 — Dec 2022',
    highlights: [
      'Delivered scalable ERP UI supporting complex industrial business operations for a Finland-based client.',
      'Collaborated directly with clients to gather requirements and deliver production-ready solutions.',
      'Participated in requirement analysis, solution planning, and application delivery.',
    ],
    tech: ['React.js', 'JavaScript', 'ERP Systems', 'Client Communication'],
  },
  {
    id: 'soffront',
    company: 'Soffront Corporation',
    role: 'Software Engineer',
    period: 'Sep 2021 — Mar 2022',
    highlights: [
      'Supported development and maintenance of enterprise systems with complex business logic and application flows.',
      'Assisted in debugging, optimization, and maintenance of complex application modules.',
    ],
    tech: ['React.js', 'JavaScript', 'Enterprise Systems'],
  },
  {
    id: 'otechnonix',
    company: 'Otechnonix India Pvt. Ltd.',
    role: 'Software Developer',
    period: 'Apr 2019 — Aug 2021',
    highlights: [
      'Contributed to frontend and backend development for production-grade business applications and deployments.',
      'Worked on end-to-end web application development and deployment.',
    ],
    tech: ['React.js', 'Node.js', 'MySQL', 'AWS'],
  },
];

export const projects = [
  {
    id: 'nvpos',
    title: 'MEX — nvPOS',
    company: 'NCR Voyix',
    subtitle: 'Retail Enterprise Solutions',
    description:
      'Contributed to modernization of enterprise POS systems across retail environments, improving maintainability and reducing migration effort through AI-powered migration workflows. Enhanced legacy POS modules in production while supporting scalable modernization initiatives.',
    tags: ['React.js', 'TypeScript', 'Vue.js', 'Docker', 'POS', 'Legacy Modernization'],
  },
  {
    id: 'noki-ai',
    title: 'Noki AI',
    company: 'Thinkhat Software',
    subtitle: 'AI Healthcare Platform',
    description:
      'Delivered an AI-powered healthcare platform designed to support doctors and patients with intelligent workflows. Built a scalable application focused on improving usability, performance, and AI-driven features.',
    tags: ['React.js', 'TypeScript', 'Redux', 'Healthcare', 'AI'],
  },
  {
    id: 'betonipumppaus',
    title: 'Betonipumppaus ERP',
    company: 'Infistack',
    subtitle: 'Industrial ERP System',
    description:
      'Developed a client-focused ERP system for an industrial business with complex operational workflows. Built an enterprise application based on client requirements and business processes for a Finland-based client.',
    tags: ['React.js', 'JavaScript', 'ERP', 'Enterprise'],
  },
];

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
