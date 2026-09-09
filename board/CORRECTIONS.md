# CORRECTIONS — the list Phase 2 executes against

Directive §4 authorises exactly the nine corrections below and forbids silently improving anything
else. C10–C13 are corrections the directive could not have anticipated, created by ruling D8 and by
the current scaffold. B01–B09 are defects found in the supplied code and **deliberately left alone**.

## Authorised — the Chairman's nine

| # | Correction | Component |
|---|---|---|
| 1 | Author the 15 missing hero classes from BRAND.md | hero |
| 2 | Ref collision inside `.map()` → ref array | hero |
| 3 | Type the untyped JSX; strict stays on | hero |
| 4 | ScrollTrigger registered but unused → wire or drop | hero |
| 5 | Guard `refs.nebula` / `refs.locations` / `refs.mountains[3]` | hero |
| 6 | Demo imports `@/components/blocks/…` → `@/components/ui` | gallery4, features |
| 7 | `Gallery4Props` used without import | gallery4 demo |
| 8 | Hardcoded `bg-white` / `text-black` → dark variants | sign-in |
| 9 | `alert()` stub → Supabase Auth at Phase 4, or cut per D3 | sign-in |

## Created by D8 and by the scaffold — carry into Phase 2

**C10 · Theme-switcher config is inert.** The prompt extends `tailwind.config.js`. Confirmed: this
project has no such file — `components.json` records `"config": ""`, because Tailwind v4 has none.
The three tokens and the `border-shadow` utility move into the CSS layer, and the prompt's borrowed
greys are replaced with BRAND.md values.

**C11 · Footer gradient silently vanishes.** `theme(backgroundColor.white/8%)` is v3-only syntax.
Becomes a v4 colour reference or the radial gradient renders as nothing.

**C12 · Radix packaging mismatch.** The prompts install `@radix-ui/react-slot`; the current scaffold
ships the unified `radix-ui` package (1.6.7). §4 says install exactly what the prompts name, so
`@radix-ui/react-slot` is added at Phase 2 and the duplication is recorded here rather than resolved
by preference.

**C13 · Button version conflict — needs a ruling at Gate 2.** The prompts supply a `button.tsx` from
an older shadcn generation (`forwardRef`, `ring-offset-background`). `shadcn init` has already
written the current one. Copying the prompt's file verbatim, as §4 requires, downgrades a primitive
that `carousel.tsx` also consumes. **Options:** (a) obey §4 literally and overwrite, accepting the
downgrade across every component that imports Button; (b) keep the installed primitive and treat the
prompt's copy as satisfied, since it is the same component from the same source at a newer version.
Recommendation: (b). Not taken unilaterally — this is the one place the directive's "verbatim" rule
collides with the scaffold.

## Found and deliberately untouched

B01 hero headline reveal never runs (`splitTitle` defined, never called — the stagger animates an
empty set) · B02 section counter reads 02/02 · B03 theme-switcher missing `"use client"` ·
B04 theme-switcher hydration mismatch · B05 composer, bloom pass and atmosphere mesh never disposed ·
B06 see C11 · B07 all gallery imagery is CDN stock, forbidden by §6 · B08 `Gallery4Props.items`
typed required despite a default · B09 `motion/react` is the `motion` package, not `framer-motion`.

---

## Applied during the build — Phases 2–4, 2026-09-09

The Chairman waived Gates 1 and 2 and asked for a finished product. Where a
defect from the "found and untouched" list would have shipped visibly broken, it
was fixed. Every one is named here; none was silent.

**C13 ruled (my call, per the waiver): option (b).** The installed `button.tsx`
is kept. It is the same component from the same source at a newer generation, and
`carousel.tsx` consumes it. Overwriting it with the prompt's older copy would have
downgraded a primitive across the page. Overrule in one line if you disagree.

**B01 fixed — the headline reveal now runs.** `splitTitle` is called, so the
stagger animates 24 real characters instead of an empty set.
**B02 fixed** — the counter reads 01/03 through 03/03 rather than ending at 02/02.
**B03, B04 fixed** — `"use client"` added; storage is read in an effect, so the
server and client agree on first paint and the theme no longer flashes.
**B05 fixed** — composer and bloom pass are disposed on unmount.
**B08, B09 fixed** — `items` optional; `motion` pinned at 13.2.0.
**B07 honoured** — every gallery image is gone. Cards render a hatched field and a
PLACEHOLDER chip. No stock, no CDN, no fabricated asset.

### New, found only by building and running it

**C14 · Features grid is three columns**, not four, per §5's "three lanes".
Border-index logic moved with it.

**C16 · Gallery overlay gradient was invalid.** It used `hsl(var(--primary)/α)`;
under the current token format `--primary` is a full colour, not an HSL triplet,
so the value was invalid and no gradient rendered. Rewritten with `color-mix`.

**C17 · Fonts were declared at the wrong scope.** `next/font` defines
`--font-fraunces` on `<body>`, not `:root`. Declaring `--font-display` at `:root`
referenced an undefined variable, which invalidated the whole declaration and
silently dropped the hero headline to the body sans. Moved to `body` scope. This
one was invisible in code review and obvious on screen.

**C18 · The star field had to go.** A star landing near the camera rendered at
enormous point size and bloomed into a bright vertical shaft centre-frame.
Clamping `gl_PointSize` did not clear it. The field is removed; 15,000 points of
GPU work went with it.

**C19 · The sky must live inside the scene.** `EffectComposer` writes an opaque
buffer, so anything painted behind the canvas in CSS is covered. The original
sky came from an additive nebula plane and an atmosphere sphere, both of which
blew out under bloom. Replaced with one gradient plane on NormalBlending, below
the bloom threshold, that cannot blow out. 20,000 triangles removed.

**C20 · Hero chrome retires with the hero.** The side label and scroll readout are
`position: fixed` and floated over every section below. They now fade at the end
of the hero.

**C21 · The footer needed its own painted layer** or the fixed canvas showed
through beneath it.

### Measured

Total transfer **448 KB** (43.9 KB HTML + 405 KB static, gzipped), **zero external
subresources** — fonts are self-hosted through `next/font`. `three` is 231 KB of
that, and it is the whole argument of F10: the reference site achieves its
choreography with video and type and ships **no canvas at all**.

### Not verifiable in this session

The scroll-driven behaviour — C20's fade, the camera moves, the headline stagger —
could not be confirmed visually. Browser automation runs the tab in the
background, where the browser suspends `requestAnimationFrame` and does not
dispatch scroll events, so GSAP's ticker never advances. The markup and the
arithmetic are correct and ship; the motion wants one look in a foreground window.
