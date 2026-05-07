import AboutGallery from "./AboutGallery";

export default function About() {
  return (
    <section id="about" className="max-w-[1100px] mx-auto px-12 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left: mission */}
        <div className="reveal">
          {/* <p className="font-mono text-[11px] text-maroon tracking-[0.12em] uppercase mb-3.5 flex items-center gap-2.5">
            <span className="inline-block w-6 h-px bg-maroon" />
            About Us
          </p> */}
          <h2 className="font-mono text-[clamp(24px,3vw,38px)] font-bold text-ink leading-tight mb-4">
            A community built for curious minds
          </h2>
          <p className="text-[17px] text-ink leading-[1.85] font-light">
            The CS Club is open to anyone at Chapman who&apos;s into{" "}
            <strong className="text-maroon font-medium">computer science</strong>. You don&apos;t
            have to be a CS major or even know how to code. If you&apos;re curious about tech and
            innovation, you belong here.
            <br /><br />
            There are no dues and no applications. Just show up,{" "}
            <strong className="text-maroon font-medium">meet people who share your interests</strong>,
            sharpen your skills, and grow alongside us.
          </p>
        </div>

        {/* Right: rotating photo gallery */}
        <div className="reveal reveal-delay-2">
          <AboutGallery />
        </div>
      </div>
    </section>
  );
}
