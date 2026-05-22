import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { routePaths, sectionPaths } from "@/data/siteRoutes";

const navLinks = [
  {
    label: "Calculator",
    href: sectionPaths.calculator,
  },
  {
    label: "Tools",
    href: routePaths.tools,
  },
  {
    label: "Quotes",
    href: routePaths.batteryInstallerQuotes,
  },
  {
    label: "Guides",
    href: routePaths.guides,
  },
  {
    label: "How it works",
    href: sectionPaths.howItWorks,
  },
  {
    label: "About",
    href: routePaths.about,
  },
  {
    label: "Feedback",
    href: routePaths.feedback,
  },
];

const mobileNavLinks = navLinks.slice(0, 4);

export default function SiteHeader() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-100 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg focus:not-sr-only"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="font-bold tracking-tight">
            <span className="sm:hidden">{siteConfig.shortName}</span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm text-slate-300 md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={routePaths.batteryInstallerQuotes}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Quotes
          </Link>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 px-4 pb-3 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto text-xs font-semibold text-slate-300">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
