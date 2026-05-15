import BatterySavingsCalculator from "@/components/BatterySavingsCalculator";
import DisclaimerSection from "@/components/DisclaimerSection";
import FAQSection from "@/components/FAQSection";
import FitSection from "@/components/FitSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrustSection from "@/components/TrustSection";
import { faqSchema } from "@/data/landingPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UK Home Battery Savings Calculator",
  description:
    "Estimate whether a home battery and cheap off-peak electricity could reduce your UK electricity bill. Calculate annual savings, monthly savings and payback period.",
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
    title: "UK Home Battery Savings Calculator",
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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <SiteHeader />
      <HeroSection />
      <TrustSection />
      <BatterySavingsCalculator />
      <HowItWorksSection />
      <FitSection />
      <FAQSection />
      <DisclaimerSection />
      <SiteFooter />
    </main>
  );
}
