# SmorX.ai Color Palette — Before / After & Accessibility Audit

Scope: color system only. No layout, copy, or structural changes. Palette lives in
`src/theme/colors.js` (runtime/inline-style use) and `tailwind.config.js`
(`theme.extend.colors`) — the two are kept in sync by hand (see comment at the top
of `colors.js`).

## Token summary

| Token | Value | Role |
|---|---|---|
| `primary` | `#2F7FF6` (dark `#2563EB`, light `#5B9DFF`) | Dominant brand hue — electric blue instead of flat navy |
| `violet` / `cyan` (+ light/bright variants) | `#7C3AED`/`#8B5CF6`/`#A78BFA`, `#06B6D4`/`#22D3EE`/`#67E8F9` | Secondary accent — data viz, stats, orchestration diagrams |
| `cta` | `#C2410C` (hover `#9A3412`) | Exclusive to primary action buttons, never used elsewhere |
| `success` | `#10B981` (light `#34D399`) | Positive/status states only |
| `warning` | `#F59E0B` (dark `#D97706`) | Urgency micro-accents only |

## Where each principle landed

- **Blue base, more electric** — hero background, nav, section accents now run on `#2F7FF6` instead of flat navy, while `#060A12`/`#0B1020`/`#080D18`/`#04070F` dark bases are unchanged, so vibrancy reads as an accent layer, not a theme switch.
- **Single CTA accent (orange, `#C2410C`)** — identical color/hover/focus-ring/shape across every primary action: Hero "Build My AI System", Navbar "Get Started", MegaMenu featured strip, Footer "Book Strategy Call", Contact form submit, AgentMarketplace "Deploy This Agent" (`.btn-primary` / `.btn-primary-fill` in `index.css`). Consistency was prioritized over hue choice per the brief.
- **Secondary accent (violet/cyan)** — ImpactSection stat numbers glow cyan (`COLORS.cyanLight`) so they visually outrank surrounding copy; ControlPlane diagram nodes, AgentMarketplace cards, and case-study metrics use the violet/cyan/blue family to keep the "orchestration" visuals dynamic without competing with the CTA orange.
- **Warm amber micro-accent** — the `LIVE CALL` indicator dot in `VoiceAIAgent.jsx` is `#F59E0B` (`warning`), deliberately distinct from the CTA orange so it reads as "live," not "click me."
- **Green reserved for success/status** — `ControlPlane.jsx`'s "Connected" badge is hard-coded to `COLORS.success` regardless of the card's own accent color (see in-code comment); Contact form success state and "All systems operational" footer badge use the same green family.
- **Gradients** — hero headline (`gradient-text`: blue → violet → cyan), footer CTA banner background wash, card hover glows (`GlassCard`'s `glowMap`).
- **Vibrancy via contrast, not saturation everywhere** — accents sit on large dark fields (`#060A12` family); nothing outside the CTA/stat/live-indicator set was brightened.

## Accessibility audit (WCAG AA, 4.5:1 normal text / 3:1 large text)

Ran a script-based check (`relative luminance` per WCAG 2.x) against every foreground/background pairing actually used in the code, compositing opacity/alpha where relevant rather than eyeballing hex values.

### Passing (verified, no change needed)
- White text on `cta` `#C2410C`: **5.18:1** / hover `#9A3412`: **7.31:1**
- `primary`, `primary-light`, `cyan`, `cyan-light`, `success`, `success-light`, `warning`, `violet-bright` as text on dark backgrounds: **7.2–11:1**
- Per-industry/case-study accent colors used as badge/stat text (rose, blue, `#8B5CF6` purple, `#A855F7` purple, amber): **4.59–9.9:1**
- White text at ≥45% opacity on the four dark background shades: **4.5–14.4:1**
- `btn-outline` text on its own translucent background: **13.7:1**

### Failures found and fixed
| Location | Before | Issue | After |
|---|---|---|---|
| `Contact.jsx` — "Schedule Now" card text/icon | `#7C3AED` on dark bg | **3.48:1** — fails 4.5:1 | `#A78BFA` (violet-bright) — **7.28:1** |
| `Trust.jsx` — Sarah Chen testimonial metric badge | `#7C3AED` on dark bg | **3.48:1** — fails 4.5:1 | `#A78BFA` — **7.28:1** |
| `IndustriesSection.jsx` — "Security & Defense" badge | `#6366F1` (indigo) on panel bg | **4.35:1** — fails 4.5:1 | `#818CF8` (indigo-400) — **6.51:1** |
| `SuccessStoriesSection.jsx` — "Get a similar outcome" link, idle state | `story.color` at 50% alpha | **~2.0–2.2:1** across all four case studies — badly fails | Full-opacity `story.color` + `hover:underline` instead of an alpha-driven color swap — **4.59–5.29:1** |

Root cause pattern: `#7C3AED` (base violet) and `#6366F1` (base indigo) are fine as icon/border/background-tint colors (they clear the 3:1 non-text UI-component threshold) but too dark to use as small text directly on the `#060A12`-family backgrounds — the codebase already had a "bright" violet (`#A78BFA`) reserved for text in `index.css` (`.tag-chip`, `.section-label`); the four fixes above just bring the stray instances in line with that existing convention. The alpha-dimmed link was an unrelated bug (halving opacity always drags a passing color into failing territory against a near-black background).

### Low-opacity de-emphasized text — fixed
Low-opacity white text (`text-white/45` and below — footer legal links, list-item bullets, sublabels, placeholder text, timeline descriptions, article back-links/meta/figcaptions, form labels) measured **1.7–4.5:1** across the four dark background shades, below the 4.5:1 AA threshold (even `/45` was a coin-flip: it passed on two background shades and failed on the other two by a hair). Raised every instance to a uniform **`/50` floor** (or `/55` where a hover state needed room to still read as a visible jump), which clears **≥5.3:1** on every background shade in use, no exceptions. This trades a little of the six-step opacity ladder the de-emphasized-text pattern used for a guaranteed-compliant two-tier one (`/50` idle, `/55`+ for secondary-but-still-legible copy, `/70`+ for hover) — 33 instances across 19 files:

`Contact.jsx`, `Trust.jsx`, `IndustriesSection.jsx`, `ImpactSection.jsx`, `SuccessStoriesSection.jsx`, `BlogSection.jsx`, `Services.jsx`, `About.jsx`, `AIServicesSection.jsx`, `ControlPlane.jsx`, `AgentMarketplace.jsx`, `Hero.jsx`, `NotFound.jsx`, `Footer.jsx`, `MegaMenu.jsx`, `MultiAgentNetwork.jsx`, and the six `Article*.jsx` blog-post pages.

**Left as-is (separate, larger scope):** low-opacity text *inside* the decorative animated SVG diagrams (`ControlPlaneDiagram`, `VoiceAIAgent`, `FinancialRisk`, `WorkflowHologram`, `EcommerceAI`, etc.) — labels like "Orchestrator" or mock price/status values drawn as illustrative artwork inside canvas/SVG visuals, not primary page copy. Revisiting those would mean touching every custom visual component individually; flag if you want that pass too.
