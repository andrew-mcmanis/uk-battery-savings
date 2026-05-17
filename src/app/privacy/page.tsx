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
        <h2 className="text-2xl font-bold text-slate-950">Analytics and performance</h2>
        <p className="mt-3">
          This website uses Vercel Web Analytics to understand basic site usage,
          such as page views, top pages, referrers, device type and general location
          information.
        </p>
        <p className="mt-3">
          This website also uses Vercel Speed Insights to understand real-world page
          performance and help identify slow pages or layout issues.
        </p>
        <p className="mt-3">
          These tools are used to improve the site and understand which calculator and
          guide pages are useful to visitors.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">Feedback emails</h2>
        <p className="mt-3">
          If you choose to send feedback by email, the information you include in that
          email will be handled by the email services involved in sending and
          receiving the message.
        </p>
        <p className="mt-3">
          The website itself does not store feedback messages in a database.
        </p>
        <p className="mt-3">
          You should avoid sending sensitive personal information, payment details,
          account numbers, private documents, or anything not needed to explain the
          feedback.
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
