import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, CheckCircle2, MapPin, Clock, GraduationCap, Briefcase,
  ChevronDown, Sparkles, Star, Download, Award, TrendingUp, Building2,
  Rocket, BookOpen, HandCoins, GraduationCap as GradIcon, Compass,
  Beaker, Users, Plane, Trophy,
} from "lucide-react";
import { getCourse, structureNote, type Course } from "@/data/courses";
import { getMeta } from "@/data/course-meta";
import courseCsImg from "@/assets/course-cs.jpg";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/hooks/use-page-meta";

const sections = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "structure", label: "Course Structure", icon: Compass },
  { id: "careers", label: "Career Outcomes", icon: Briefcase },
  { id: "experience", label: "Learning Experience", icon: Beaker },
  { id: "journey", label: "Student Journey", icon: Rocket },
  { id: "fees", label: "Fees & Scholarships", icon: HandCoins },
  { id: "admissions", label: "Admission", icon: GradIcon },
  { id: "faq", label: "FAQs", icon: Sparkles },
  { id: "apply", label: "Contact", icon: Users },
];

function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourse(courseId) : undefined;
  const [active, setActive] = useState("overview");
  usePageMeta({
    title: course ? `${course.name} — UWA India` : "Course — UWA India",
    description: course?.tagline ?? "UWA India course details.",
  });

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

  if (!course) return <NotFoundCourse />;
  const meta = getMeta(course.slug);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-cream to-white pt-36 pb-16 text-foreground lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute -top-32 -right-32 size-[520px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-[520px] rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Link to="/" className="story-link">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/study" className="story-link">Courses</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{course.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary shadow-soft">
                  {course.level}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
                  <Award className="size-3 text-gold" /> {course.category}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-soft">
                  <TrendingUp className="size-3 text-gold" /> {meta.graduateOutcome}% outcomes
                </span>
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-balance text-primary md:text-6xl lg:text-7xl">
                {course.degree}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{course.tagline}</p>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Link to="/enquire" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5">
                  Apply Now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a href="#apply" className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-7 py-4 text-sm font-semibold text-primary shadow-soft hover:bg-cream">
                  <Download className="size-4" /> Download Brochure
                </a>
              </div>
              <p className="mt-6 max-w-2xl rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-xs leading-relaxed text-primary">
                UWA is working closely with the University Grants Commission (UGC) to secure the necessary approvals for its proposed campuses and course offerings. Courses will commence following receipt of required approvals.
              </p>
            </div>

            {/* Floating quick-facts card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-elegant">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/15 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Quick facts</p>
                    <div className="inline-flex items-center gap-1 text-xs text-primary">
                      <Star className="size-3.5 fill-gold text-gold" /> {meta.rating}/5
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <QuickFact icon={Clock} label="Duration" value={course.duration.split("·")[0].trim()} />
                    <QuickFact icon={MapPin} label="Campus" value={course.campuses.join(" · ")} />
                    <QuickFact icon={GraduationCap} label="Code" value={course.code} />
                    <QuickFact icon={Sparkles} label="Intake" value={meta.nextIntake} />
                  </div>
                  <div className="mt-5 rounded-2xl bg-primary p-4 text-primary-foreground">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">Avg. graduate salary</p>
                    <p className="mt-1 font-display text-3xl text-gold">₹{meta.salaryMin}–{meta.salaryMax}L</p>
                    <p className="text-[11px] text-primary-foreground/70">per annum, entry-level</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT with left sticky nav */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-10 lg:py-24">
        {/* LEFT STICKY SIDE NAV */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">On this page</p>
          <nav className="mt-4 space-y-0.5 border-l border-border">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "relative -ml-px flex items-center gap-2.5 border-l-2 py-2.5 pl-4 text-sm transition-all",
                    isActive
                      ? "border-gold font-semibold text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  <s.icon className={cn("size-4", isActive ? "text-gold" : "text-muted-foreground")} />
                  {s.label}
                </a>
              );
            })}
          </nav>
          <Link to="/enquire" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground">
            Apply Now <ArrowUpRight className="size-4" />
          </Link>
        </aside>

        <div className="min-w-0 space-y-28">
          {/* OVERVIEW */}
          <section id="overview">
            <SectionHead eyebrow="About this programme" title="Overview" />
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/85">{course.overview}</p>
            <p className="mt-4 max-w-3xl text-muted-foreground">{course.about}</p>

            {/* Why choose - icon timeline */}
            <div className="mt-14">
              <h3 className="font-display text-3xl">Why choose this course</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{course.why}</p>
              <ul className="mt-8 grid gap-4 md:grid-cols-2">
                {course.learn.map((l, i) => (
                  <li key={l} className="group relative flex items-start gap-4 rounded-3xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-elegant">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition group-hover:bg-gold group-hover:text-gold-foreground">
                      <CheckCircle2 className="size-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">0{i + 1}</p>
                      <p className="mt-1 text-sm leading-relaxed">{l}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* STRUCTURE */}
          <section id="structure">
            <SectionHead eyebrow="Curriculum" title="Course structure" />
            <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{structureNote}</p>
            <div className="mt-10 space-y-6">
              {course.structure.map((y, yi) => (
                <div key={y.year} className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 md:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-gold to-primary" style={{ width: `${((yi + 1) / course.structure.length) * 100}%` }} />
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{y.year}</p>
                      <p className="font-display text-3xl">{y.heading}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{y.units.length} units</span>
                  </div>
                  <div className="mt-4 grid gap-x-8 md:grid-cols-2">
                    {y.units.map((u) => (
                      <div key={u.code} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border/60 py-3 text-sm last:border-b-0">
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

          {/* CAREER OUTCOMES */}
          <section id="careers">
            <SectionHead eyebrow="Where this leads" title="Career outcomes" />
            <div className="mt-10 grid gap-5 md:grid-cols-[1.5fr_1fr]">
              <div className="rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/85 p-8 text-primary-foreground">
                <p className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60">Avg. graduate salary</p>
                <p className="mt-3 font-display text-6xl text-gold">₹{getMeta(course.slug).salaryMin}–{getMeta(course.slug).salaryMax}L</p>
                <p className="mt-1 text-sm text-primary-foreground/70">Per annum, first role after graduation.</p>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
                  <div>
                    <p className="font-display text-3xl text-gold">{getMeta(course.slug).graduateOutcome}%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/60">Employed</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-gold">6mo</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/60">Avg. time-to-hire</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-gold">150k+</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-primary-foreground/60">Alumni network</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-background p-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Graduate destinations</p>
                <ul className="mt-4 space-y-2">
                  {getMeta(course.slug).topEmployers.map((e) => (
                    <li key={e} className="flex items-center justify-between border-b border-border py-2 last:border-b-0">
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        <Building2 className="size-4 text-gold" /> {e}
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
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

          {/* LEARNING EXPERIENCE */}
          <section id="experience">
            <SectionHead eyebrow="Beyond the classroom" title="Learning experience" />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Beaker, t: "Modern Laboratories", d: "State-of-the-art labs for hands-on research and prototyping." },
                { icon: Building2, t: "Industry Projects", d: "Live briefs from partner organisations across the Indo-Pacific." },
                { icon: Briefcase, t: "Internships", d: "Placements with global firms and India's leading employers." },
                { icon: Plane, t: "International Pathway", d: "Progress to UWA Perth or partner campuses mid-degree." },
              ].map((x) => (
                <div key={x.t} className="group rounded-3xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-elegant">
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground transition group-hover:bg-gold group-hover:text-gold-foreground">
                    <x.icon className="size-5" />
                  </span>
                  <p className="mt-5 font-display text-xl">{x.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STUDENT JOURNEY - Interactive Roadmap */}
          <StudentJourney />

          {/* FEES */}
          <section id="fees">
            <SectionHead eyebrow="Investment" title="Fees & scholarships" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {course.fees.map((f) => (
                <div key={f.label} className="relative overflow-hidden rounded-3xl border border-white/10 bg-primary p-8 text-primary-foreground shadow-elegant">
                  <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/20 blur-3xl" />
                  <p className="relative text-[11px] uppercase tracking-[0.22em] text-primary-foreground/60">{f.label}</p>
                  <p className="relative mt-3 font-display text-5xl text-gold">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-gold/40 bg-gold/10 p-6">
                <Award className="size-5 text-gold" />
                <p className="mt-3 font-display text-xl">Scholarships</p>
                <p className="mt-2 text-sm text-foreground/80">
                  Scholarships and awards are being developed for UWA India. Register your interest to be among the first notified.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <HandCoins className="size-5 text-primary" />
                <p className="mt-3 font-display text-xl">Flexible payment plans</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Semester-wise instalments and education loan partnerships with leading Indian and international lenders.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Fees are subject to annual review and may increase annually. Indicative fees are for tuition only; other fees and charges are not included. UWA India fees are approved in AUD and shown here in INR for indicative purposes only.
            </p>
          </section>

          {/* ADMISSIONS */}
          <section id="admissions">
            <SectionHead eyebrow="Who can apply" title="Admission" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { n: "01", t: "Register", d: "Submit your expression of interest online." },
                { n: "02", t: "Apply", d: "Complete the application with your academic record." },
                { n: "03", t: "Offer", d: "Receive a holistic admission decision." },
              ].map((s) => (
                <div key={s.n} className="relative rounded-3xl border border-border bg-background p-6">
                  <p className="font-display text-5xl text-gold">{s.n}</p>
                  <p className="mt-3 font-display text-xl">{s.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border-l-4 border-gold bg-cream p-6 text-sm leading-relaxed text-foreground/80">
              Admission is based on a fair and holistic evaluation. Eligibility criteria represent the minimum academic requirements to apply; final admission decisions consider a combination of factors. No separate admission test is required.
            </div>
            <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">Prerequisite</p>
              <p className="mt-2 text-lg">{course.prerequisites}</p>
            </div>
            <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
              {course.admissions.map((a, i) => (
                <AdmissionRow key={i} q={a.qualification} r={a.requirement} />
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <SectionHead eyebrow="Answers" title="Frequently asked" />
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
              {faqs.map((f, i) => <Faq key={i} {...f} />)}
            </div>
          </section>

          {/* APPLY / CONTACT CTA */}
          <section id="apply" className="relative overflow-hidden rounded-4xl bg-primary p-10 text-primary-foreground md:p-16">
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-white/5 blur-3xl" />
            <div className="relative max-w-3xl">
              <Trophy className="size-8 text-gold" />
              <h2 className="mt-6 font-display text-5xl leading-[1.02] text-balance md:text-6xl">
                Ready to become part of the <em className="text-gold not-italic">inaugural cohort</em>?
              </h2>
              <p className="mt-6 max-w-xl text-lg text-primary-foreground/75">
                Applications for {course.name} at UWA India are open now. Reserve your seat for the September 2026 intake.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/enquire" className="rounded-full bg-gold px-7 py-4 text-sm font-semibold text-gold-foreground hover:-translate-y-0.5">
                  Apply Now
                </Link>
                <Link to="/enquire" className="rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
                  Book Consultation
                </Link>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
                  <Download className="size-4" /> Download Brochure
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky mobile apply */}
      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <Link to="/enquire" className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-elegant">
          Apply for {course.name} <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </>
  );
}

function StudentJourney() {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: GradIcon, t: "Admission", d: "Submit your application and receive a holistic offer within weeks. Onboarding, orientation, and a warm welcome to the cohort.", when: "Month 0" },
    { icon: BookOpen, t: "Learning", d: "Study at our Mumbai or Chennai campus with a curriculum shaped by UWA's Perth academics and Indo-Pacific industry.", when: "Year 1–3" },
    { icon: Briefcase, t: "Internship", d: "Complete industry placements with UWA's partner network — from Bangalore startups to global consulting firms.", when: "Year 2–3" },
    { icon: Trophy, t: "Graduation", d: "Graduate with a globally-recognised UWA degree and a portfolio of real-world projects and industry references.", when: "Year 3" },
    { icon: Rocket, t: "Career", d: "Launch into a global career backed by a 150,000-strong alumni network and dedicated UWA India careers support.", when: "Year 3+" },
  ];

  return (
    <section id="journey">
      <SectionHead eyebrow="From day one to graduation" title="Your student journey" />
      <p className="mt-4 max-w-2xl text-muted-foreground">
        An interactive roadmap of what your time at UWA India looks like — click any milestone to explore.
      </p>

      <div className="mt-12 rounded-4xl border border-border bg-gradient-to-br from-cream via-background to-cream p-6 md:p-10">
        {/* Roadmap track */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-border md:block" />
          <div
            className="absolute left-0 top-6 hidden h-0.5 bg-gradient-to-r from-primary via-gold to-primary transition-all duration-700 md:block"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          />
          <ol className="relative grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => {
              const isActive = step === i;
              const done = step > i;
              return (
                <li key={s.t}>
                  <button
                    onClick={() => setStep(i)}
                    className={cn(
                      "group flex w-full flex-col items-start gap-3 md:items-center md:text-center",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full border-2 transition-all duration-500",
                        isActive
                          ? "scale-110 border-gold bg-gold text-gold-foreground shadow-gold"
                          : done
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground group-hover:border-primary",
                      )}
                    >
                      <s.icon className="size-5" />
                    </span>
                    <span className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", isActive ? "text-gold" : "text-muted-foreground")}>
                      {s.when}
                    </span>
                    <span className={cn("font-display text-lg leading-tight", isActive ? "text-primary" : "text-foreground")}>
                      {s.t}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active step detail */}
        <div key={step} className="mt-10 rounded-3xl border border-border bg-background p-8 shadow-soft fade-up md:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
              {(() => { const Icon = steps[step].icon; return <Icon className="size-6" />; })()}
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{steps[step].when}</p>
              <h3 className="mt-1 font-display text-4xl">{steps[step].t}</h3>
              <p className="mt-3 max-w-2xl text-foreground/80">{steps[step].d}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-medium text-muted-foreground hover:text-primary disabled:opacity-40"
            >
              ← Previous
            </button>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Step {step + 1} of {steps.length}</span>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="text-sm font-semibold text-primary hover:text-gold disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-5xl leading-[1.02] text-balance md:text-6xl">{title}</h2>
    </div>
  );
}

function QuickFact({
  icon: Icon, label, value,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <Icon className="size-3 text-gold" /> {label}
      </div>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
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
  { q: "Can I transfer to UWA Perth mid-degree?", a: "Yes. UWA India students have structured international pathways to continue at UWA's Perth campus or partner institutions." },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition hover:bg-secondary/50"
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

export default CourseDetail;

function NotFoundCourse() {
  return (
    <div className="grid min-h-screen place-items-center px-4 pt-24 text-center">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Not found</p>
        <h1 className="mt-3 font-display text-5xl">That course isn't listed.</h1>
        <Link to="/study" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Back to Course Explorer</Link>
      </div>
    </div>
  );
}
