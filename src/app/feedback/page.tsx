import type { Metadata } from "next";
import InfoPageLayout from "@/components/InfoPageLayout";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Send feedback, report an issue, or suggest an improvement for the UK Home Battery Savings Calculator.",
  alternates: {
    canonical: "/feedback",
  },
};

const feedbackSubject = encodeURIComponent(
  "Feedback for UK Battery Savings"
);

const bugSubject = encodeURIComponent(
  "Issue with UK Battery Savings calculator"
);

const suggestionSubject = encodeURIComponent(
  "Suggestion for UK Battery Savings"
);

export default function FeedbackPage() {
  return (
    <InfoPageLayout
      eyebrow="Feedback"
      title="Send feedback"
      description="Found something unclear, spotted a problem, or have an idea to improve the calculator? Send a short email."
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          What to send
        </h2>

        <p className="mt-3">
          Useful feedback includes anything that would make the calculator more
          accurate, clearer, easier to use, or more helpful before comparing
          home battery quotes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href={`mailto:${siteConfig.contactEmail}?subject=${feedbackSubject}`}
          className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
        >
          <h3 className="font-bold text-slate-950">General feedback</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Send a general comment about the site, layout, wording, or user
            experience.
          </p>
        </a>

        <a
          href={`mailto:${siteConfig.contactEmail}?subject=${bugSubject}`}
          className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
        >
          <h3 className="font-bold text-slate-950">Report an issue</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Report a broken link, confusing result, calculation concern, or
            display problem.
          </p>
        </a>

        <a
          href={`mailto:${siteConfig.contactEmail}?subject=${suggestionSubject}`}
          className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 hover:bg-white hover:shadow-sm"
        >
          <h3 className="font-bold text-slate-950">Suggest an improvement</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Suggest a new guide, calculator improvement, example scenario, or
            missing assumption.
          </p>
        </a>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          Email address
        </h2>

        <p className="mt-3">
          You can email:
        </p>

        <p className="mt-3">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>

      <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <h2 className="text-xl font-bold text-amber-950">
          Please do not send sensitive information
        </h2>

        <p className="mt-3 text-amber-950">
          Do not send account numbers, full addresses, payment details, private
          documents, or anything you would not want included in a normal email.
          A rough description of the issue is enough.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-950">
          What happens next
        </h2>

        <p className="mt-3">
          Feedback may be used to improve the calculator, guides, assumptions,
          wording and examples. A reply is not guaranteed, but useful reports
          can help improve the site over time.
        </p>
      </div>
    </InfoPageLayout>
  );
}
