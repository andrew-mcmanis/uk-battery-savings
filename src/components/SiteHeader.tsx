import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { routePaths, sectionPaths } from "@/data/siteRoutes";

const navLinks = [
  {
    label: "Calculator",
    href: sectionPaths.calculator,
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
  {
    label: "Privacy",
    href: routePaths.privacy,
  },
];

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
            href={sectionPaths.calculator}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Start
          </Link>
        </div>
      </header>
    </>
  );
}
