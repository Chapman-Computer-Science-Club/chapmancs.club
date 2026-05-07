import Image from "next/image";
import Link from "next/link";

export default function PantherHacks() {
  return (
    <section id="pantherhacks" className="max-w-[1100px] mx-auto px-12 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-center">
        <div className="reveal rounded-sm aspect-[4/3] relative overflow-hidden">
          <Image
            src="/PantherHacks.JPG"
            alt="PantherHacks hackathon"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <span className="font-mono text-[11px] text-white/80 uppercase tracking-widest absolute bottom-5 left-6 drop-shadow">
            pantherhacks.dev
          </span>
        </div>

        {/* Content */}
        <div className="reveal reveal-delay-2">
          <span className="inline-block bg-maroon text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm mb-5">
            2nd Annual Hackathon
          </span>
          <h2 className="font-mono text-[clamp(22px,2.5vw,34px)] font-bold text-ink leading-tight mb-4">
            PantherHacks: Chapman&apos;s annual hackathon
          </h2>
          <p className="text-[15px] text-muted leading-relaxed font-light mb-7">
            PantherHacks is our flagship event: a hackathon organized and run entirely by
            Chapman CS Club. 2026 marks our <strong>second annual</strong> run, bringing together over 80 students from UCLA, UCI, CSULB, and more to build, compete,
            and collaborate over a 48-hour timespan.
          </p>
          <Link
            href="https://pantherhacks.dev/"
            target="_blank"
            className="font-mono text-xs text-maroon tracking-wide border-b border-maroon pb-0.5 hover:opacity-70 transition-opacity"
          >
            Visit pantherhacks.dev →
          </Link>
        </div>
      </div>
    </section>
  );
}
