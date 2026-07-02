import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/collaborate")({
  head: () => ({
    meta: [
      { title: "Collaborate with UWA India — Partnerships that shape the Indo-Pacific" },
      { name: "description", content: "Partner with UWA India across research, industry, government, and education. Build the workforce, innovation, and impact of the future." },
      { property: "og:title", content: "Collaborate with UWA India" },
      { property: "og:description", content: "Building partnerships that shape the future of the Indo-Pacific." },
    ],
  }),
  component: Collaborate,
});

const propositions = [
  { audience: "For Industry", h: "Accelerate innovation. Build tomorrow's workforce.", offer: ["Joint R&D initiatives", "Industry-sponsored research and PhD programmes", "Workforce upskilling and executive education", "Internships and graduate talent pipelines", "Innovation challenges and co-creation partnerships"], p: "Access cutting-edge expertise and globally prepared graduates ready to contribute across resources, energy transition, technology, health, and advanced industries." },
  { audience: "For Government Agencies", h: "Strengthen capability. Deliver evidence-based impact.", offer: ["Joint R&D initiatives", "Capacity-building for public sector leaders", "Research aligned to sustainability and economic diversification", "Internships and graduate pipelines", "Innovation and co-creation partnerships"], p: "Strengthen institutional capability and enable impactful collaboration across the Indo-Pacific." },
  { audience: "For Not-for-Profits", h: "Advance community impact through research.", offer: ["Research partnerships on social and environmental challenges", "Monitoring and evaluation support", "Fellowships and scholar programmes", "Community capacity-building initiatives", "Global knowledge exchange networks"], p: "Amplify impact through research, collaboration, and international connection." },
  { audience: "For Education Partners", h: "Create transformative learning pathways.", offer: ["Articulation and progression agreements", "Dual-degree and twinning programmes", "Faculty exchange and joint research", "Curriculum collaboration for future industries", "Student mobility and study-abroad pathways"], p: "Enhance institutional reputation, global engagement, and access to diverse career opportunities across the Indo-Pacific region." },
];

const focusAreas = [
  "Energy Transition & Renewables", "Climate & Environmental Science", "Mining & Critical Resources",
  "Agriculture & Food Security", "Health & Biomedical Innovation", "Marine & Ocean Sciences",
  "Data Science, AI & Digital Technologies", "Public Policy & Governance",
];

function Collaborate() {
  return (
    <>
      <section className="relative bg-primary pt-40 pb-24 text-primary-foreground lg:pt-52 lg:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> Collaborate
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] md:text-8xl">
            Partnerships that shape the <em className="text-gold not-italic">Indo-Pacific.</em>
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-primary-foreground/75">
            UWA India's campuses in Mumbai and Chennai place students and partners at the heart of two of the Indo-Pacific's most dynamic economies. Through UWA India, we link global expertise with India's rapidly evolving innovation, government and education ecosystems.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Why partner with UWA</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">A Group of Eight university, working with you.</h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Globally recognised research and academic expertise",
              "Strong industry and government networks across the Indo-Pacific",
              "Talent pipelines aligned to emerging sectors",
              "Transnational education capability",
              "Joint funding, research and innovation opportunities",
              "Executive and professional development programmes",
            ].map((v) => (
              <li key={v} className="rounded-3xl border border-border bg-background p-6 font-display text-xl leading-tight hover-lift">{v}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our value proposition</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Built for every kind of partner.</h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {propositions.map((p) => (
              <article key={p.audience} className="flex flex-col rounded-4xl border border-border bg-background p-8 hover-lift">
                <p className="text-xs uppercase tracking-[0.22em] text-gold-foreground/70">{p.audience}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight">{p.h}</h3>
                <ul className="mt-6 space-y-2 text-sm text-foreground/85">
                  {p.offer.map((o) => <li key={o} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />{o}</li>)}
                </ul>
                <p className="mt-6 border-t border-border pt-6 text-sm italic text-muted-foreground">{p.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Focus areas</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Where we collaborate.</h2>
          <div className="mt-12 flex flex-wrap gap-3">
            {focusAreas.map((f) => (
              <span key={f} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm">{f}</span>
            ))}
          </div>
          <div className="mt-16 rounded-4xl bg-gold p-10 text-gold-foreground md:p-14">
            <h3 className="font-display text-4xl leading-tight md:text-5xl">Let's partner.</h3>
            <p className="mt-4 max-w-2xl">If you are interested in collaborating with UWA India, we would welcome the opportunity to explore how we can work together.</p>
            <a href="mailto:info.uwaindia@uwa.edu.au" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              info.uwaindia@uwa.edu.au <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
