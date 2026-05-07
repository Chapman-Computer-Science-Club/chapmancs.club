import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-12 py-6 flex flex-wrap justify-between items-center border-t border-maroon/15 gap-2">
      <span className="font-mono text-[10px] text-muted tracking-widest">
        {new Date().getFullYear()} Chapman Computer Science Club · Fowler School of Engineering
      </span>
      <span className="font-mono text-[10px] text-muted tracking-widest">
        Chapman University, Orange, CA
      </span>
    </footer>
  );
}
