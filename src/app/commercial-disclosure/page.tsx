import type { Metadata } from "next";
import InfoPageLayout from "@/components/InfoPageLayout";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Commercial Disclosure",
  description:
    "How UK Battery Savings may use referral links, affiliate links, advertising, sponsored placements and commercial partnerships.",
  alternates: {
    canonical: "/commercial-disclosure",
  },
};

export default function CommercialDisclosurePage() {
  return (
    <InfoPageLayout
      eyebrow="Commercial disclosure"
      title="How this site may make money"
      description="This page explains how commercial relationships should be handled if UK Battery Savings uses referral links, affiliate links, advertising or sponsored placements."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Current position
        </h2>

        <p className="mt-3">
          UK Battery Savings is built around free calculators and guides. If the
          site introduces referral links, affiliate links, advertising, sponsored
          listings, or paid partnerships, those placements should be disclosed
          clearly where they appear.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Editorial independence
        </h2>

        <p className="mt-3">
          Commercial relationships should not change calculator outputs,
          payback calculations, warning messages, or the assumptions shown to
          users. Any recommendation-style content should remain based on useful
          buyer criteria such as total installed cost, usable capacity, warranty
          terms, backup power and tariff assumptions.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Possible revenue sources
        </h2>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Referral fees from installers or quote-matching partners.</li>
          <li>Affiliate income from relevant tariffs, tools, monitoring, or services.</li>
          <li>Clearly labelled advertising or sponsored placements.</li>
          <li>Commercial research or lead-generation partnerships.</li>
        </ul>
      </div>

      <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
        <h2 className="text-xl font-bold text-slate-950">
          Partnership enquiries
        </h2>

        <p className="mt-3">
          Relevant UK home battery, energy tariff, installer, finance, or
          monitoring partners can contact{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </InfoPageLayout>
  );
}
