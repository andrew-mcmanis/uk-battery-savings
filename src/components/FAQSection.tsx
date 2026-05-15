import { faqs } from "@/data/landingPageContent";

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        FAQ
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        Common questions
      </h2>

      <div className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h3 className="text-lg font-bold text-slate-950">
              {faq.question}
            </h3>

            <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
