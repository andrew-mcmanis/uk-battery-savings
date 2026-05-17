import { siteConfig } from "@/data/siteConfig";
import Link from "next/link";

const footerLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Guides",
    href: "/guides",
  },
  {
    label: "Is a battery worth it?",
    href: "/is-a-home-battery-worth-it-uk",
  },
  {
    label: "Battery without solar",
    href: "/home-battery-without-solar-uk",
  },
  {
    label: "Payback guide",
    href: "/home-battery-payback-period-uk",
  },
  {
    label: "Quote checklist",
    href: "/home-battery-quote-checklist-uk",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
  },
  {
    label: "Terms",
    href: "/terms",
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
