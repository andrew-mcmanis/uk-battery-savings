import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/data/guides";

export default function GuidesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Guides
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Learn before you buy
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          These short guides explain the key decisions behind home battery
          savings, including payback period, off-peak charging and whether a
          battery can make sense without solar panels.
        </p>
      </div>

      <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard
            key={guide.href}
            title={guide.title}
            description={guide.description}
            href={guide.href}
          />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/guides"
          className="inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View all guides
        </Link>
      </div>
    </section>
  );
}
