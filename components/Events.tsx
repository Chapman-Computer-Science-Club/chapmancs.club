import Image from "next/image";

const events = [
  { icon: "[WS]", title: "Workshops", desc: "Hands-on technical workshops covering tools, frameworks, and fundamentals you won't find in the classroom.", image: "/events/workshops.jpg" },
  { icon: "[CV]", title: "Resume Reviews", desc: "Get your resume critiqued by peers and guests with real industry experience before it lands in a recruiter's hands.", image: "/events/resume.jpg" },
  { icon: "[SE]", title: "Speaker Events", desc: "Industry professionals join us for talks and Q&As on careers, specialties, and what working in tech actually looks like.", image: "/events/speakers.jpg" },
  { icon: "[PH]", title: "Hackathons", desc: "Compete, collaborate, and build something in 24 hours. We host PantherHacks every year and coordinate attendance at others.", image: "/events/hackathons.jpg" },
  { icon: "[BD]", title: "Bonding Activities", desc: "Game nights, movie nights, coffee runs, and other ways to hang out with members outside of meetings.", image: "/events/bonding.jpg" },
];

export default function Events() {
  return (
    <section id="events" className="bg-[#1A0F10] w-full py-24 px-12">
      <div className="max-w-[1100px] mx-auto">
        {/* <p className="font-mono text-[11px] text-[#F8F4EF]/50 tracking-[0.12em] uppercase mb-3.5 flex items-center gap-2.5 reveal">
          <span className="inline-block w-6 h-px bg-[#F8F4EF]/40" />
          What We Do
        </p> */}
        <h2 className="font-mono text-[clamp(24px,3vw,38px)] font-bold text-[#F8F4EF] leading-tight mb-4 reveal reveal-delay-1">
          Events for everyone
        </h2>
        <p className="text-base text-[#F8F4EF]/55 max-w-[560px] leading-relaxed font-light mb-14 reveal reveal-delay-2">
          From weekly meetings to campus-wide events, we keep the calendar full.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-[#F8F4EF]/[0.08] border border-[#F8F4EF]/[0.08]">
          {events.map((e, i) => (
            <div
              key={e.title}
              className={`group relative p-9 px-7 bg-[#1A0F10] overflow-hidden transition-all duration-300 hover:scale-[1.06] hover:z-10 hover:shadow-2xl cursor-pointer reveal reveal-delay-${i + 1}`}
            >
              {/* Hover image */}
              {e.image && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <Image
                    src={e.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F10] via-[#1A0F10]/85 to-[#1A0F10]/40" />
                </div>
              )}

              {/* Content */}
              <div className="relative">
                <div className="font-vt text-4xl text-maroon mb-4 transition-colors group-hover:text-maroon-light">{e.icon}</div>
                <div className="font-mono text-[13px] font-bold text-[#F8F4EF] mb-2.5">{e.title}</div>
                <div className="text-[13px] text-[#F8F4EF]/50 leading-relaxed group-hover:text-[#F8F4EF]/80 transition-colors">{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
