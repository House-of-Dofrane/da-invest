# BRAND.md — Dofrane Acquisitions, investor surface

**Status:** v1, 2026-09-09. Everything downstream reads from this file.
**Palette authority:** HOD Brand Playbook v1 §4, locked 2026-07-28. Not re-derived here.

---

## 0. The departure, stated up front

The locked playbook sets **warm ivory as the ~60% ground with oxblood at ~30%** — a light system.
The directive for this surface specifies **dark-first, deep near-black ground**. The directive is
newer and it is the Chairman's, so this build is dark-first.

Nothing in the palette changes. What changes is which colour does which job, and one measured
consequence drives the whole system:

**Oxblood on near-black scores 1.69:1. It fails, badly, at any size.** Measured, not assumed —
the playbook's own token file flags the same pair. Therefore, on this surface:

> **Oxblood is a fill, never a typeface colour.** Where oxblood appears, type sits *on* it in ivory
> or champagne. Champagne becomes the accent that carries on dark ground.

That is the single rule that separates this system from a naive dark inversion.

---

## 1. Palette

| Token | Hex | Role on this surface |
|---|---|---|
| `--da-ink` | `#14100F` | Ground. The page's default field |
| `--da-surface` | `#1E1917` | Raised surface — cards, panels. A tint of ink, not a grey |
| `--da-oxblood` | `#6E1E2A` | Brand fill. Blocks, bands, buttons. **Never type on dark** |
| `--da-champagne` | `#EFE3C0` | Accent. The warm signal on dark ground |
| `--da-silver` | `#C9CDD2` | Secondary type, rules, metadata |
| `--da-ivory` | `#F3ECDD` | Primary type on dark. Ground of the light alternate |

Forbidden, carried forward from the playbook: **no off-palette neutrals.** Not `#333`, not `#666`,
not `#999`, and no pure `#000` or `#FFF`. Every neutral on this site is warm and comes from the six
above.

### Measured contrast — use this table, do not estimate

| Pair | Ratio | Verdict |
|---|---|---|
| ivory on ink | 16.07 | AAA |
| champagne on ink | 14.78 | AAA |
| silver on ink | 11.84 | AAA |
| ivory on surface | 14.80 | AAA |
| champagne on surface | 13.61 | AAA |
| silver on surface | 10.90 | AAA |
| ivory on oxblood | 9.49 | AAA |
| champagne on oxblood | 8.72 | AAA |
| ink on ivory | 16.07 | AAA |
| ink on champagne | 14.78 | AAA |
| **oxblood on ink** | **1.69** | **FAIL — prohibited** |
| **oxblood on surface** | **1.56** | **FAIL — prohibited** |

Every legal combination clears AAA. There is no reason to ship anything marginal.

### Semantic aliases

`--da-ground` = ink · `--da-ground-raised` = surface · `--da-fg` = ivory ·
`--da-fg-muted` = silver · `--da-accent` = champagne · `--da-fill` = oxblood

The light alternate swaps ground to ivory and foreground to ink. Oxblood becomes legal as type only
in the light theme, where it reads at 4.79 against ivory.

---

## 2. Type scale

Nine steps. Ratios average **1.28**, with the display step breaking the scale at **3.14x** — the
structural move taken from the reference analysis, executed with our own numbers.

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `display` | 176 | 1.10 | -4% | Arrival headline only. Once per page |
| `statement-lg` | 56 | 1.15 | -4% | Section openers |
| `statement` | 44 | 1.20 | -2% | The single sentence in a statement band |
| `heading` | 34 | 1.20 | -2% | Subsection |
| `lead` | 26 | 1.40 | -2% | Standfirst under a heading |
| `body-lg` | 20 | 1.55 | -1% | Primary prose |
| `body` | 17 | 1.55 | -1% | Secondary prose, lists |
| `caption` | 15 | 1.50 | 0 | Metadata, figure notes |
| `eyebrow` | 13 | 1.20 | +8% | Band labels. The only positive tracking in the system |

**Rules.** Line height is set by role, never by size — 1.10 display, 1.15-1.20 statement, 1.55
prose. Tracking is negative everywhere except the eyebrow. Display appears exactly once per page.

**Faces.** Not locked. The playbook defers the type decision and that deferral stands — Fraunces +
Inter remain a placeholder, not a decision. This build ships on a system stack until the call is
made, and every size above is face-independent. What is decided: **one display face with real
personality, one neutral workhorse for prose**, per the directive.

---

## 3. Spacing

Base unit **8**. Steps: **8, 16, 24, 40, 64, 104, 168** — each roughly 1.6x the last.

Container: outer maximum **1440**. Prose measure **560-720**, i.e. 60-75 characters. Never wider.

Band padding follows the rhythm law in PATTERNS.md: statement bands 104 top and bottom, content
bands 168. The arrival band takes no padding — it is exactly one screen.

---

## 4. Motion

Nothing bounces. Nothing wiggles. Camera moves, parallax, and reveals only.

| Token | Duration | Easing | Use |
|---|---|---|---|
| `reveal` | 1200ms | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Content entering view |
| `display-in` | 1500ms | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Arrival headline |
| `shift` | 800ms | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Layout and camera |
| `hover` | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Interactive feedback |

Stagger: **50ms** per character, **200ms** per line. Minimum duration **400ms** — anything faster
reads as a glitch rather than a decision. No elastic, no back, no bounce easing anywhere.

**Reduced motion is not a downgrade path, it is a supported mode.** Under
`prefers-reduced-motion: reduce`, every duration collapses to 0 and every transform is replaced by
opacity. The WebGL hero does not initialise at all; the static fallback serves instead. Same for
viewports under 768 and for devices reporting low hardware concurrency.

---

## 5. Copy voice — five rules

1. **Numbers or nothing.** Every claim carries a figure, a date, or a jurisdiction. A sentence that
   cannot be checked does not ship. No invented AUM, no fabricated track record, no borrowed logos.
2. **AP-style economy.** Short sentences. Active voice. Cut every adverb that is doing emotional
   work. If a sentence survives deleting its first four words, delete them.
3. **Banned outright:** leverage, solutions, passionate, world-class, best-in-class, seamless,
   robust, synergy, unlock, empower, journey, ecosystem, "we are excited to."
4. **Say the unflattering thing first.** The seller surface earned its credibility by conceding the
   obvious objection before making its case. Same discipline here: name the constraint, then the
   answer.
5. **Every claim survives a due-diligence question.** Write as though the reader will ask "how do
   you know that" after each line, because the reader is an allocator and they will.

---

## 6. Standing constraints inherited from the desk

- **No stock photography standing in for real assets.** Placeholders are labelled as placeholders.
  AI-generated property imagery presented as real is Class C forbidden.
- **No fabricated numbers**, including as placeholder text. An illustrative figure is marked
  illustrative or it does not appear.
- **This surface speaks to capital; the seller surface speaks to sellers.** They do not borrow each
  other's language, and neither links to the other in a way that mixes the audiences.
- **Securities-adjacent language is gated.** Copy describing the firm's own acquisition activity is
  fine. Copy describing participation in a deal is not, until counsel clears it.
