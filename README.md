# chapmancs.club

The website for Chapman University's Computer Science Club, live at [chapmancs.club](https://chapmancs.club). It's
built to feel like a terminal: an `ssh` boot sequence, then a keyboard-driven menu of sections.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **CSS Modules** on top of [SRCL](https://sacred.computer) components and styles
- **Motion** for animation
- **pnpm**, **ESLint**, and **Prettier**

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build           # production build
pnpm typecheck       # tsc across the site
pnpm lint            # eslint (lint:fix to fix)
pnpm format          # prettier across the repo
```

## Project Structure

```
app/
  layout.tsx       # Root layout: font, metadata, theme init script
  page.tsx         # Boot sequence, then the terminal
  globals.css      # Site overrides on top of SRCL (Chapman tint, layout)
  sacred.css       # SRCL base styles and color palette

components/
  Boot.tsx         # "ssh chapmancs.club" boot screen (Esc skips it)
  Terminal.tsx     # Menu, section panel, keyboard navigation, theme toggle
  Marquee.tsx      # Scrolls text that's too long to fit, on hover
  sections/        # One component per menu entry: Home, About, Events, PantherHacks, Board, Contact
  sacred/          # SRCL components (Card, ActionListItem, Avatar, ...)

lib/
  content.ts       # Home stats, gallery photos, events, socials, PantherConnect link
  people.ts        # Everyone who has served on the board
  boardData.ts     # Board roster by year

public/
  board/           # Board member photos
  events/          # Event card images
  gallery/         # About section photo gallery
```

## Editing Content

Most of the site's text and images live in `lib/`, so content changes rarely touch components.

### Board Members

1. Add the person to `lib/people.ts`, keeping it alphabetical by first name. `photo` (a path under `public/`) and
   `linkedin` are optional; members without a photo show their initials.

   ```ts
   export const pete_panther: Person = {
     name: "Pete Panther",
     linkedin: "https://www.linkedin.com/in/...",
     photo: "/board/pete.jpeg",
   };
   ```

2. Add them to the right year and tier in `lib/boardData.ts` with their role. Years are listed newest first.

   ```ts
   m(p.pete_panther, "Dictator");
   ```

## Deployment

The site is hosted on Netlify. Build settings live in the Netlify dashboard; there's no `netlify.toml` in this repo.
