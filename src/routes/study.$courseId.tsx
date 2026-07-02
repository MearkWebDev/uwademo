import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, MapPin, Clock, GraduationCap, Briefcase, ChevronDown, Sparkles } from "lucide-react";
import { getCourse, structureNote, type Course } from "@/data/courses";
import courseCsImg from "@/assets/course-cs.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/study/$courseId")({
  loader: ({ params }): Course => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Course"} — UWA India` },
      { name: "description", content: loaderData?.tagline ?? "UWA India course details." },
      { property: "og:title", content: `${loaderData?.name ?? "Course"} — UWA India` },
      { property: "og:description", content: loaderData?.overview?.slice(0, 180) ?? "" },
    ],
  }),
  component: CourseDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-4 pt-24 text-center">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Not found</p>
        <h1 className="mt-3 font-display text-5xl">That course isn't listed.</h1>
        <Link to="/study" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Back to Course Explorer
        </Link>
      </div>
    </div>
  ),
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "why", label: "Why study" },
  { id: "careers", label: "Careers" },
  { id: "structure", label: "Structure" },
  { id: "fees", label: "Fees" },
  { id: "admissions", label: "Admissions" },
  { id: "apply", label: "How to apply" },
  { id: "faq", label: "FAQ" },
];

function CourseDetail() {
  const course = Route.useLoaderData() as Course;
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary pt-40 pb-16 text-primary-foreground lg:pt-52 lg:pb-24">
        <img src={courseCsImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/study" className="story-link">Study</Link>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground/90">{course.name}</span>
          </nav>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {course.level}
          </span>
          <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[1.02] text-balance md:text-8xl">
            {course.degree}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75">{course.tagline}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <Fact icon={Clock} v={course.duration} />
            <Fact icon={MapPin} v={course.campuses.join(" · ")} />
            <Fact icon={GraduationCap} v={`Code · ${course.code}`} />
          </div>
        </div>
      </section>

      {/* STICKY IN-PAGE NAV */}
      <div className="sticky top-[64px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-6 overflow-x-auto px-5 lg:px-10">
          <div className="flex gap-1 py-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                  active === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {s.label}
              </a>
            ))}
          </div>
          <a href="#apply" className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground md:inline-flex">
            Apply Now <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-20 lg:grid-cols-[1fr_320px] lg:gap-20 lg:px-10 lg:py-32">
        <div className="min-w-0 space-y-24">
          {/* OVERVIEW */}
          <section id="overview">
            <SectionHead eyebrow="Course details" title="Overview" />
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85">{course.overview}</p>
            <p className="mt-4 max-w-3xl text-muted-foreground">{course.about}</p>
          </section>

          {/* WHY */}
          <section id="why">
            <SectionHead eyebrow="Why study" title={course.name} />
            <p className="mt-6 max-w-3xl text-lg text-foreground/85">{course.why}</p>
            <h3 className="mt-10 font-display text-2xl">You'll learn to</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {course.learn.map((l) => (
                <li key={l} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-5 hover-lift">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-sm">{l}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CAREERS */}
          <section id="careers">
            <SectionHead eyebrow="Where this leads" title="Career opportunities" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {course.careers.map((c, i) => (
                <div key={c} className={cn("group relative overflow-hidden rounded-3xl border border-border bg-background p-7 hover-lift", i === 1 && "md:translate-y-6")}>
                  <div className="absolute -right-4 -top-4 grid size-24 place-items-center rounded-full bg-primary/5 font-display text-4xl text-primary/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <Briefcase className="size-6 text-primary" />
                  <p className="mt-6 font-display text-2xl leading-tight">{c}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STRUCTURE */}
          <section id="structure">
            <SectionHead eyebrow="What you'll study" title="Course structure" />
            <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{structureNote}</p>
            <div className="mt-10 space-y-8">
              {course.structure.map((y) => (
                <div key={y.year} className="rounded-3xl border border-border bg-background p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{y.year}</p>
                      <p className="font-display text-2xl">{y.heading}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{y.units.length} units</span>
                  </div>
                  <div className="mt-4 divide-y divide-border">
                    {y.units.map((u) => (
                      <div key={u.code} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 text-sm">
                        <span className="font-mono text-xs text-muted-foreground">{u.code}</span>
                        <span className="min-w-0 truncate md:whitespace-normal">{u.name}</span>
                        <span className="text-xs text-muted-foreground">{u.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEES */}
          <section id="fees">
            <SectionHead eyebrow="Investment" title="Fees & scholarships" />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {course.fees.map((f) => (
                <div key={f.label} className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">{f.label}</p>
                  <p className="mt-3 font-display text-4xl text-gold">{f.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Fees are subject to annual review by the University and may increase annually. The indicative fees listed here are based on an estimated average and are for tuition only; other fees and charges are not included. Fees for UWA India are approved in AUD and shown here in INR for indicative purposes only, based on an estimated exchange rate.
            </p>
            <div className="mt-6 rounded-3xl border border-gold/40 bg-gold/10 p-6">
              <p className="font-display text-xl">Scholarships</p>
              <p className="mt-2 text-sm text-foreground/80">
                Scholarships and awards for undergraduate and postgraduate students are currently being developed for UWA India. Further details on eligibility, application processes, and available awards will be shared closer to when applications open. Interested students are encouraged to register their interest to be among the first notified.
              </p>
            </div>
          </section>

          {/* ADMISSIONS */}
          <section id="admissions">
            <SectionHead eyebrow="Who can apply" title="Admission requirements" />
            <div className="mt-6 rounded-3xl border-l-4 border-gold bg-cream p-6 text-sm leading-relaxed text-foreground/80">
              Admission to UWA India campuses is based on a fair and holistic evaluation of every applicant. Eligibility criteria represent the minimum academic requirements to apply; final admission decisions consider a combination of factors. No separate admission test is required. Meeting the eligibility criteria does not guarantee admission.
            </div>
            <div className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Prerequisite</p>
              <p className="mt-2 text-lg">{course.prerequisites}</p>
            </div>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
              {course.admissions.map((a, i) => (
                <AdmissionRow key={i} q={a.qualification} r={a.requirement} />
              ))}
            </div>
          </section>

          {/* APPLY */}
          <section id="apply">
            <SectionHead eyebrow="Next step" title="How to apply" />
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {["Register your interest", "Submit your application", "Receive your offer"].map((step, i) => (
                <li key={step} className="rounded-3xl border border-border bg-background p-6">
                  <span className="font-display text-5xl text-gold">{i + 1}</span>
                  <p className="mt-3 font-display text-xl">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground">Apply Now</Link>
              <Link to="/contact" className="rounded-full border border-border bg-background px-7 py-4 text-sm font-semibold">Talk to admissions</Link>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <SectionHead eyebrow="Answers" title="Frequently asked" />
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
              {faqs.map((f, i) => <Faq key={i} {...f} />)}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="rounded-3xl border border-border bg-cream p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Quick facts</p>
            <dl className="mt-4 space-y-3">
              {course.quickFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className="text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-4 rounded-3xl bg-primary p-6 text-primary-foreground">
            <Sparkles className="size-5 text-gold" />
            <p className="mt-3 font-display text-2xl leading-tight">Ready to apply?</p>
            <p className="mt-2 text-sm text-primary-foreground/70">Inaugural intake · September 2026</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
              Apply Now <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Sticky mobile apply */}
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <Link to="/contact" className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-elegant">
          Apply for {course.name} <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-xs uppercase tracking-[0.22em] text-gold-foreground/70">{eyebrow}</span>
      <div className="h-px flex-1 bg-border" />
      <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

function Fact({ icon: Icon, v }: { icon: React.ComponentType<{ className?: string }>; v: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
      <Icon className="size-4 text-gold" />
      <span>{v}</span>
    </div>
  );
}

function AdmissionRow({ q, r }: { q: string; r: string }) {
  return (
    <div className="grid grid-cols-1 gap-2 p-5 md:grid-cols-[1fr_1.2fr] md:gap-6 md:p-6">
      <div className="font-medium">{q}</div>
      <div className="text-sm text-muted-foreground">{r}</div>
    </div>
  );
}

const faqs = [
  { q: "When do classes begin?", a: "The inaugural teaching term commences in September 2026 at both campuses." },
  { q: "Do I need to sit an admission test?", a: "No separate admission test is required. Admission is based on a holistic academic evaluation." },
  { q: "Will my degree be recognised globally?", a: "Yes. UWA India degrees are delivered to the academic standards of The University of Western Australia — a Top 100 Go8 university." },
  { q: "Are scholarships available?", a: "Scholarships are currently being developed. Register your interest to be notified as soon as they open." },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left hover:bg-secondary/50"
      >
        <span className="font-display text-xl">{q}</span>
        <ChevronDown className={cn("size-5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      <div className={cn("grid overflow-hidden transition-[grid-template-rows] duration-500", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-6 text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
