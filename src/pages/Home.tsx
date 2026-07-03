import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, MapPin, GraduationCap, Globe2, Sparkles, PlayCircle, Quote, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";
import swanImg from "@/assets/legacy-swan.jpg";
import mumbaiImg from "@/assets/mumbai-campus.jpg";
import chennaiImg from "@/assets/chennai-campus.jpg";
import collabImg from "@/assets/students-collab.jpg";
import { courses } from "@/data/courses";
import { partners, events } from "@/data/site";
import { useCountUp, useReveal } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

function Home() {
  usePageMeta({ title: 'UWA India — Your launchpad for a global career', description: "Applications open for The University of Western Australia India's inaugural international campuses in Mumbai and Chennai. September 2026." });
  return (
    <>
      <Hero />
      <TrustStrip />
      <Legacy />
      <WhyChoose />
      <CampusShowcase />
      <StudyExplorer />
      <Launchpad />
      <Partners />
      <Testimonial />
      <ExperienceCTA />
      <EventsSection />
      <RegisterCTA />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-primary text-primary-foreground">
      <img
        src={heroImg}
        alt="UWA campus quadrangle at golden hour"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-white/85 backdrop-blur">
            <span className="size-1.5 rounded-full bg-gold" />
            Applications open · September 2026 intake
          </span>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] text-balance">
            Your launchpad for a <em className="text-gold not-italic">global career.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Applications are now open for The University of Western Australia India's international campuses in Mumbai and Chennai. A Top 100 Group of Eight university, delivered close to home.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/study" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5">
              Apply Now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/study" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
              <PlayCircle className="size-4" /> Explore courses
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-3">
          <HeroKPI k="77" suffix="th" label="QS 2026 world ranking" />
          <HeroKPI k="150,000" suffix="+" label="Global alumni network" />
          <HeroKPI k="13" label="Subjects in the world's Top 50" />
        </div>
      </div>
    </section>
  );
}

function HeroKPI({ k, suffix, label }: { k: string; suffix?: string; label: string }) {
  const n = Number(k.replaceAll(",", ""));
  const { value, ref } = useCountUp(isFinite(n) ? n : 0);
  const display = isFinite(n) ? value.toLocaleString() : k;
  return (
    <div>
      <div className="font-display text-5xl text-white md:text-6xl">
        <span ref={ref}>{display}</span>{suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">{label}</p>
    </div>
  );
}

/* ---------- TRUST STRIP ---------- */
function TrustStrip() {
  const items = [
    { k: "Top 100", v: "Ranked 77th in QS 2026 among the Top 100 universities globally." },
    { k: "Go8", v: "Member of Australia's Group of Eight — and the first Go8 university in India." },
    { k: "13 · Top 50", v: "13 subjects ranked in the world's Top 50 (QS 2025 and GRAS 2024)." },
  ];
  return (
    <section className="relative -mt-24 px-5 pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto grid max-w-[1280px] gap-4 rounded-4xl border border-border bg-background/90 p-6 shadow-elegant backdrop-blur md:grid-cols-3 md:p-10">
        {items.map((i) => (
          <div key={i.k} className="border-b border-border pb-6 last:border-b-0 md:border-b-0 md:border-r md:pb-0 md:pr-8 md:last:border-r-0">
            <div className="font-display text-3xl text-primary">{i.k}</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- LEGACY ---------- */
function Legacy() {
  return (
    <section className="relative px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">A century of academic excellence</span>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
            Be part of a global <em className="text-primary/60 not-italic">academic legacy.</em>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            UWA is bringing globally recognised, future-focused education directly to Mumbai and Chennai. Located in India's business and technology hubs, our campuses connect you to industry from day one.
          </p>
          <Link to="/about" className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            About UWA India <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-4xl">
          <img src={swanImg} alt="Black swan — a UWA symbol" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/60 to-transparent p-8 text-primary-foreground">
            <p className="font-display text-3xl leading-tight">"Seek Wisdom"</p>
            <p className="mt-2 text-sm text-primary-foreground/70">Since 1911 · Perth, Western Australia</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY CHOOSE ---------- */
function WhyChoose() {
  const cards = [
    { icon: GraduationCap, k: "01", h: "Global Academic Excellence", p: "Study programmes shaped by the academic approach and learning standards of The University of Western Australia — international relevance and rigour." },
    { icon: Globe2, k: "02", h: "International Pathways", p: "Begin your academic journey in India with the opportunity to progress to global campuses and international study experiences as part of your degree pathway." },
    { icon: Sparkles, k: "03", h: "A Global Learning Community", p: "Be part of an international academic ecosystem with exposure to global faculty, diverse perspectives, and a future-focused learning environment." },
  ];
  return (
    <section className="relative bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
      <div className="bg-grid-ink pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.22em] text-gold">Why UWA India</span>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
            Three reasons students choose us.
          </h2>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={c.k}
              className={cn(
                "group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:bg-white/[0.06]",
                i === 1 && "lg:translate-y-8",
                i === 2 && "lg:translate-y-16",
              )}
            >
              <div className="absolute -right-8 -top-8 grid size-40 place-items-center rounded-full bg-gold/10 font-display text-9xl text-gold/40">{c.k}</div>
              <c.icon className="relative size-8 text-gold" />
              <div className="relative">
                <h3 className="font-display text-3xl leading-tight">{c.h}</h3>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{c.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CAMPUS SHOWCASE ---------- */
function CampusShowcase() {
  const [hover, setHover] = useState<"mumbai" | "chennai" | null>(null);
  return (
    <section className="relative px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Two campuses. One vision.</span>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
            Two of India's most dynamic cities.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { id: "mumbai", city: "Mumbai", tag: "Financial capital", img: mumbaiImg, blurb: "In Andheri — at the heart of Mumbai's business ecosystem, minutes from the metro and airport." },
            { id: "chennai", city: "Chennai", tag: "Industrial powerhouse", img: chennaiImg, blurb: "A major centre for education, industry and innovation on India's south-eastern coast." },
          ].map((c) => (
            <Link
              key={c.id}
              to={`/campuses/${c.id}`}
              onMouseEnter={() => setHover(c.id as "mumbai" | "chennai")}
              onMouseLeave={() => setHover(null)}
              className={cn(
                "group relative isolate h-[520px] overflow-hidden rounded-4xl transition-all duration-700",
                hover && hover !== c.id && "opacity-70",
              )}
            >
              <img src={c.img} alt={c.city} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] backdrop-blur">{c.tag}</span>
                  <MapPin className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-6xl md:text-7xl">{c.city}</h3>
                  <p className="mt-4 max-w-md text-sm text-white/80">{c.blurb}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Explore campus <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STUDY EXPLORER ---------- */
function StudyExplorer() {
  const [tab, setTab] = useState<"Undergraduate" | "Postgraduate">("Undergraduate");
  const list = courses.filter((c) => c.level === tab).slice(0, 6);
  return (
    <section id="study" className="relative bg-cream px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">What can I study?</span>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
              Programs designed for what comes next.
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Shaped by UWA's academic standards, research excellence, and the emerging needs of Indo-Pacific industry.
            </p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-background p-1">
            {(["Undergraduate", "Postgraduate"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                  tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.slug}
              to={`/study/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span>{c.category}</span>
                <span className="text-gold-foreground">{c.duration.split("·")[0].trim()}</span>
              </div>
              <h3 className="mt-6 font-display text-3xl leading-tight text-balance">{c.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.degree}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.campuses.map((cp) => (
                  <span key={cp} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{cp}</span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/study" className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
            View all {tab.toLowerCase()} courses <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- LAUNCHPAD ---------- */
function Launchpad() {
  return (
    <section className="relative overflow-hidden bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
      <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -left-24 -bottom-24 size-[420px] rounded-full bg-white/5 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-gold">A global launchpad</span>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
            Start here.<br /><em className="text-gold not-italic">Go anywhere.</em>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/75">
            Start your studies in India and access a global network of 150,000+ graduates, strong industry connections, and future-ready learning environments.
          </p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground hover:-translate-y-0.5">
            Register your interest <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-4xl border border-white/10">
          <img src={collabImg} alt="Students collaborating" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ---------- PARTNERS ---------- */
function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <section className="border-y border-border bg-cream py-16">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Industry partners & collaborators</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Backed by leaders across India and Australia.</h2>
          </div>
          <Link to="/collaborate" className="story-link text-sm font-semibold text-primary">Collaborate with UWA India →</Link>
        </div>
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="marquee flex w-max gap-14 whitespace-nowrap px-6 font-display text-2xl text-muted-foreground md:text-3xl">
          {doubled.map((p, i) => (
            <span key={i} className="opacity-70 hover:opacity-100">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIAL ---------- */
function Testimonial() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="px-5 py-24 lg:px-10 lg:py-36">
      <div ref={ref} className={cn("mx-auto max-w-[1080px] transition-all duration-1000", shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")}>
        <Quote className="size-12 text-gold" />
        <blockquote className="mt-6 font-display text-3xl leading-[1.15] text-balance md:text-5xl">
          "As UWA grows its global footprint, the opening of two new campuses in India marks a big milestone in our Indo-Pacific engagement. This reflects UWA's commitment to building bridges across cultures, fostering innovation, and creating opportunities for students and researchers."
        </blockquote>
        <footer className="mt-10 flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-full bg-primary font-display text-xl text-primary-foreground">PR</div>
          <div>
            <p className="font-semibold">Pramod Ranjan</p>
            <p className="text-sm text-muted-foreground">Global Practice Lead, Alcoa Operational Excellence</p>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE CTA ---------- */
function ExperienceCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-16 lg:px-10">
      <div className="relative mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2">
        {[
          { img: mumbaiImg, city: "Mumbai" },
          { img: chennaiImg, city: "Chennai" },
        ].map((c) => (
          <div key={c.city} className="relative h-72 overflow-hidden rounded-4xl">
            <img src={c.img} alt={c.city} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-primary/40" />
            <div className="absolute inset-0 grid place-items-center text-center text-primary-foreground">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] opacity-70">Experience UWA India</p>
                <p className="mt-2 font-display text-4xl">Visit {c.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- EVENTS ---------- */
function EventsSection() {
  return (
    <section className="px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Events & Announcements</span>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-6xl">
              Come closer to UWA India.
            </h2>
          </div>
          <Link to="/news" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-secondary">View all</Link>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 6).map((e, i) => (
            <article
              key={i}
              className="group flex min-h-[280px] flex-col justify-between rounded-3xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Calendar className="size-3.5" />
                <span>{e.date}</span>
                <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 text-[10px]">{e.tag}</span>
              </div>
              <div>
                <h3 className="font-display text-2xl leading-tight">{e.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{e.excerpt}</p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-70 group-hover:opacity-100">
                Read more <ArrowRight className="size-3.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- REGISTER CTA ---------- */
function RegisterCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-36">
      <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
      <div className="relative mx-auto max-w-[900px] text-center">
        <span className="text-xs uppercase tracking-[0.22em] text-gold">Ready to begin?</span>
        <h2 className="mt-4 font-display text-5xl leading-[1.02] text-balance md:text-7xl">
          Your future starts <em className="text-gold not-italic">now.</em>
        </h2>
        <p className="mt-6 text-lg text-primary-foreground/75">
          A UWA India representative will connect with you to further your journey with us.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full bg-gold px-8 py-4 text-sm font-semibold text-gold-foreground">Register your interest</Link>
          <Link to="/study" className="rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur">Browse courses</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
