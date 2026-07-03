// Salary / outcomes metadata for course cards & detail pages.
// Values are indicative ranges reflecting typical entry-level outcomes
// for equivalent Australian and Indian graduate destinations.

export type CourseMeta = {
  salaryMin: number; // in ₹ Lakh per annum
  salaryMax: number;
  rating: number; // out of 5
  graduateOutcome: number; // % employed or in further study within 6 months
  topEmployers: string[];
  nextIntake: string;
};

export const courseMeta: Record<string, CourseMeta> = {
  "computer-science": {
    salaryMin: 8, salaryMax: 24, rating: 4.9, graduateOutcome: 95,
    topEmployers: ["Google", "Microsoft", "Atlassian", "Infosys"],
    nextIntake: "Sep 2026",
  },
  "cybersecurity": {
    salaryMin: 9, salaryMax: 26, rating: 4.8, graduateOutcome: 96,
    topEmployers: ["Deloitte", "PwC", "Palo Alto Networks", "TCS"],
    nextIntake: "Sep 2026",
  },
  "data-science": {
    salaryMin: 10, salaryMax: 28, rating: 4.9, graduateOutcome: 97,
    topEmployers: ["Amazon", "Flipkart", "Accenture", "Fractal"],
    nextIntake: "Sep 2026",
  },
  "artificial-intelligence": {
    salaryMin: 12, salaryMax: 32, rating: 4.9, graduateOutcome: 96,
    topEmployers: ["OpenAI Partners", "Google DeepMind", "Nvidia", "Microsoft"],
    nextIntake: "Sep 2026",
  },
  "business-management": {
    salaryMin: 7, salaryMax: 20, rating: 4.7, graduateOutcome: 93,
    topEmployers: ["BCG", "Bain", "Unilever", "Reliance"],
    nextIntake: "Sep 2026",
  },
  "global-business": {
    salaryMin: 7, salaryMax: 22, rating: 4.7, graduateOutcome: 92,
    topEmployers: ["HSBC", "Standard Chartered", "DHL", "Maersk"],
    nextIntake: "Sep 2026",
  },
  "enterprise-innovation": {
    salaryMin: 6, salaryMax: 24, rating: 4.8, graduateOutcome: 90,
    topEmployers: ["Sequoia", "Accel", "Zomato", "Razorpay"],
    nextIntake: "Sep 2026",
  },
  "economics": {
    salaryMin: 8, salaryMax: 22, rating: 4.7, graduateOutcome: 94,
    topEmployers: ["RBI", "World Bank", "McKinsey", "Nomura"],
    nextIntake: "Sep 2026",
  },
  "mba": {
    salaryMin: 18, salaryMax: 45, rating: 4.9, graduateOutcome: 98,
    topEmployers: ["McKinsey", "Goldman Sachs", "Amazon", "Tata Group"],
    nextIntake: "Sep 2026",
  },
  "master-it": {
    salaryMin: 14, salaryMax: 32, rating: 4.8, graduateOutcome: 96,
    topEmployers: ["Microsoft", "Atlassian", "IBM", "Wipro"],
    nextIntake: "Sep 2026",
  },
};

export const defaultMeta: CourseMeta = {
  salaryMin: 8, salaryMax: 22, rating: 4.7, graduateOutcome: 93,
  topEmployers: ["Global consulting", "Tech multinationals", "Financial services"],
  nextIntake: "Sep 2026",
};

export function getMeta(slug: string): CourseMeta {
  return courseMeta[slug] ?? defaultMeta;
}
