---
name: Modern Minimalist Portfolio
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#b8c4ff'
  on-secondary: '#1a2b6a'
  secondary-container: '#334282'
  on-secondary-container: '#a2b1f9'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001354'
  on-secondary-fixed-variant: '#334282'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes a poised, articulate digital presence tailored for a Junior Tech & UX Specialist. The visual narrative balances technical rigor with humanist product sensibility: crisp layouts, intentional whitespace, and immaculate micro-interactions that demonstrate foundational UX literacy without performative clutter.

The aesthetic embraces refined modern minimalism set on a deep, charcoal-slate substrate. Visual hierarchy relies on razor-thin borders, gentle indigo-lavender chromatic luminescence, and welcoming pill-shaped geometry. The resulting interface feels calm, highly competent, structured, and unmistakably contemporary.

## Colors
The palette leverages a dark-slate baseline to maintain high contrast and low cognitive fatigue. 

- **Primary (`#6366F1`)**: A vibrant indigo anchor used for primary calls to action, focus states, and primary typographic emphasis.
- **Secondary (`#A5B4FC`)**: Soft pastel lavender for active pill tags, interactive hovers, subtle highlights, and secondary metadata badges.
- **Tertiary (`#38BDF8`)**: Muted sky blue used sparingly for technical badges, code annotations, and status indicators.
- **Neutral (`#0F172A`)**: Rich dark slate forming the foundational canvas, paired with stepped surface containers (`#1E293B`, `#334155`) and crisp, semi-translucent borders (`rgba(148, 163, 184, 0.12)`).

## Typography
Typographic rhythm combines the soft, contemporary geometry of Plus Jakarta Sans for headers with the systematic precision of Inter for dense documentation and body text. 

Maintain negative tracking across display and headline sizes to retain visual density on large viewports. Use `body-lg` for case-study ledes and overview paragraphs, reserving `body-md` and `body-sm` for execution details, specifications, and captions. Labels are set with tight vertical metrics and slight letter spacing for sharp scanning inside pills and chips.

## Layout & Spacing
The layout adheres to a 12-column responsive fluid grid bounded at a maximum container width of `1280px` on desktop, transitioning to an 8-column layout on tablet (`768px - 1024px`) and a 4-column layout on mobile (`< 768px`).

Outer canvas padding leverages generous margins (`4rem` desktop) to maintain a boutique, uncluttered presentation. Gaps between related layout segments adhere strictly to the 4px baseline (`0.25rem` multipliers). Vertical sections maintain `space-xl` breathing room to ensure project breakdowns, UX artifacts, and resume items are parsed cleanly without visual crowding.

## Elevation & Depth
Depth is constructed through subtle tonal transitions layered over the `#0F172A` canvas rather than heavy, distracting drop shadows. 

- **Level 0 (Canvas)**: Baseline background (`#0F172A`).
- **Level 1 (Surface Cards & Panels)**: Elevated containers (`#1E293B`) framed with a 1px hairline border (`rgba(148, 163, 184, 0.12)`).
- **Level 2 (Interactive Floating Elements & Modals)**: Lifted overlays (`#334155`) paired with an ultra-diffused, ambient shadow (`0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(99, 102, 241, 0.06)`).

A very subtle ambient indigo glow is selectively deployed beneath primary action buttons and active project hero cards to indicate elevation without breaking minimalist discipline.

## Shapes
The shape system applies a high-roundedness pill philosophy (`level 3`) to evoke friendly, modern tactile ergonomics. 

- **Pills (`rounded-full` / `9999px`)**: Interactive buttons, category filters, tech stack tags, and status chips.
- **Card Surfaces (`rounded-lg` / `2rem`)**: Project portfolio previews, experiential timelines, and summary callouts.
- **Inner Micro-Surfaces (`rounded` / `1rem`)**: Code snippets, metadata insets, and input fields nestled within larger cards.

## Components

### Buttons
- **Primary**: Full pill shape (`9999px`), solid primary indigo background (`#6366F1`), crisp white text, padding `0.75rem 1.75rem`. Hover triggers a subtle scale of `1.02` and secondary glow (`rgba(99, 102, 241, 0.3)`).
- **Secondary / Ghost**: Full pill shape, translucent background (`rgba(255, 255, 255, 0.04)`), hairline border (`rgba(148, 163, 184, 0.2)`), secondary lavender text (`#A5B4FC`).

### Chips & Badges
- Continuous pill geometry (`9999px`), vertical padding `0.25rem 0.75rem`, set with `label-sm` uppercase or `label-md` normal casing.
- Styled with gentle tinted translucent backdrops (e.g., indigo: `rgba(99, 102, 241, 0.12)`, lavender: `rgba(165, 180, 252, 0.1)`) and matching solid pastel borders.

### Cards (Project & Experience)
- Rounded container (`2rem`), `#1E293B` background, framed with a 1px border (`rgba(148, 163, 184, 0.12)`).
- Padding scales from `1.5rem` on mobile to `2.5rem` on desktop. Internal media containers use `1rem` radius.

### Input Fields
- Enclosed with `1rem` border radius, `#0F172A` fill, and light slate borders. Focus ring illuminates with an indigo outline (`#6366F1`) and a 2px offset.

### Lists & Timelines
- Clean, borderless list rows delineated by thin divider lines (`rgba(148, 163, 184, 0.08)`).
- Experience items utilize pill-shaped chronological tags flanked by micro-accent dots in primary indigo.