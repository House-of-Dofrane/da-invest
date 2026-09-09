# da-invest

Dofrane Acquisitions — investor surface.

Next.js 16 + Tailwind v4 + shadcn, TypeScript strict. `pnpm install && pnpm dev`.

## What this is, and what it is not

This is the **investor-facing** surface: commercial real estate acquisition and asset management,
addressed to HNW individuals, institutional investors, developers and operators.

It is **not** the seller funnel. That is `House-of-Dofrane/da-web`, serving Maryland sellers in
Montgomery and Prince George's counties, and it is deliberately untouched by this build — static
HTML, 7.4 KB, Lighthouse 100. The two surfaces do not share copy, tone, or audience.

## Standing constraints

- **No fabricated numbers.** Every figure on the page is real or marked illustrative.
- **No stock photography** standing in for real assets. Placeholders are labelled as placeholders.
- **Securities-adjacent copy is gated** on counsel before production.
- Dark-first. Locked HOD palette. See `BRAND.md` — it is the source for every token.

## Documents

| File | What it settles |
|---|---|
| `BRAND.md` | Palette, measured contrast, type scale, spacing, motion, copy voice |
| `PATTERNS.md` | Structural analysis of the reference — rhythm, ratios, compositions |
| `CONNECTORS.md` | Connector law and the Vercel exception of record |
