export type CourseLevel = "Undergraduate" | "Postgraduate";
export type Campus = "Mumbai" | "Chennai";

export interface CourseUnit { code: string; name: string; points: number }
export interface CourseYear { year: string; heading: string; units: CourseUnit[] }

export interface Course {
  slug: string;
  name: string;
  degree: string;
  level: CourseLevel;
  campuses: Campus[];
  duration: string;
  code: string;
  category: string;
  tagline: string;
  overview: string;
  about: string;
  why: string;
  learn: string[];
  careers: string[];
  quickFacts: { label: string; value: string }[];
  structure: CourseYear[];
  fees: { label: string; value: string }[];
  prerequisites: string;
  admissions: { qualification: string; requirement: string }[];
}

const genericYearNote = "Course structure is indicative and subject to change as part of ongoing course review and refinement.";

// Shared CS/Data year units (from the source document)
const csYear1: CourseUnit[] = [
  { code: "BUSQ1104", name: "Business Communication for Change, Influence and Impact", points: 6 },
  { code: "CITQ1003", name: "Introduction to Cybersecurity", points: 6 },
  { code: "CITQ1401", name: "Computational Thinking with Python", points: 6 },
  { code: "ECOQ1101", name: "Microeconomics: Prices and Markets", points: 6 },
  { code: "CITQ1402", name: "Relational Database Management Systems", points: 6 },
  { code: "ECOQ1102", name: "Macroeconomics: Money and Finance", points: 6 },
  { code: "PHIQ1001", name: "Ethics for the Digital Age", points: 6 },
  { code: "STAQ1400", name: "Statistics for Science", points: 6 },
];
const csYear2: CourseUnit[] = [
  { code: "CITQ2002", name: "Systems Programming", points: 6 },
  { code: "CITQ2200", name: "Data Structures and Algorithms", points: 6 },
  { code: "ECOQ2233", name: "Microeconomics: Policy and Applications", points: 6 },
  { code: "STAQ2401", name: "Analysis of Experiments", points: 6 },
  { code: "CITQ2005", name: "Object Oriented Programming", points: 6 },
  { code: "CITQ2211", name: "Discrete Structures", points: 6 },
  { code: "CITQ2402", name: "Introduction to Data Science", points: 6 },
  { code: "STAQ2402", name: "Analysis of Observations", points: 6 },
];
const csYear3: CourseUnit[] = [
  { code: "CITQ3001", name: "Advanced Algorithms", points: 6 },
  { code: "CITQ3002", name: "Computer Networks", points: 6 },
  { code: "CITQ3401", name: "Data Warehousing", points: 6 },
  { code: "CITQ3403", name: "Agile Web Development", points: 6 },
  { code: "CITQ3011", name: "Intelligent Agents", points: 6 },
  { code: "CITQ3200", name: "Professional Computing", points: 6 },
  { code: "STAQ3064", name: "Statistical Learning", points: 6 },
  { code: "STAQ3405", name: "Introduction to Bayesian Computing and Statistics", points: 6 },
];

const commonAdmissions = [
  { qualification: "ATAR (Australian Tertiary Admission Rank)", requirement: "70" },
  { qualification: "CBSE (aggregate of best 4 subjects)", requirement: "A1=5.0 · A2=4.5 · B1=3.5 · B2=3.0 · C1=2.0 · C2=1.5 · D1=1.0 · D2=0.5 · Aggregate 9" },
  { qualification: "ISC (average of best 4 subjects)", requirement: "60" },
  { qualification: "A-Levels (best 3, excl. General Studies)", requirement: "7 · CDD (A*=6 · A=5 · B=4 · C=3 · D=2 · E=1)" },
  { qualification: "IB", requirement: "24" },
];

const commonFees = [
  { label: "Domestic Student Fee (indicative, first year 2026)", value: "₹14,52,200" },
  { label: "International Student Fee (indicative, first year 2026)", value: "₹16,69,800" },
];

const structure3Yr = (y1: CourseUnit[], y2: CourseUnit[], y3: CourseUnit[]): CourseYear[] => [
  { year: "Year 1", heading: "Core — 48 points", units: y1 },
  { year: "Year 2", heading: "Core — 48 points", units: y2 },
  { year: "Year 3", heading: "Core — 48 points", units: y3 },
];

export const courses: Course[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    degree: "Bachelor of Science (Computer Science)",
    level: "Undergraduate",
    campuses: ["Chennai", "Mumbai"],
    duration: "3 Years · Full-time",
    code: "BPQ02",
    category: "Technology",
    tagline: "Shape the future of computing.",
    overview:
      "The Bachelor of Science teaches understanding, reasoning and improving the natural world through systematic observation, experimentation, modelling and calculation. A quality education in science from UWA equips students with attributes highly valued by employers around the globe, and the skills to make a real contribution to the global challenges facing humanity.",
    about:
      "Students will complete majors in Data Science and Computer Science. The degree develops critical evaluation of data and information, application of discipline-specific knowledge and theory, collaboration skills, competency in scientific tools, flexible problem-solving approaches, and ethical engagement with diverse communities.",
    why:
      "Want to shape the future of computing? This major provides the foundations of programming, systems and software engineering, along with the theory and algorithms behind them. You'll learn to design advanced technologies and develop innovative solutions for real-world challenges.",
    learn: [
      "Build real-world software using widely used languages like C, Java and Python",
      "Master software engineering principles, from problem decomposition to designing and implementing object-oriented solutions in Java",
      "Design and manage databases, creating schemas and using query languages to access, sort and join data",
      "Understand and implement core data structures and algorithms that power modern computing solutions",
    ],
    careers: ["Applications Developer", "Database Administrator", "IT Consultant"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026 · Chennai — Sem 2, 1 Mar 2027" },
      { label: "Locations", value: "Chennai, Mumbai" },
      { label: "Course code", value: "BPQ02" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "A scaled score of at least 50 in Mathematics Methods ATAR or equivalent.",
    admissions: commonAdmissions,
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    degree: "Bachelor of Science (Cybersecurity)",
    level: "Undergraduate",
    campuses: ["Mumbai"],
    duration: "3 Years · Full-time",
    code: "BPQ03",
    category: "Technology",
    tagline: "Defend the systems the world runs on.",
    overview:
      "Cybersecurity at UWA combines rigorous computing foundations with the ethics, policy, and applied craft of protecting digital systems, people, and critical infrastructure.",
    about:
      "You will study modern cryptography, secure systems design, network defence and offensive security, alongside a strong grounding in software engineering and data.",
    why: "Every industry now runs on software — and every industry needs people who can secure it. This course builds you into that specialist.",
    learn: [
      "Analyse and defend real-world networks and applications",
      "Apply modern cryptography and secure protocol design",
      "Investigate incidents through digital forensics",
      "Reason about ethics, policy and risk in security engineering",
    ],
    careers: ["Security Engineer", "Penetration Tester", "Security Analyst", "GRC Consultant"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026" },
      { label: "Locations", value: "Mumbai" },
      { label: "Course code", value: "BPQ03" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "A scaled score of at least 50 in Mathematics Methods ATAR or equivalent.",
    admissions: commonAdmissions,
  },
  {
    slug: "data-science",
    name: "Data Science",
    degree: "Bachelor of Science (Data Science)",
    level: "Undergraduate",
    campuses: ["Chennai", "Mumbai"],
    duration: "3 Years · Full-time",
    code: "BPQ04",
    category: "Technology",
    tagline: "Turn data into decisions the world can act on.",
    overview:
      "The Bachelor of Science (Data Science) combines mathematics, statistics and computing to help you extract insight from data at scale.",
    about: "You will complete majors in Data Science with strong exposure to computer science, statistics and applied analytics.",
    why: "Organisations everywhere need people who can move fluently between data, code and decision-making. This is that degree.",
    learn: [
      "Build data pipelines and warehouses that scale",
      "Apply statistical learning and Bayesian methods",
      "Communicate findings clearly to executives and engineers",
      "Deploy responsible, ethical AI systems",
    ],
    careers: ["Data Scientist", "Analytics Engineer", "ML Engineer", "Insights Consultant"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026 · Chennai — Sem 2, 1 Mar 2027" },
      { label: "Locations", value: "Chennai, Mumbai" },
      { label: "Course code", value: "BPQ04" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "A scaled score of at least 50 in Mathematics Methods ATAR or equivalent.",
    admissions: commonAdmissions,
  },
  {
    slug: "business-management",
    name: "Business Management",
    degree: "Bachelor of Business (Business Management)",
    level: "Undergraduate",
    campuses: ["Chennai", "Mumbai"],
    duration: "3 Years · Full-time",
    code: "BBM01",
    category: "Business",
    tagline: "Lead the businesses of tomorrow.",
    overview:
      "The Bachelor of Business (Business Management) builds a broad foundation across strategy, operations, marketing, finance and people leadership.",
    about: "You will develop the analytical and interpersonal skills to move teams, functions and organisations forward.",
    why: "Modern management is part strategy, part communication, part data. This degree develops all three.",
    learn: [
      "Lead cross-functional teams and projects",
      "Make evidence-based strategic decisions",
      "Communicate for influence and impact",
      "Understand global markets and operations",
    ],
    careers: ["Management Consultant", "Product Manager", "Operations Lead", "Founder"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026 · Chennai — Sem 2, 1 Mar 2027" },
      { label: "Locations", value: "Chennai, Mumbai" },
      { label: "Course code", value: "BBM01" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "No specific prerequisite subject. English proficiency required.",
    admissions: commonAdmissions,
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    degree: "Bachelor of Advanced Computer Science",
    level: "Undergraduate",
    campuses: ["Chennai", "Mumbai"],
    duration: "3 Years · Full-time",
    code: "BACS1",
    category: "Technology",
    tagline: "Build the intelligent systems of the next decade.",
    overview:
      "The Bachelor of Advanced Computer Science with an AI focus takes you deep into machine learning, agents, and modern applied AI.",
    about: "You will study the algorithmic and systems foundations of AI alongside the ethics of deploying it responsibly.",
    why: "AI is reshaping every industry. This course prepares you to build it, not just use it.",
    learn: [
      "Design and train modern machine learning models",
      "Build intelligent agents and reasoning systems",
      "Reason about AI safety, ethics and policy",
      "Ship AI systems into production",
    ],
    careers: ["ML Engineer", "AI Researcher", "Applied Scientist", "AI Product Manager"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026 · Chennai — Sem 2, 1 Mar 2027" },
      { label: "Locations", value: "Chennai, Mumbai" },
      { label: "Course code", value: "BACS1" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "A scaled score of at least 50 in Mathematics Methods ATAR or equivalent.",
    admissions: commonAdmissions,
  },
  {
    slug: "global-business",
    name: "Global Business",
    degree: "Bachelor of Business (Global Business)",
    level: "Undergraduate",
    campuses: ["Mumbai"],
    duration: "3 Years · Full-time",
    code: "BGB01",
    category: "Business",
    tagline: "Do business across borders.",
    overview: "Study international trade, cross-border strategy, and the economics of a connected Indo-Pacific.",
    about: "You will graduate ready to work across markets, currencies, cultures and regulatory environments.",
    why: "The Indo-Pacific is the world's fastest growing economic region — this degree puts you in the middle of it.",
    learn: [
      "Analyse international markets and trade policy",
      "Manage global supply chains and operations",
      "Lead across cultures and time-zones",
      "Structure cross-border deals",
    ],
    careers: ["Trade Analyst", "International Business Manager", "Strategy Consultant"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026" },
      { label: "Locations", value: "Mumbai" },
      { label: "Course code", value: "BGB01" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "No specific prerequisite subject. English proficiency required.",
    admissions: commonAdmissions,
  },
  {
    slug: "enterprise-innovation",
    name: "Enterprise and Innovation",
    degree: "Bachelor of Business (Enterprise and Innovation)",
    level: "Undergraduate",
    campuses: ["Mumbai"],
    duration: "3 Years · Full-time",
    code: "BEI01",
    category: "Business",
    tagline: "Build ventures. Ship ideas. Scale impact.",
    overview: "Combine business fundamentals with venture design, product thinking and applied innovation.",
    about: "You will graduate ready to launch, join or transform ventures inside modern organisations.",
    why: "The best businesses of the next decade are being built now. Learn how to build them.",
    learn: [
      "Design and validate new ventures",
      "Build a founder's toolkit — product, finance, fundraising",
      "Run innovation programmes inside large organisations",
      "Ship products people actually use",
    ],
    careers: ["Founder", "Venture Analyst", "Product Manager", "Innovation Lead"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026" },
      { label: "Locations", value: "Mumbai" },
      { label: "Course code", value: "BEI01" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "No specific prerequisite subject. English proficiency required.",
    admissions: commonAdmissions,
  },
  {
    slug: "economics",
    name: "Economics",
    degree: "Bachelor of Economics",
    level: "Undergraduate",
    campuses: ["Chennai", "Mumbai"],
    duration: "3 Years · Full-time",
    code: "BEC01",
    category: "Business",
    tagline: "See the systems that shape the world.",
    overview: "Study economic theory alongside data, policy and history to understand how markets, institutions and people interact.",
    about: "The Bachelor of Economics gives you rigorous analytical skills applicable across finance, policy, tech and consulting.",
    why: "Great economists are in demand everywhere the numbers matter — which is everywhere.",
    learn: [
      "Build formal micro and macro models",
      "Analyse policy and market design",
      "Work with economic data and code",
      "Communicate rigorous ideas simply",
    ],
    careers: ["Economist", "Policy Analyst", "Quant Analyst", "Strategy Consultant"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Undergraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Course credit points", value: "144" },
      { label: "Starting dates", value: "Mumbai — Sem 1, 7 Sep 2026 · Chennai — Sem 2, 1 Mar 2027" },
      { label: "Locations", value: "Chennai, Mumbai" },
      { label: "Course code", value: "BEC01" },
      { label: "Duration", value: "3 years" },
    ],
    structure: structure3Yr(csYear1, csYear2, csYear3),
    fees: commonFees,
    prerequisites: "A scaled score of at least 50 in Mathematics Methods ATAR or equivalent.",
    admissions: commonAdmissions,
  },
  {
    slug: "mba",
    name: "Master of Business Administration",
    degree: "Master of Business Administration",
    level: "Postgraduate",
    campuses: ["Mumbai", "Chennai"],
    duration: "2 Years · Full-time",
    code: "MBA01",
    category: "Business",
    tagline: "The Group of Eight MBA — delivered in India.",
    overview: "A globally recognised MBA that combines classical management foundations with modern practice in data, strategy, leadership and entrepreneurship.",
    about: "Designed for high-potential professionals, the UWA India MBA blends case-based learning with live industry projects across Mumbai and Chennai.",
    why: "Accelerate into senior roles with a globally ranked qualification, delivered close to home and connected to a 150,000+ strong alumni network.",
    learn: [
      "Lead complex organisations and functions",
      "Make sharp, evidence-based strategic calls",
      "Read and shape financial performance",
      "Drive innovation and change",
    ],
    careers: ["Senior Manager", "Consultant", "Founder / GM", "P&L Owner"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Postgraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Starting dates", value: "September 2026" },
      { label: "Locations", value: "Mumbai, Chennai" },
      { label: "Course code", value: "MBA01" },
      { label: "Duration", value: "2 years" },
    ],
    structure: [
      { year: "Year 1", heading: "Foundations", units: [
        { code: "MBA6101", name: "Managerial Economics", points: 6 },
        { code: "MBA6102", name: "Financial Accounting for Managers", points: 6 },
        { code: "MBA6103", name: "Marketing Strategy", points: 6 },
        { code: "MBA6104", name: "People, Leadership & Organisations", points: 6 },
      ]},
      { year: "Year 2", heading: "Applied Strategy", units: [
        { code: "MBA6201", name: "Strategic Management", points: 6 },
        { code: "MBA6202", name: "Data for Decision Making", points: 6 },
        { code: "MBA6203", name: "Global Business & the Indo-Pacific", points: 6 },
        { code: "MBA6204", name: "Capstone Consulting Project", points: 6 },
      ]},
    ],
    fees: commonFees,
    prerequisites: "A recognised bachelor's degree. Work experience preferred.",
    admissions: commonAdmissions,
  },
  {
    slug: "master-information-technology",
    name: "Master of Information Technology",
    degree: "Master of Information Technology",
    level: "Postgraduate",
    campuses: ["Mumbai", "Chennai"],
    duration: "2 Years · Full-time",
    code: "MIT01",
    category: "Technology",
    tagline: "Become a technology leader.",
    overview: "A postgraduate degree that develops technical depth in software, data and AI alongside the leadership skills to run technology teams.",
    about: "Ideal for professionals moving into or accelerating within technology functions.",
    why: "Bridge the gap between deep technical practice and executive technology leadership.",
    learn: [
      "Architect modern software systems",
      "Lead AI, data and product engineering teams",
      "Design secure, scalable platforms",
      "Deliver technology strategy",
    ],
    careers: ["Engineering Manager", "Head of Data", "CTO Track", "Solutions Architect"],
    quickFacts: [
      { label: "Status", value: "Available" },
      { label: "Level of study", value: "Postgraduate" },
      { label: "Attendance", value: "Full-time" },
      { label: "Starting dates", value: "September 2026" },
      { label: "Locations", value: "Mumbai, Chennai" },
      { label: "Course code", value: "MIT01" },
      { label: "Duration", value: "2 years" },
    ],
    structure: [
      { year: "Year 1", heading: "Core", units: [
        { code: "MIT6101", name: "Software Architecture", points: 6 },
        { code: "MIT6102", name: "Modern Data Engineering", points: 6 },
        { code: "MIT6103", name: "Applied Machine Learning", points: 6 },
        { code: "MIT6104", name: "Cloud & Distributed Systems", points: 6 },
      ]},
      { year: "Year 2", heading: "Advanced & Capstone", units: [
        { code: "MIT6201", name: "AI Systems & MLOps", points: 6 },
        { code: "MIT6202", name: "Security by Design", points: 6 },
        { code: "MIT6203", name: "Leading Technology Teams", points: 6 },
        { code: "MIT6204", name: "Capstone Industry Project", points: 6 },
      ]},
    ],
    fees: commonFees,
    prerequisites: "A recognised bachelor's degree in computing or a cognate discipline.",
    admissions: commonAdmissions,
  },
];

export const structureNote = genericYearNote;

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
