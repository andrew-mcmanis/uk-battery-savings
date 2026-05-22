import BatterySavingsCalculator from "@/components/BatterySavingsCalculator";
import DisclaimerSection from "@/components/DisclaimerSection";
import FAQSection from "@/components/FAQSection";
import FitSection from "@/components/FitSection";
import GuidesSection from "@/components/GuidesSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrustSection from "@/components/TrustSection";
import { faqSchema } from "@/data/landingPageContent";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ToolsSection from "@/components/ToolsSection";
import {
  buildCalculatorWebApplicationSchema,
  buildWebSiteSchema,
} from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "UK Home Battery Savings Calculator and Payback Estimator",
  description:
    "Estimate UK home battery savings, monthly savings, payback period and break-even cost using your battery size, tariff rates and expected usage.",
  keywords: [
    "home battery savings calculator UK",
    "battery payback calculator UK",
    "off peak electricity battery calculator",
    "solar battery savings calculator UK",
    "is a home battery worth it UK",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UK Home Battery Savings Calculator and Payback Estimator",
    description:
      "Estimate home battery savings, payback period and break-even cost using UK electricity tariff assumptions.",
    type: "website",
    locale: "en_GB",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const webSiteSchema = buildWebSiteSchema();
  const calculatorSchema = buildCalculatorWebApplicationSchema();

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-900">
      <StructuredData data={[webSiteSchema, calculatorSchema, faqSchema]} />

      <SiteHeader />
      <HeroSection />
      <TrustSection />
      <BatterySavingsCalculator />
      <ToolsSection />
      <HowItWorksSection />
      <FitSection />
      <GuidesSection />
      <FAQSection />
      <DisclaimerSection />
      <SiteFooter />
    </main>
  );
}
