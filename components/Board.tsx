import { Fragment } from "react";
import Image from "next/image";
import { boardTiers, type BoardMember } from "@/lib/boardData";

function BoardCard({ member, delay }: { member: BoardMember; delay: number }) {
  const className = `block border border-maroon/15 rounded-sm overflow-hidden hover:border-maroon hover:-translate-y-0.5 transition-all reveal reveal-delay-${delay}`;

  const inner = (
    <>
      <div className="w-full aspect-square bg-[repeating-linear-gradient(45deg,rgba(123,28,44,0.05)_0px,rgba(123,28,44,0.05)_2px,transparent_2px,transparent_10px)] flex items-center justify-center">
        {member.photo ? (
          <Image src={member.photo} alt={member.name} width={200} height={200} className="w-full h-full object-cover" />
        ) : (
          <span className="font-vt text-xs text-muted opacity-40 text-center px-1 leading-snug">photo</span>
        )}
      </div>
      <div className="p-3 px-4">
        <div className="font-mono text-[12px] font-bold text-ink mb-1">{member.name}</div>
        <div className="text-[11px] text-maroon tracking-wide">{member.role}</div>
      </div>
    </>
  );

  if (member.linkedin) {
    return (
      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export default function Board() {
  return (
    <section id="board" className="max-w-[1100px] mx-auto px-12 py-24">
      {/* <p className="font-mono text-[11px] text-maroon tracking-[0.12em] uppercase mb-3.5 flex items-center gap-2.5 reveal">
        <span className="inline-block w-6 h-px bg-maroon" />
        The Team
      </p> */}
      <h2 className="font-mono text-[clamp(24px,3vw,38px)] font-bold text-ink leading-tight mb-4 reveal reveal-delay-1">
        Meet the Board
      </h2>
      <p className="text-base text-muted max-w-[560px] leading-relaxed font-light mb-14 reveal reveal-delay-2">
        Our executive board keeps the club running. Interested in joining the board? Come to a meeting and get involved.
      </p>

      {/* Desktop: merged 5-column rows (two tiers per row) */}
      <div className="hidden sm:grid grid-cols-5 gap-4 gap-y-2">
        {boardTiers.reduce<{ left: typeof boardTiers[number]; right: typeof boardTiers[number] }[]>((rows, tier, idx) => {
          if (idx % 2 === 0) rows.push({ left: tier, right: boardTiers[idx + 1] });
          return rows;
        }, []).map((row, rowIdx) => {
          const leftSpan = row.left.members.length;
          const rightSpan = row.right.members.length;
          const labelBase = "font-mono text-[10px] text-muted tracking-[0.12em] uppercase pb-2 border-b border-maroon/15";
          const spanClass = (n: number) => (n === 2 ? "col-span-2" : "col-span-3");
          return (
            <Fragment key={row.left.label}>
              <div className={`${spanClass(leftSpan)} ${labelBase} ${rowIdx > 0 ? "mt-6" : ""}`}>
                {row.left.label}
              </div>
              <div className={`${spanClass(rightSpan)} ${labelBase} ${rowIdx > 0 ? "mt-6" : ""}`}>
                {row.right.label}
              </div>
              {row.left.members.map((m, i) => (
                <BoardCard key={`${row.left.label}-${i}`} member={m} delay={(i % 4) + 1} />
              ))}
              {row.right.members.map((m, i) => (
                <BoardCard key={`${row.right.label}-${i}`} member={m} delay={((i + leftSpan) % 4) + 1} />
              ))}
            </Fragment>
          );
        })}
      </div>

      {/* Mobile: each tier rendered with its own label + cards */}
      <div className="grid sm:hidden grid-cols-2 gap-4 gap-y-2">
        {boardTiers.map((tier, tierIdx) => (
          <Fragment key={tier.label}>
            <div className={`col-span-2 font-mono text-[10px] text-muted tracking-[0.12em] uppercase pb-2 border-b border-maroon/15 ${tierIdx > 0 ? "mt-6" : ""}`}>
              {tier.label}
            </div>
            {tier.members.map((m, i) => (
              <BoardCard key={`m-${tier.label}-${i}`} member={m} delay={(i % 4) + 1} />
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
