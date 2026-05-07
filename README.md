# Chapman CS Club — Next.js

A modern, statically-generated website for Chapman University's Computer Science Club.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Google Fonts** — VT323, Space Mono, DM Sans (loaded via `next/font`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx       # Root layout — fonts, metadata
  page.tsx         # Home page — composes all sections
  globals.css      # Tailwind base + scroll-reveal CSS

components/
  Nav.tsx          # Fixed top nav
  Hero.tsx         # Landing hero with binary bg + stats
  About.tsx        # Mission + activity cards
  Events.tsx       # Dark events grid
  PantherHacks.tsx # Hackathon feature section
  Board.tsx        # Officer grid
  Contact.tsx      # Social links CTA
  Footer.tsx       # Footer
  ScrollReveal.tsx # Intersection observer for .reveal elements

lib/
  boardData.ts     # Board member data — edit this to update names/photos

public/
  cs_logo.png      # Club logo
```

## Customizing Board Members

Edit `lib/boardData.ts`. Each member supports an optional `photo` field:

```ts
{ name: "Michael Masakayan", role: "President", photo: "/board/michael.jpg" }
```

Place photos in `public/board/`.

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
Push to GitHub, connect the repo in Netlify. Build command: `npm run build`. Publish dir: `.next`.

### GitHub Pages
Use `next export` (set `output: "export"` in `next.config.ts`) for a fully static export.

## Add Scroll Reveal

Import `ScrollReveal` in your layout and add it inside `<body>`:

```tsx
import ScrollReveal from "@/components/ScrollReveal";
// inside layout:
<ScrollReveal />
{children}
```
