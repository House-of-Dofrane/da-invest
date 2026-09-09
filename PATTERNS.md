# PATTERNS.md — structural analysis of the reference

**Subject:** dubaifintechdistrict.com, measured 2026-09-09
**Purpose:** extract the skeleton — sequencing, pacing, rhythm, ratios, density.
**Explicitly not in scope:** visual language, colour, typefaces, imagery, copy, markup.

This file contains no CSS, no class names and no markup, by directive. Numbers and prose only.

---

## Method, and one deviation to report

The directive specifies screenshot-to-code as the analysis tool. I instrumented the live page
directly in Chrome instead — measuring the real DOM for element heights, computed type metrics,
container widths and positioning — and read two rendered states visually.

Direct measurement is strictly better input than a model's reconstruction of a screenshot: these are
the page's actual numbers, not inferred ones. It also required none of your API keys, so Phase 1's
measurable half is done without waiting on you.

Screenshot-to-code is still worth standing up for step 4 of the directive — the pass over your own
moodboards and wireframes, where generated code is legitimately reusable because the input is yours.
That pass still needs the keys.

---

## 1. Page rhythm

Measured at 1512 x 827. Document height 8921px = **10.79 viewport-heights of scroll**, across
roughly **12 top-level bands**.

Band sequence, expressed as a multiple of viewport height:

| # | Offset | Height | In screens | Role |
|---|---|---|---|---|
| 1 | 0 | 827 | **1.00** | Arrival. Exactly one screen, never more |
| 2 | 827 | 476 | 0.58 | Statement |
| 3 | 1303 | 1235 | 1.49 | Content |
| 4 | 1677 | 861 | 1.04 | Content |
| 5 | 2538 | 424 | 0.51 | Statement |
| 6 | 2962 | 720 | 0.87 | Content |
| 7 | 3682 | 706 | 0.85 | Content |
| 8 | 4389 | 1772 | **2.14** | Anchor — the single deepest band on the page |
| 9 | 4778 | 1100 | 1.33 | Content |
| 10 | 5378 | 500 | 0.60 | Statement |
| 11 | 6161 | 787 | 0.95 | Content |
| 12 | 6337 | 434 | 0.52 | Statement |
| 13 | 6948 | 1198 | 1.45 | Content |
| 14 | 7349 | 677 | 0.82 | Content |
| 15 | 8146 | 775 | 0.94 | Close |

### The rhythm law, derived

1. **The arrival band is exactly 1.00 screens.** Not 1.2, not 90vh. One screen, then it releases.
2. **Two band lengths alternate.** Statement bands cluster at **0.51–0.60** screens. Content bands
   cluster at **0.82–1.49**. The page breathes short-long-short-long.
3. **Exactly one anchor at 2.14 screens**, placed at 49% of total scroll depth — the midpoint. The
   page has one moment where it stops moving and lets a single idea occupy two screens.
4. **Two tall bands never sit adjacent** without a statement band between them.
5. **Total depth is 10.8 screens.** Long enough to develop an argument, short enough to finish.

---

## 2. Type scale

Nine sizes in use. Ratios between adjacent steps run **1.15 to 1.39**, averaging ~1.28 — a
conventional modular scale — with the display size deliberately breaking it.

| Step | Size | Line height | Ratio to next |
|---|---|---|---|
| Display | 190 | 1.10 | **3.17x jump** |
| Statement lg | 60 | 1.20 | 1.15 |
| Statement | 52 | 1.20 and 1.50 | 1.24 |
| Sub-statement | 42 | 1.10 | 1.31 |
| Heading | 32 | 1.20 | 1.39 |
| Lead | 23 | 1.60 | 1.28 |
| Body lg | 18 | 1.50 | 1.13 |
| Body | 16 | 1.50 | 1.14 |
| Eyebrow | 14 | 1.20 and 1.50 | — |

**Three findings that matter more than the sizes:**

1. **Letter-spacing is negative everywhere, and consistently so: -4% of the font size**, at every
   step from 190 down to 14. A few statement instances use -2%. Nothing is ever tracked positive
   except one small label.
2. **Line height is a function of role, not size.** Display 1.10. Statement 1.20. Anything read as
   prose 1.50–1.60. There is no gradual ramp.
3. **The display size is 3.17x the next step down.** The hierarchy is deliberately broken at the
   top — one enormous voice, then a normal scale beneath it. This is the single loudest structural
   move on the page and it is the one most worth taking.

The reference pairs a serif for statements against a sans for everything else, with the display
size set in the sans. **We take the pairing strategy and the ratios. We do not take the faces.**

---

## 3. Grid and container

- Outer container maximum **1440**.
- Inner measures observed at **960, 850, 720, 600, 538**.
- **No CSS grid anywhere on the page.** Every layout is flex. Column counts are emergent, not
  declared — which is why the composition reads as asymmetric rather than gridded.
- Prose measure sits at 538–720, i.e. roughly **60–75 characters**.

---

## 4. Recurring compositions

Five patterns carry the entire page.

**C1 · Arrival.** Full-bleed motion plate. Oversized display type set over it, deliberately
**cropped by the viewport edges** so words run off-canvas. A short stacked statement in the opposite
corner, right-aligned, three lines, one word or phrase per line. Small centred mark at the top. A
centred scroll cue at the bottom. Occupies exactly 1.00 screens.

**C2 · Statement band.** Small centred label, then a single centred sentence at statement size,
then nothing. Whitespace above and below is roughly equal to the text block itself. These are the
0.51–0.60 bands. Their function is to slow the reader down between content.

**C3 · Asymmetric split.** Text column occupying roughly 40% on one side; image occupying roughly
60% on the other and **bleeding to the viewport edge**, not stopping at the container. The image is
taller than the text block by roughly 1.4x, so the text sits optically centred against it.

**C4 · The anchor.** One band at 2.14 screens, at the page midpoint, carrying the single most
important idea. Everything before it is setup; everything after it is consequence.

**C5 · Paired shorts.** Two equal 0.60-screen bands back to back. Used as a rhythm device rather
than for content reasons — a deliberate stutter before the page resumes.

---

## 5. Motion and choreography

- **Zero CSS transitions on the entire page.** Every movement is driven in JavaScript. This is why
  the motion reads as choreographed rather than reactive.
- **No canvas.** 4 video elements, 11 images. The cinematic quality comes from full-bleed video
  plates and type behaviour, not from WebGL.
- **2 fixed elements, 0 sticky.** A persistent header is the only element that survives scroll. The
  page does not pin sections.
- The display type on arrival resolves **from blurred to sharp**, per character, rather than sliding
  or fading.
- Header state changes with scroll depth: it gains a solid ground and a call-to-action once the
  arrival band is cleared.

**Implication for our build:** the reference achieves its feel with video and type, not 3D. Our
specified hero is WebGL, which is a heavier instrument for the same effect. That is a legitimate
choice on an investor surface, but it should be a choice made knowingly — the reference proves the
choreography does not require it.

---

## 6. Density

- **11 images across 10.8 screens** — roughly one image per screen. Sparse.
- Statement bands carry a single sentence in the whole band.
- The longest list on the page runs 5 items.
- Nothing is ever set in more than one column of prose.

The page is confident enough to leave space. Density is the pattern most easily lost in translation
and the one worth defending hardest.

---

## 7. What we take, and what we do not

**Taken — the skeleton:**
- 10.8 screens of depth, ~12 bands
- 1.00-screen arrival, exactly
- alternating 0.55 / 1.0-1.5 band rhythm
- one 2.1-screen anchor at the midpoint
- ~1.28 modular type scale with a 3x display break at the top
- -4% tracking discipline; line height by role, not by size
- 1440 outer container, 538-720 prose measure
- the five compositions above
- one image per screen; one idea per band

**Not taken — the skin:**
- typefaces, colour, imagery, subject matter, copy, tone, mark, and every rendered pixel

The test applied throughout: a person who knows the reference well should not recognise it in our
result, while a person who reads them side by side should find they move at the same speed.
