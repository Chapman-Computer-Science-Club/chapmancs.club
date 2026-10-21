import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";

import Shell from "@/components/Shell";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

import "./sacred.css";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s • ${SITE_NAME}` },
  description: "Chapman University's CS Club - connect, collaborate, and create in the field of computer science.",
  twitter: { card: "summary" },
  icons: {
    icon: "/old_cs_logo.png",
    shortcut: "/old_cs_logo.png",
    apple: "/old_cs_logo.png",
  },
};

// runs before paint so that SCRL's theme doesn't flash
const themeInitScript = `(function(){var t='light';try{t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}document.body.classList.add('theme-'+t)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className="tint-red" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
