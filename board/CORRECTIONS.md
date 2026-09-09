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
