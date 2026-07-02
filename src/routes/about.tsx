import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import swanImg from "@/assets/legacy-swan.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About UWA India — A century of academic excellence" },
      { name: "description", content: "UWA India marks a bold new chapter in the story of The University of Western Australia — a century of academic excellence meeting one of the world's most dynamic innovation landscapes." },
      { property: "og:title", content: "About UWA India" },
      { property: "og:description", content: "A new learning ecosystem designed for the future of global education." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary pt-40 pb-24 text-primary-foreground lg:pt-52 lg:pb-32">
        <img src={swanImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> About
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] text-balance md:text-8xl">
            A century of excellence,<br /><em className="text-gold not-italic">a new chapter in India.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-primary-foreground/75">
            UWA India marks a bold new chapter in the story of The University of Western Australia — where a century of academic excellence meets one of the world's most vibrant and dynamic innovation landscapes.
          </p>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Our heritage</p>
            <h2 className="mt-3 font-display text-5xl">Founded 1911. Rooted in Perth.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>Founded in 1911, UWA has been the home of breakthrough ideas, pioneering research and transformative education for more than a century. From Nobel Prize–winning discoveries to world-leading environmental and medical research, UWA has helped shape global conversations and drive real-world change.</p>
            <p>Across generations, our students and graduates have embodied a culture defined by curiosity, integrity, collaboration and impact. This strong foundation provides the anchor for UWA India: a place that honours where we've come from while unlocking what comes next.</p>
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Our culture</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">Five values. One community.</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {["Excellence", "Integrity", "Innovation", "Collaboration", "Equity"].map((v, i) => (
              <div key={v} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="font-display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-display text-xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">What we're creating in India</p>
          <h2 className="mt-3 font-display text-5xl md:text-6xl">More than a campus — a learning ecosystem.</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "01", h: "A world-class academic environment", p: "Delivering UWA's curriculum to the same standards as our Australian campuses." },
              { k: "02", h: "Industry collaboration", p: "Supporting innovation, entrepreneurship and employability in sectors where India is rapidly accelerating." },
              { k: "03", h: "A vibrant community", p: "Strengthening Australia–India educational partnerships for families, students and alumni." },
              { k: "04", h: "A launchpad for leaders", p: "Grounded in UWA's values and responsive to India's dynamic, evolving landscape." },
            ].map((c) => (
              <div key={c.k} className="rounded-3xl border border-border bg-background p-7 hover-lift">
                <span className="font-display text-5xl text-gold">{c.k}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight">{c.h}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.p}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-16 max-w-4xl border-l-4 border-gold pl-6 font-display text-3xl leading-tight md:text-4xl">
            "UWA India reflects our belief that education should be borderless — empowering students to access world-class learning close to home while connecting with global opportunities."
          </blockquote>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Looking ahead</p>
          <h2 className="mt-3 max-w-4xl font-display text-5xl leading-tight md:text-7xl">
            We're not just opening new campuses.<br /><em className="text-primary/60 not-italic">We're opening the next chapter.</em>
          </h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {["A stronger bridge between Australia and India", "New possibilities for students across both nations", "A community where culture, excellence and opportunity come together"].map((t) => (
              <li key={t} className="rounded-3xl border border-border bg-background p-8 font-display text-2xl leading-tight">{t}</li>
            ))}
          </ul>
          <div className="mt-12">
            <Link to="/study" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Explore our courses <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
