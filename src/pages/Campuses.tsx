import { usePageMeta } from "@/hooks/use-page-meta";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import mumbaiImg from "@/assets/mumbai-campus.jpg";
import chennaiImg from "@/assets/chennai-campus.jpg";

function Campuses() {
  usePageMeta({ title: 'Campuses — UWA India in Mumbai and Chennai', description: "UWA India campuses in Mumbai and Chennai — where global education meets India's most dynamic cities." });
  return (
    <>
      <section className="relative bg-primary pt-40 pb-16 text-primary-foreground lg:pt-52 lg:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60">
            <Link to="/" className="story-link">Home</Link> <span className="mx-2">/</span> Campuses
          </nav>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] text-balance md:text-8xl">
            Two campuses. <em className="text-gold not-italic">Two cities.</em> One UWA.
          </h1>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-2">
          {[
            { id: "mumbai", city: "Mumbai", tag: "India's financial capital", img: mumbaiImg, blurb: "In Andheri — at the heart of Mumbai's business ecosystem, minutes from the metro and international airport." },
            { id: "chennai", city: "Chennai", tag: "India's industrial powerhouse", img: chennaiImg, blurb: "A major centre for education, industry, and innovation on India's south-eastern coast." },
          ].map((c) => (
            <Link
              key={c.id}
              to={`/campuses/${c.id}`}
              className="group relative h-[560px] overflow-hidden rounded-4xl"
            >
              <img src={c.img} alt={c.city} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-10 text-primary-foreground">
                <MapPin className="size-6 text-gold" />
                <h2 className="mt-3 font-display text-7xl">{c.city}</h2>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/70">{c.tag}</p>
                <p className="mt-5 max-w-md text-sm text-white/85">{c.blurb}</p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
                  Explore {c.city} <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Campuses;
