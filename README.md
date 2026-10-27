# Talk To Heal Counseling Center: landing page

The marketing landing page for Talk To Heal Counseling Center, a psychotherapy group practice in Johns Creek, Georgia.
Built by HyberTec.

Live preview: https://hyber-tec.github.io/talk-to-healing/

## Stack

- Next.js 16 (App Router) with TypeScript in strict mode
- Tailwind CSS 4 with shadcn/ui components and icons from react-icons
- Motion for animation and Lenis for smooth scrolling
- 21st.dev community components, adapted to the brand (each file credits its source):
  Container Scroll Animation, Timeline, Text Reveal, Text Effect, Blur Fade, Infinite Slider, Progressive Blur

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run format     # Prettier with the Tailwind class sorter
```

## Content

Every fact on the page lives in `src/lib/site.ts`: contact details, services, team, insurance plans, journal posts, and FAQ.
Change the content there, not in the components.
Team photos are in `public/team/` as 4:5 portraits named after each person's slug.

## Builds

There are two build targets from one codebase.

| Target                        | Command                                                                | Output                                          |
| ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| Server (production hosting)   | `npm run build`                                                        | A Next.js app with on-demand image optimization |
| Static preview (GitHub Pages) | `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/talk-to-healing npm run build` | Plain files in `out/`                           |

The preview build also sets `NEXT_PUBLIC_PREVIEW=1`, which marks the page `noindex` so search engines never list the preview as a copy of the practice's real site.
Files in `public/` are referenced through `asset()` from `src/lib/asset.ts`, so they resolve under any base path.

Every push to `main` deploys the preview through `.github/workflows/deploy-pages.yml`.

## Accessibility and motion

All animation respects the visitor's reduced-motion setting: the tablet stays flat, the scroll-revealed statement appears whole, and the insurance marquee becomes a still list.
Colors are the logo's own ink and sand, checked for WCAG AA contrast on the cream background.
