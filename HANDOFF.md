# Handoff — Dofrane Acquisitions investor site, 2026-09-09

## Objective
Execute the 2026-09-07 website reskin directive: rebuild with the structure and choreography of
`dubaifintechdistrict.com`, an original dark identity, six 21st.dev components, connector-law host.

## Done
- **Phase 0 audit.** Named repo `dofrane-acquisitions` does not exist; `da-web` has no framework
  (static HTML, 7.4 KB, Lighthouse 100); its audience is Maryland **sellers**, not investors.
- **Four rulings taken:** D6 two surfaces · D7 Vercel by written exception · D8 Tailwind v4 ·
  D9 six prompts delivered. All nine of Dofrane's §4 defects verified in the real code.
- **`BRAND.md`** — dark-first system on the locked palette. Oxblood on near-black measures **1.69,
  fails**, so oxblood is a fill and never type; champagne is the accent on dark.
- **`PATTERNS.md`** — reference measured live in-browser: 10.79 screens, ~12 bands, 1.00-screen
  arrival, statement bands 0.51–0.60 vs content 0.82–1.49, one 2.14 anchor at the midpoint,
  ~1.28 type scale with a 3.14× display break. No CSS, no class names.
- **Site built and shipped.** Six components integrated, 9 authorised + 12 recorded corrections.
  448 KB total transfer, zero external subresources, build green with `strict` on.
- **Pushed + deployed.** Pre-flight scan zero-findings.
- **`da-web` untouched** — clean tree, HEAD still `7d13d25`. Seller funnel never moved.

## In flight
- **Scroll motion unverified.** Browser automation runs the tab backgrounded, where Chrome
  suspends `requestAnimationFrame` and stops dispatching scroll events, so GSAP never ticks.
  Markup and arithmetic ship correct; the hero stagger, camera moves and C20 chrome-fade need
  one look in a foreground window.
- **Vercel Deployment Protection is ON** — the URL 302s to Vercel SSO. Readable only signed in.
- Vercel assigned the first deployment to **Production** by its own rule; `--prod` was not passed.
  No custom domain attached.

## Open decisions
- **BRAND CONFLICT — resolve first.** Memory note 2026-09-09 sets DA brand as *Ivory 60 / Oxblood 30
  / Midnight 10 + Helvetica*. This build is **dark-first with Fraunces + Inter**, per the directive's
  §1 and the Playbook's recorded placeholder pairing. Both cannot stand. Dofrane's call.
- **A-ii** — where the investor surface lives: subdomain of `dofraneacquisitions.com`, or its own
  domain. Nothing is attached yet.
- **D5** — which deals may be publicly named. Portfolio ships as three labelled placeholders.
- **Contact route** — no inbox exists; domain carries no MX. Section renders a marked placeholder.
- **C13** — kept the newer `button.tsx` over the prompt's older copy (carousel consumes it).
  Ruled under the waiver, reversible in one line.
- **The mark** — logo owned by Dofrane + Alara. Build carries a typographic holding mark only.
- **Analysis API keys** — `backend/.env` staged and gitignored; Gemini key already exists on the
  account (`...TRFI`). Only needed for the screenshot-to-code pass over Dofrane's own moodboards.

## Next step
Open the site in a foreground browser and watch the scroll motion end to end:
`cd ~/Coding/da-invest && pnpm start -p 3131` → `http://localhost:3131`

## Paths / IDs
- Repo: `~/Coding/da-invest` → `github.com/House-of-Dofrane/da-invest` (public), `main`
- Live: `https://da-invest-q9iybf25d-hod6.vercel.app` (Vercel team HOD / `hod6`, SSO-gated)
- Seller site: `~/Coding/da-web` → `House-of-Dofrane/da-web` — **do not touch**
- Docs: `BRAND.md` · `PATTERNS.md` · `CONNECTORS.md` (D7 exception + deploy record) ·
  `board/CORRECTIONS.md` (C10–C21, B01–B09) · `board/GATE1_2026-09-09.html`
- Gate 1 report: `https://claude.ai/code/artifact/2791c1e4-5169-424d-a308-b4c9eec73e56`
- Analysis tool: `~/Coding/_tools/screenshot-to-code` (poetry on Python 3.12; 3.14 breaks pydantic-core)
- Chrome fallback logged: `replicate.com` site permission — `~/.claude/chrome/fallback.jsonl`
