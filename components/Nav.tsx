"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#pantherhacks", label: "PantherHacks" },
  { href: "#board", label: "Board" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 max-md:px-6 py-3.5 bg-cream/90 backdrop-blur-md border-b border-maroon/15">
        <Link href="#" className="flex items-center gap-3 no-underline" onClick={() => setOpen(false)}>
          <Image src="/old_cs_logo.png" alt="CS Club Logo" width={36} height={36} className="object-contain" />
          <span className="font-mono text-[13px] font-bold text-maroon leading-tight tracking-wide">
            Chapman<br />CS Club
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] text-muted uppercase tracking-widest hover:text-maroon transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://pantherconnect.chapman.edu/COMPSC/club_signup"
            target="_blank"
            className="font-mono text-[11px] uppercase tracking-widest bg-maroon text-white px-4 py-2 rounded-sm hover:bg-maroon-light transition-colors"
          >
            PantherConnect
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-maroon"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block w-6 h-4">
            <span
              className={`absolute left-0 top-0 w-6 h-0.5 bg-maroon transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] w-6 h-0.5 bg-maroon transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-[14px] w-6 h-0.5 bg-maroon transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-cream/98 backdrop-blur-md transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div
          className="flex flex-col items-start gap-6 px-8 pt-24 pb-12"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-lg text-ink uppercase tracking-widest hover:text-maroon transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://pantherconnect.chapman.edu/COMPSC/club_signup"
            target="_blank"
            onClick={() => setOpen(false)}
            className="font-mono text-sm uppercase tracking-widest bg-maroon text-white px-6 py-3 rounded-sm mt-4"
          >
            PantherConnect
          </Link>

          <div className="mt-6 pt-6 border-t border-maroon/15 w-full">
            <ThemeToggle variant="inline" />
          </div>
        </div>
      </div>
    </>
  );
}
