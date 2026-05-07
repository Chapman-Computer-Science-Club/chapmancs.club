import type { Metadata } from "next";
import { VT323, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import ThemeToggle from "@/components/ThemeToggle";
import BinaryBackground from "@/components/BinaryBackground";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chapman Computer Science Club",
  description:
    "Chapman University's CS Club — connect, collaborate, and create in the field of computer science.",
  icons: {
    icon: "/old_cs_logo.png",
    shortcut: "/old_cs_logo.png",
    apple: "/old_cs_logo.png",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${vt323.variable} ${spaceMono.variable} ${dmSans.variable} bg-cream overflow-x-hidden`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="text-ink font-sans overflow-x-hidden">
        <BinaryBackground />
        <ScrollReveal />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
