import { siteConfig } from "@/data/siteConfig";
import { routePaths } from "@/data/siteRoutes";
import Link from "next/link";

const footerLinks = [
  {
    label: "About",
    href: routePaths.about,
  },
  {
    label: "Methodology",
    href: routePaths.methodology,
  },
  {
    label: "Tools",
    href: routePaths.tools,
  },
  {
    label: "Guides",
    href: routePaths.guides,
  },
  {
    label: "Feedback",
    href: routePaths.feedback,
  },
  {
    label: "Is a battery worth it?",
    href: routePaths.isBatteryWorthIt,
  },
  {
    label: "Battery without solar",
    href: routePaths.batteryWithoutSolar,
  },
  {
    label: "Payback guide",
    href: routePaths.batteryPaybackPeriod,
  },
  {
    label: "Savings examples",
    href: routePaths.batterySavingsExamples,
  },
  {
    label: "Quote checklist",
    href: routePaths.batteryQuoteChecklist,
  },
  {
    label: "Quote comparison",
    href: routePaths.batteryQuoteComparison,
  },
  {
    label: "Installer quotes",
    href: routePaths.batteryInstallerQuotes,
  },
  {
    label: "Privacy",
    href: routePaths.privacy,
  },
  {
    label: "Disclaimer",
    href: routePaths.disclaimer,
  },
  {
    label: "Commercial disclosure",
    href: routePaths.commercialDisclosure,
  },
  {
    label: "Terms",
    href: routePaths.terms,
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 px-6 py-8 text-sm text-slate-400">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-xl leading-6">
              Estimate home battery savings, payback period and break-even cost
              using simple UK electricity tariff assumptions.
            </p>
          </div>

          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Estimate only. No data stored.</p>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
