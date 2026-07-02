import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import logoAsset from "@/assets/uwa-india-logo.png.asset.json";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

const nav = [
  { label: "Study", to: "/study", hasMega: true },
  { label: "About", to: "/about" },
  { label: "Campuses", to: "/campuses" },
  { label: "Careers", to: "/careers" },
  { label: "Collaborate", to: "/collaborate" },
  { label: "News", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const ug = courses.filter((c) => c.level === "Undergraduate");
  const pg = courses.filter((c) => c.level === "Postgraduate");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border/60" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="UWA India"
            className={cn(
              "h-11 w-auto shrink-0 transition-[filter] duration-500",
              scrolled ? "brightness-0" : "brightness-100",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <div
              key={n.to}
              className="relative"
              onMouseEnter={() => n.hasMega && setMega(true)}
              onMouseLeave={() => n.hasMega && setMega(false)}
            >
              <Link
                to={n.to}
                className={cn(
                  "group inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10",
                )}
                activeProps={{ className: "font-semibold" }}
              >
                {n.label}
                {n.hasMega && <ChevronDown className="size-3.5 opacity-70 transition-transform group-hover:rotate-180" />}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex",
              scrolled ? "bg-primary text-primary-foreground hover:bg-primary/90"
                       : "bg-gold text-gold-foreground hover:bg-gold/90",
            )}
          >
            Apply Now
            <ArrowUpRight className="ml-1.5 size-4" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
              scrolled ? "bg-secondary text-foreground" : "bg-white/10 text-white",
            )}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Mega menu (desktop) */}
      <div
        onMouseEnter={() => setMega(true)}
        onMouseLeave={() => setMega(false)}
        className={cn(
          "absolute inset-x-0 top-full origin-top overflow-hidden border-b border-border bg-background/95 backdrop-blur transition-all duration-500",
          mega ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 px-10 py-10 lg:grid-cols-[1.2fr_2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Study at UWA India</p>
            <h3 className="mt-3 font-display text-3xl leading-tight">Your launchpad for a global career.</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              World-ranked courses from a Group of Eight university, delivered in Mumbai and Chennai.
            </p>
            <Link to="/study" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary story-link">
              Explore all courses <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-foreground/70">Undergraduate</p>
              <ul className="space-y-2">
                {ug.slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link to="/study/$courseId" params={{ courseId: c.slug }} className="story-link text-sm">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold-foreground/70">Postgraduate</p>
              <ul className="space-y-2">
                {pg.map((c) => (
                  <li key={c.slug}>
                    <Link to="/study/$courseId" params={{ courseId: c.slug }} className="story-link text-sm">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">Applications open</p>
            <p className="mt-3 font-display text-2xl leading-snug">Inaugural intake, September 2026.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
              Apply Now <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-primary/90 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background px-6 py-6 shadow-2xl transition-transform duration-500",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <img src={logoAsset.url} alt="UWA India" className="h-10 brightness-0" />
            <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full bg-secondary" aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-1 flex-col gap-1 overflow-y-auto">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-4 font-display text-3xl"
              >
                {n.label}
                <ArrowUpRight className="size-5 opacity-40" />
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground"
          >
            Apply Now <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src={logoAsset.url} alt="UWA India" className="h-14" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              The University of Western Australia is a top 100 global university and a founding member of Australia's Group of Eight. Based in Perth, UWA is internationally recognised for excellence in research, teaching, and industry engagement across the Indo-Pacific region.
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-primary-foreground/50">
              UWA is working closely with the University Grants Commission (UGC) to secure the necessary approvals for its proposed campuses and course offerings in India. Courses will commence following receipt of the required approvals.
            </p>
          </div>
          <FooterCol title="Study">
            <FooterLink to="/study">All courses</FooterLink>
            <FooterLink to="/study">Scholarships</FooterLink>
            <FooterLink to="/campuses/mumbai">Mumbai</FooterLink>
            <FooterLink to="/campuses/chennai">Chennai</FooterLink>
          </FooterCol>
          <FooterCol title="Institution">
            <FooterLink to="/about">About UWA India</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/collaborate">Collaborate</FooterLink>
            <FooterLink to="/news">News</FooterLink>
          </FooterCol>
          <FooterCol title="Contact">
            <a href="mailto:info.uwaindia@uwa.edu.au" className="story-link text-sm text-primary-foreground/80">info.uwaindia@uwa.edu.au</a>
            <p className="text-sm text-primary-foreground/60">(+61 8) 6488 6000</p>
            <p className="mt-3 text-xs text-primary-foreground/50">35 Stirling Highway<br/>Perth WA 6009, Australia</p>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
            CRICOS 00126G · PRV12169 · Australian University
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-primary-foreground/60">
            <a href="#" className="story-link">Governance</a>
            <a href="#" className="story-link">Fees policy</a>
            <a href="#" className="story-link">Privacy</a>
            <a href="#" className="story-link">Terms of use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="story-link w-fit text-sm text-primary-foreground/80">
      {children}
    </Link>
  );
}
