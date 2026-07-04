import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Menu, X, ChevronDown, ArrowUpRight, Search, User,
  GraduationCap, Award, BookOpen, Compass, Building2, MapPin,
  Briefcase, Handshake, Users,
} from "lucide-react";
import logoWhite from "@/assets/uwa-logo-white.png";
import mumbaiImg from "@/assets/mumbai-campus.jpg";
import chennaiImg from "@/assets/chennai-campus.jpg";
import collabImg from "@/assets/students-collab.jpg";
import heroImg from "@/assets/hero-campus.jpg";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";

type MegaKey = "study" | "campus" | "careers" | null;

const nav: { label: string; to: string; mega?: Exclude<MegaKey, null> }[] = [
  { label: "Study", to: "/study", mega: "study" },
  { label: "Campus", to: "/campuses", mega: "campus" },
  { label: "Careers", to: "/careers", mega: "careers" },
  { label: "About", to: "/about" },
  { label: "Collaborate", to: "/collaborate" },
  { label: "News", to: "/news" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      onMouseLeave={() => setMega(null)}
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 shadow-soft transition-shadow",
        scrolled && "shadow-elegant",
      )}
      style={{ backgroundColor: "#003087" }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link to="/" onMouseEnter={() => setMega(null)} className="flex items-center gap-3">
          <img
            src={logoWhite}
            alt="UWA India"
            className="h-11 w-auto shrink-0"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <div
              key={n.to}
              onMouseEnter={() => setMega(n.mega ?? null)}
              className="relative"
            >
              <Link
                to={n.to}
                className={cn(
                  "group inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15",
                  mega && mega === n.mega && "bg-white/15",
                )}
              >
                {n.label}
                {n.mega && (
                  <ChevronDown
                    className={cn(
                      "size-3.5 opacity-70 transition-transform duration-300",
                      mega === n.mega && "rotate-180",
                    )}
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="hidden size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:grid"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 md:inline-flex"
          >
            <User className="size-4" /> Login
          </Link>
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold/30 transition-transform hover:-translate-y-0.5 hover:bg-gold/90 md:inline-flex"
          >
            Apply Now
            <ArrowUpRight className="size-4" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>


      {/* Search bar */}
      <div
        className={cn(
          "overflow-hidden border-b border-border/50 bg-background transition-all duration-300",
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 lg:px-10">
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus={searchOpen}
            placeholder="Search courses, campuses, careers…"
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => setSearchOpen(false)} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
            ESC
          </button>
        </div>
      </div>

      {/* Mega menus */}
      <MegaContainer active={mega} setMega={setMega}>
        {mega === "study" && <StudyMega />}
        {mega === "campus" && <CampusMega />}
        {mega === "careers" && <CareersMega />}
      </MegaContainer>

      {/* Mobile drawer */}
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function MegaContainer({
  active, setMega, children,
}: { active: MegaKey; setMega: (v: MegaKey) => void; children: React.ReactNode }) {
  return (
    <div
      onMouseEnter={() => active && setMega(active)}
      className={cn(
        "absolute inset-x-0 top-full origin-top overflow-hidden border-b border-border bg-background transition-all duration-500",
        active ? "max-h-[640px] opacity-100 shadow-elegant" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-10 py-10">{children}</div>
    </div>
  );
}

/* ------------ STUDY MEGA ------------ */
function StudyMega() {
  const ug = courses.filter((c) => c.level === "Undergraduate").slice(0, 5);
  const pg = courses.filter((c) => c.level === "Postgraduate");
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr_1.1fr]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Explore Study</p>
        <ul className="mt-5 space-y-1">
          <MegaLink to="/study" icon={GraduationCap} title="Undergraduate" desc="Bachelor degrees across Tech and Business" />
          <MegaLink to="/study" icon={BookOpen} title="Postgraduate" desc="MBA, Master of IT and specialist Masters" />
          <MegaLink to="/study" icon={Award} title="Scholarships" desc="Merit awards and future-leader grants" />
          <MegaLink to="/study" icon={Compass} title="Admissions" desc="Requirements and how to apply" />
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Featured Courses</p>
          <ul className="space-y-2.5">
            {ug.map((c) => (
              <li key={c.slug}>
                <Link to={`/study/${c.slug}`}
                  className="group flex items-baseline justify-between border-b border-dashed border-border/70 pb-2 text-sm hover:text-primary"
                >
                  <span>{c.name}</span>
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-70" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Popular Programs</p>
          <ul className="space-y-2.5">
            {pg.map((c) => (
              <li key={c.slug}>
                <Link to={`/study/${c.slug}`}
                  className="group flex items-baseline justify-between border-b border-dashed border-border/70 pb-2 text-sm hover:text-primary"
                >
                  <span>{c.name}</span>
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-70" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PromoCard
        image={heroImg}
        eyebrow="Applications open"
        title="Inaugural intake, September 2026."
        desc="Join the first cohort of a Group of Eight university in India."
        cta="Apply Now"
      />
    </div>
  );
}

/* ------------ CAMPUS MEGA ------------ */
function CampusMega() {
  const items = [
    { city: "Mumbai", tag: "Financial capital", img: mumbaiImg, highlights: ["Andheri location", "Business ecosystem", "Metro & airport nearby"], to: "mumbai" },
    { city: "Chennai", tag: "Industrial powerhouse", img: chennaiImg, highlights: ["Global tech corridor", "Coastal campus", "Manufacturing hub"], to: "chennai" },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((c) => (
        <Link
          key={c.city}
          to={`/campuses/${c.to}`}
          className="group relative overflow-hidden rounded-3xl"
        >
          <div className="relative h-80 w-full overflow-hidden">
            <img src={c.img} alt={c.city} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7 text-primary-foreground">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] backdrop-blur">
                {c.tag}
              </span>
              <div className="mt-3 flex items-end justify-between">
                <h3 className="font-display text-5xl">{c.city}</h3>
                <MapPin className="size-5 text-gold" />
              </div>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {c.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-white/10 px-3 py-1 backdrop-blur">{h}</li>
                ))}
              </ul>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                Explore campus <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ------------ CAREERS MEGA ------------ */
function CareersMega() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.1fr]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Work with UWA</p>
        <ul className="mt-5 space-y-1">
          <MegaLink to="/careers" icon={Briefcase} title="Faculty opportunities" desc="Academic and research roles" />
          <MegaLink to="/careers" icon={Users} title="Professional staff" desc="Operations, student services, IT" />
          <MegaLink to="/careers" icon={Award} title="Graduate programmes" desc="Early-career career pathways" />
        </ul>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Collaborate with UWA</p>
        <ul className="mt-5 space-y-1">
          <MegaLink to="/collaborate" icon={Handshake} title="Industry partnerships" desc="Research & innovation programmes" />
          <MegaLink to="/collaborate" icon={Building2} title="Government & policy" desc="Advisory and public sector work" />
          <MegaLink to="/collaborate" icon={GraduationCap} title="Academic partnerships" desc="Global institutions and exchanges" />
        </ul>
      </div>
      <PromoCard
        image={collabImg}
        eyebrow="Join our faculty"
        title="Build the next generation of Indo-Pacific talent."
        desc="Positions opening now for the Mumbai & Chennai campuses."
        cta="View open roles"
      />
    </div>
  );
}

function MegaLink({
  to, icon: Icon, title, desc,
}: { to: string; icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-secondary"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition group-hover:bg-gold group-hover:text-gold-foreground">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="block text-xs text-muted-foreground">{desc}</span>
        </span>
      </Link>
    </li>
  );
}

function PromoCard({
  image, eyebrow, title, desc, cta,
}: { image: string; eyebrow: string; title: string; desc: string; cta: string }) {
  return (
    <Link to="/contact" className="group relative block overflow-hidden rounded-3xl bg-primary text-primary-foreground">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-primary/50" />
      <div className="relative flex h-full min-h-[280px] flex-col justify-between p-7">
        <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] backdrop-blur">
          {eyebrow}
        </span>
        <div>
          <p className="font-display text-3xl leading-tight">{title}</p>
          <p className="mt-3 text-sm text-primary-foreground/75">{desc}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
            {cta} <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------ MOBILE DRAWER ------------ */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expand, setExpand] = useState<string | null>(null);
  const groups = [
    {
      key: "study", label: "Study", items: [
        { to: "/study", label: "All courses" },
        { to: "/study", label: "Undergraduate" },
        { to: "/study", label: "Postgraduate" },
        { to: "/study", label: "Scholarships" },
      ],
    },
    {
      key: "campus", label: "Campus", items: [
        { to: "/campuses", label: "Overview" },
        { to: "/campuses/mumbai", label: "Mumbai" },
        { to: "/campuses/chennai", label: "Chennai" },
      ],
    },
    {
      key: "careers", label: "Careers", items: [
        { to: "/careers", label: "Work with UWA" },
        { to: "/collaborate", label: "Collaborate" },
      ],
    },
  ];
  const flat = [
    { to: "/about", label: "About" },
    { to: "/news", label: "News" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity duration-500",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl" onClick={onClose} />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background px-6 pt-6 pb-8 shadow-2xl transition-transform duration-500",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <img src={logoWhite} alt="UWA India" className="h-10 w-auto" style={{ filter: "invert(1) brightness(0.2)" }} />
          <button onClick={onClose} className="grid size-11 place-items-center rounded-full bg-secondary" aria-label="Close menu">
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-8 flex-1 space-y-1 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.key} className="border-b border-border">
              <button
                onClick={() => setExpand((v) => (v === g.key ? null : g.key))}
                className="flex w-full items-center justify-between py-4 text-left font-display text-3xl"
              >
                {g.label}
                <ChevronDown className={cn("size-5 transition-transform", expand === g.key && "rotate-180")} />
              </button>
              <div className={cn("grid overflow-hidden transition-[grid-template-rows] duration-500", expand === g.key ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="min-h-0 overflow-hidden">
                  <ul className="pb-4">
                    {g.items.map((i) => (
                      <li key={i.label}>
                        <Link to={i.to} onClick={onClose} className="block py-2 pl-1 text-sm text-muted-foreground hover:text-primary">
                          {i.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {flat.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              onClick={onClose}
              className="flex items-center justify-between border-b border-border py-4 font-display text-3xl"
            >
              {f.label}
              <ArrowUpRight className="size-5 opacity-40" />
            </Link>
          ))}
        </nav>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link to="/contact" onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3.5 text-sm font-semibold">
            <User className="size-4" /> Login
          </Link>
          <Link to="/contact" onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3.5 text-sm font-semibold text-gold-foreground">
            Apply Now <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img src={logoWhite} alt="UWA India" className="h-14 w-auto" />
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
