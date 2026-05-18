export const routePaths = {
  home: "/",
  about: "/about",
  methodology: "/methodology",
  tools: "/tools",
  guides: "/guides",
  feedback: "/feedback",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
  terms: "/terms",

  isBatteryWorthIt: "/is-a-home-battery-worth-it-uk",
  batteryWithoutSolar: "/home-battery-without-solar-uk",
  batteryPaybackPeriod: "/home-battery-payback-period-uk",
  batterySavingsExamples: "/home-battery-savings-examples-uk",
  batteryQuoteChecklist: "/home-battery-quote-checklist-uk",
  batteryQuoteComparison: "/home-battery-quote-comparison-uk",
} as const;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export type PublicRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export const publicRoutes: PublicRoute[] = [
  {
    path: routePaths.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: routePaths.about,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: routePaths.methodology,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
  path: routePaths.tools,
  changeFrequency: "monthly",
  priority: 0.8,
  },
  {
    path: routePaths.guides,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: routePaths.feedback,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: routePaths.privacy,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: routePaths.disclaimer,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: routePaths.terms,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    path: routePaths.isBatteryWorthIt,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: routePaths.batteryWithoutSolar,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: routePaths.batteryPaybackPeriod,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: routePaths.batterySavingsExamples,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: routePaths.batteryQuoteChecklist,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: routePaths.batteryQuoteComparison,
    changeFrequency: "monthly",
    priority: 0.75,
  },
];

export const sectionPaths = {
  calculator: `${routePaths.home}#calculator`,
  calculatorInputs: `${routePaths.home}#calculator-inputs`,
  calculatorResult: `${routePaths.home}#calculator-result`,
  howItWorks: `${routePaths.home}#how-it-works`,
} as const;
