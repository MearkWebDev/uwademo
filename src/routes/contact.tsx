import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Mail, Phone, MapPin } from "lucide-react";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Register your interest — UWA India" },
      { name: "description", content: "Register your interest for UWA India's inaugural September 2026 intake. Admissions, careers and partnership enquiries." },
      { property: "og:title", content: "Contact UWA India" },
      { property: "og:description", content: "A UWA India representative will connect with you to further your journey." },
    ],
  }),
  component: Contact,
});

const tabs = ["Admissions", "Career", "Partnerships"] as const;

function Contact() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Admissions");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="relative bg-primary pt-40 pb-16 text-primary-foreground lg:pt-52 lg:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> Contact
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] md:text-8xl">
            Register your <em className="text-gold not-italic">interest.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75">
            A UWA India representative will connect with you to further your journey with us.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-4xl border border-border bg-background p-8 md:p-12">
            <div className="inline-flex rounded-full border border-border bg-secondary p-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all",
                    tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="mt-12 rounded-3xl border border-gold/40 bg-gold/10 p-10 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-gold text-gold-foreground">
                  <Check className="size-7" />
                </div>
                <h2 className="mt-6 font-display text-3xl">Thank you.</h2>
                <p className="mt-3 max-w-md mx-auto text-muted-foreground">
                  A UWA India representative will connect with you shortly. For anything urgent, email <a className="underline" href="mailto:info.uwaindia@uwa.edu.au">info.uwaindia@uwa.edu.au</a>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="mt-10 grid gap-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="I am enquiring as">
                    <select className="field">
                      <option>Student</option>
                      <option>Parent or Guardian</option>
                      <option>Corporate / Partnership</option>
                      <option>Job seeker / Career</option>
                      <option>Counsellor</option>
                    </select>
                  </Field>
                  <Field label="Intake">
                    <select className="field">
                      <option>Sem 1 · 2026/27</option>
                      <option>Sem 2 · 2026/27</option>
                      <option>Sem 1 · 2027/28</option>
                    </select>
                  </Field>
                  <Field label="Study level">
                    <select className="field">
                      <option>Undergraduate</option>
                      <option>Postgraduate</option>
                    </select>
                  </Field>
                  <Field label="Programme of interest">
                    <select className="field">
                      {courses.map((c) => <option key={c.slug}>{c.name}</option>)}
                    </select>
                  </Field>
                  <Field label="First name"><input className="field" required /></Field>
                  <Field label="Last name"><input className="field" required /></Field>
                  <Field label="Email"><input className="field" type="email" required /></Field>
                  <Field label="Phone"><input className="field" type="tel" /></Field>
                  <Field label="Country"><input className="field" defaultValue="India" /></Field>
                  <Field label="City"><input className="field" /></Field>
                </div>
                <Field label="Message"><textarea className="field min-h-32" /></Field>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" className="mt-1" />
                  <span>Opt in to receive updates about admissions, events and scholarships from UWA India.</span>
                </label>
                <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Submit for {tab.toLowerCase()} <ArrowUpRight className="size-4" />
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl bg-primary p-8 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Contact directory</p>
              <ul className="mt-6 space-y-5">
                {[
                  { i: Mail, l: "General enquiries", v: "info.uwaindia@uwa.edu.au" },
                  { i: Mail, l: "Careers / HR", v: "uwaindia.talent@uwa.edu.au" },
                  { i: Mail, l: "Scholarships", v: "scholarships.uwaindia@uwa.edu.au" },
                  { i: Phone, l: "Perth head office", v: "(+61 8) 6488 6000" },
                  { i: Phone, l: "Emergency", v: "(+61 8) 6488 2222" },
                ].map((x) => (
                  <li key={x.l} className="flex items-start gap-3">
                    <x.i className="mt-0.5 size-4 text-gold" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary-foreground/60">{x.l}</p>
                      <p className="text-sm">{x.v}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-border bg-cream p-8">
              <MapPin className="size-5 text-gold" />
              <p className="mt-4 font-display text-2xl leading-tight">Perth head office</p>
              <p className="mt-2 text-sm text-muted-foreground">35 Stirling Highway, Perth WA 6009, Australia</p>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 12px 14px;
          font-size: 14px;
          transition: border-color .2s, box-shadow .2s;
        }
        .field:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 15%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
