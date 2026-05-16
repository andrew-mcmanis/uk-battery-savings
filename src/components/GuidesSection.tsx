import Link from "next/link";

const guides = [
  {
    title: "Is a home battery worth it in the UK?",
    description:
      "Understand when a battery may make sense, when it may not, and which numbers matter most.",
    href: "/is-a-home-battery-worth-it-uk",
  },
  {
    title: "Is a home battery worth it without solar?",
    description:
      "Learn how grid charging on cheap off-peak electricity can work even without solar panels.",
    href: "/home-battery-without-solar-uk",
  },
  {
    title: "How to estimate battery payback period",
    description:
      "See how installed cost and annual saving combine to produce a simple payback estimate.",
    href: "/home-battery-payback-period-uk",
  },
];

export default function GuidesSection() {
  return (
    <section id="guides" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
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

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-slate-950">
              {guide.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {guide.description}
            </p>

            <p className="mt-5 text-sm font-semibold text-emerald-700">
              Read guide →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
