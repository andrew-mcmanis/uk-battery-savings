import GuideCard from "@/components/GuideCard";
import { guides } from "@/data/guides";

type RelatedGuidesProps = {
  currentPath: string;
};

export default function RelatedGuides({ currentPath }: RelatedGuidesProps) {
  const relatedGuides = guides
    .filter((guide) => guide.href !== currentPath)
    .slice(0, 3);

  if (relatedGuides.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Related guides
        </p>

        <h2 className="mt-3 text-2xl font-bold text-slate-950">
          Keep learning
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          These related guides explain the assumptions behind home battery
          savings, payback period and quote checks.
        </p>
      </div>

      <div className="mt-6 grid items-stretch gap-5 md:grid-cols-3">
        {relatedGuides.map((guide) => (
          <GuideCard
            key={guide.href}
            title={guide.title}
            description={guide.description}
            href={guide.href}
          />
        ))}
      </div>
    </section>
  );
}
