import {
  goodFitItems,
  notGoodFitItems,
} from "@/data/landingPageContent";

export default function FitSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-20 lg:grid-cols-2">
        <div className="rounded-3xl bg-emerald-50 p-8 ring-1 ring-emerald-100">
          <h2 className="text-2xl font-bold text-slate-950">
            This calculator is useful if...
          </h2>

          <ul className="mt-6 space-y-3">
            {goodFitItems.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-950">
            This calculator is not enough if...
          </h2>

          <ul className="mt-6 space-y-3">
            {notGoodFitItems.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
