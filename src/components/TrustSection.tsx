import { trustPoints } from "@/data/landingPageContent";

export default function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-5 md:grid-cols-3">
        {trustPoints.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <h2 className="text-lg font-bold text-slate-950">
              {point.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
