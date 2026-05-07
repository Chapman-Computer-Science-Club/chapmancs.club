import Image from "next/image";
import Link from "next/link";

const heroStats = [
  { num: "2021", label: "Founded" },
  { num: "Weekly", label: "Club Meetings" },
  { num: "Free", label: "No Dues, Open to All" },
  { num: "Hackathons", label: "Yearly" },
];

export default function Hero() {
  return (
    <>
    <section className="min-h-screen px-12 pt-28 pb-20 relative overflow-hidden flex items-center">
      <div className="relative max-w-[1100px] mx-auto w-full flex flex-row items-center justify-start gap-8 lg:gap-12">
        <div className="max-w-[600px] w-full relative shrink">
        <h1 className="font-mono text-[clamp(36px,5.5vw,72px)] font-bold text-ink leading-[1.1] mb-7 reveal reveal-delay-1">
          Create.<br />
          Connect.<br />
          <span className="text-maroon">Collaborate.</span>
        </h1>

        <p className="text-[clamp(16px,2vw,19px)] text-muted max-w-[540px] leading-relaxed mb-11 font-light reveal reveal-delay-2">
          Chapman University&apos;s Computer Science Club brings together students from all disciplines
          to build skills, explore technology, and shape their future in tech.
        </p>

        <div className="flex gap-4 flex-wrap reveal reveal-delay-3">
          <Link
            href="https://pantherconnect.chapman.edu/COMPSC/club_signup"
            target="_blank"
            className="bg-maroon text-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest rounded-sm hover:bg-maroon-light hover:-translate-y-px transition-all"
          >
            PantherConnect
          </Link>
          <Link
            href="#about"
            className="border border-maroon text-maroon px-7 py-3.5 font-mono text-xs uppercase tracking-widest rounded-sm hover:bg-maroon hover:text-white hover:-translate-y-px transition-all"
          >
            Learn More
          </Link>
        </div>

        </div>

        {/* Logo — locked next to the text in flex layout, hidden on small screens */}
        <div className="hidden md:block relative shrink-0 -mt-32 w-[clamp(280px,28vw,460px)] aspect-square pointer-events-none reveal reveal-delay-2">
          <Image
            src="/old_cs_logo.png"
            alt=""
            fill
            sizes="(min-width: 768px) 28vw, 0px"
            className="object-contain drop-shadow-[0_8px_24px_rgba(123,28,44,0.25)]"
            priority
          />
        </div>
      </div>
    </section>

    <section className="bg-[#1A0F10] w-full px-12 py-12 reveal">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <div className="font-vt text-xl sm:text-3xl md:text-4xl text-maroon-light leading-none mb-1.5 whitespace-nowrap">{stat.num}</div>
            <div className="text-xs text-[#F8F4EF]/55 tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
