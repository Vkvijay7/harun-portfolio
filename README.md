# M. Mohamed Harun Rasheed Baik — Professional Portfolio

A high-fidelity single-page portfolio built from the source PDF
(`Harun_Portfolio_Minimal.pdf`) for an **automotive after-sales / dealership
service management** profile — Area Service Manager, Territory Service Manager,
After-Sales Service and Dealer Development.

## Stack

- **React 18** + **Vite 5** (JSX, no CSS framework)
- Hand-written CSS with design tokens: black page, beige/white cards, red ink
- Plain JS interaction layer: IntersectionObserver reveals, count-up stats,
  scroll progress, active-section nav, cursor spotlight — no animation library

## Run

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## Structure

```
index.html                  shell, fonts, SEO meta
public/
  favicon.svg
  M-Mohamed-...-Portfolio.pdf   downloadable source PDF
src/
  main.jsx                  entry
  App.jsx                   section composition
  data/profile.js           ALL content — single source of truth
  hooks/useScrollFx.js      two-way reveal, count-up, progress, active section
  palettes.js               6 colour combinations (ink/card/red/yellow/green)
  hooks/usePalette.js       applies a palette to :root as CSS custom properties
  components/
    KineticGrid.jsx         canvas lattice: warps to the cursor, ripples on click
    PaletteMenu.jsx         swatch popover for switching colour combination
    Nav.jsx                 sticky nav, progress bar, mobile drawer, palette picker
    Hero.jsx                name, rotating roles, contact, live stat gauges
    Profile.jsx             professional profile + fact sheet
    Capabilities.jsx        7 capability cards (spotlight hover)
    Experience.jsx          timeline
    Skills.jsx              8 skill groups / 44 competencies
    Education.jsx           education + language proficiency
    Contact.jsx             career objective + contact card
    Footer.jsx              footer + back-to-top
    Icon.jsx                inline SVG icon set
    Reveal.jsx              scroll-reveal wrapper (plays on the way up too)
```

## Editing content

Everything displayed on the page lives in [`src/data/profile.js`](src/data/profile.js).
Change a number, bullet or skill there and it updates everywhere — no component
edits needed.

## Notes

- Content is taken verbatim from the source PDF. The hero gauge percentages are
  presentational only; the figures beside them (`1 Main + 2 Sub`, `~20`, `~10`,
  `8+`) are the real values.
- Respects `prefers-reduced-motion`, keyboard focus rings, `aria-current` on the
  active nav link, and prints cleanly.
