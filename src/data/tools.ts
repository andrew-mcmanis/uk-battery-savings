import { routePaths, sectionPaths } from "@/data/siteRoutes";

export const tools = [
  {
    title: "Home battery savings calculator",
    description:
      "Estimate annual saving, monthly saving, payback period and break-even battery cost using battery size, tariff rates and expected usage.",
    href: sectionPaths.calculator,
    label: "Calculator",
  },
  {
    title: "Home battery quote comparison worksheet",
    description:
      "Compare up to three battery quotes by installed cost, usable capacity, warranty, estimated annual saving, payback and backup power.",
    href: routePaths.batteryQuoteComparison,
    label: "Worksheet",
  },
];
