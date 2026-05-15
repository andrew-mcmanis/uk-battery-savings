import InfoPageLayout from "@/components/InfoPageLayout";
import { siteConfig } from "@/data/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms | ${siteConfig.name}`,
  description:
    "Basic terms of use for the UK Home Battery Savings Calculator.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      eyebrow="Terms"
      title="Terms of use"
      description="By using this website, you agree to use the calculator as a general estimate only."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Use of the site</h2>
        <p className="mt-3">
          This website is provided as a general information tool. You may use it
          to estimate possible home battery savings based on your own
          assumptions.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">No guarantee</h2>
        <p className="mt-3">
          The website does not guarantee that the calculator is complete,
          accurate, up to date or suitable for your specific circumstances.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Your responsibility
        </h2>
        <p className="mt-3">
          You are responsible for checking any figures, assumptions, quotes,
          tariffs, warranties and product details before making a purchase or
          financial decision.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">Changes</h2>
        <p className="mt-3">
          The website content, calculator logic, assumptions and terms may be
          updated over time.
        </p>
      </div>
    </InfoPageLayout>
  );
}
