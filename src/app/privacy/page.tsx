import InfoPageLayout from "@/components/InfoPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy`,
  description:
    "Privacy information for the UK Home Battery Savings Calculator.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      eyebrow="Privacy"
      title="Privacy notice"
      description="The first version of this calculator is designed to avoid collecting personal data."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Calculator inputs</h2>
        <p className="mt-3">
          The calculator runs in your browser. The values you type into the
          calculator are used to show an estimate on the page and are not saved
          to a database by this website.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">No account required</h2>
        <p className="mt-3">
          You do not need to create an account, provide your name, enter your
          phone number, or submit your email address to use the calculator.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">Analytics</h2>
        <p className="mt-3">
          Analytics may be added later to understand page traffic and improve the
          site. If analytics are added, this page should be updated to explain
          what is collected and why.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">Affiliate links</h2>
        <p className="mt-3">
          Affiliate links or partner links may be added later. If they are added,
          this privacy notice and the site disclaimer should be updated to make
          that clear.
        </p>
      </div>
    </InfoPageLayout>
  );
}
