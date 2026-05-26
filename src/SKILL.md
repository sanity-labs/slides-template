# Sanity Slide Template — Design Guidelines

> Read this in full before composing any deck. These rules are derived from
> Sanity's brand guidelines and the canonical slide reference deck.

---

## 1. Brand principles

Sanity's visual identity is built on reduction. Character comes from restraint,
not decoration. A few rules govern everything:

- **High contrast is the default.** Sanity Black (`#0b0b0b`) and White are the
  foundation of every layout. OrangeRed is the accent — its power comes from
  scarcity.
- **Typography carries the work.** Type sets hierarchy, pace, and tone. Other
  elements — texture, color — support the type, never compete with it.
- **No effects.** No drop shadows, gradients, transparency, blur, or 3D.
  Depth comes from scale contrast and texture.

### What we never do

Check every slide against this list before declaring done:

- No drop shadows on any element
- No gradients or transparency effects
- No colored text — body text and headings are Sanity Black or White only
- No mixing secondary palette colors in the same deck
- No hex literals in component source — use brand tokens
- No stock or generic photography

---

## 2. Color system

### Proportion

Every deck follows this balance:

- **~45% Sanity Black** (`#0b0b0b`)
- **~45% White** (`#ffffff`)
- **~10% OrangeRed** (`#ff5500`)

OrangeRed is an accent. At 10% it commands attention; used more widely it loses
its charge.

### Approved combinations

| Background    | Foreground       | Notes                                  |
|---------------|------------------|----------------------------------------|
| Sanity Black  | White            | Default dark layout (most content)     |
| White         | Sanity Black     | Default light layout                   |
| Sanity Black  | Silver (#b9b9b9) | Labels, metadata, footer chrome        |
| OrangeRed     | Sanity Black     | High-impact accent moment              |
| Blue (#027fff)| Sanity Black     | Secondary section divider              |

Combinations not listed here are not approved. Text in OrangeRed or secondary
colors is never used — rely on size, weight, and typeface for hierarchy.

### Secondary colors

Blue, Yellow, Magenta, Green exist as section divider backgrounds. Rules:
- Only **one** secondary color per deck (besides OrangeRed)
- Only Sanity Black goes on top of a secondary color — never White
- Never combine a secondary color with OrangeRed in the same layout

---

## 3. Typography

### Typefaces

| Role                | Font          | Notes                                    |
|---------------------|---------------|------------------------------------------|
| Headings & body     | Geist (Arial fallback) | Sentence case. Weight via size, not bold. |
| Labels & metadata   | IBM Plex Mono | ALL CAPS for short labels. Regular weight.|

IBM Plex Mono must always sit visibly smaller than adjacent Geist text (~60-70%
of the paired heading size). Never reverse this hierarchy.

### Type scale (slide canvas: 960×540pt)

| Role                   | Font          | Size    | Case      |
|------------------------|---------------|---------|-----------|
| Cover title            | Geist         | 60-66pt | Sentence  |
| Section divider title  | Geist         | 56-60pt | Sentence  |
| Slide title            | Geist         | 40-44pt | Sentence  |
| Body copy              | Geist         | 15-24pt | Sentence  |
| Subtitle / body label  | Geist         | 16-18pt | Sentence  |
| Eyebrow / label        | IBM Plex Mono | 10-11pt | ALL CAPS  |
| Footer chrome          | IBM Plex Mono | 10pt    | ALL CAPS  |

---

## 4. Deck structure

- **Always start with `Cover`**, always end with `Closing`.
- After the Cover, use `Agenda` to set the deck roadmap. Use `detailed` when
  items have sub-points (2-4 items); use `simple` for 5+ items or a quick scan.
- Use `SectionDivider` for major section breaks. Limit OrangeRed to **one per
  deck** — use blue or dot-grid for subsequent breaks.
- For live demo breaks, use `Demo` instead of a SectionDivider.

---

## 5. Slide type reference

### Cover

**When to use:** Opening slide. Sets the visual register for the entire deck.

The cover makes one clear statement and establishes the brand. An overfull
cover slide signals that the presenter hasn't decided what the deck is about.

- Use the full lockup (symbol + wordmark) at bottom-left
- `eyebrow` — always override the default with something meaningful
- Keep the title to 1-2 lines. If you need more, it belongs on slide 2.
- **Never** fill the lower half with body copy

### Agenda

**When to use:** After the Cover, when the deck has 3+ sections.

- `detailed` — when sections have sub-points the audience needs upfront (2-4 items)
- `simple` — when titles speak for themselves and sub-detail would over-explain (up to 7 items)
- Agenda items use two-digit numbers: "01", "02", "03" — not "1", "2", "3"
- Multiple items can share a number to group sub-sections
- Keep titles short, sub-items fragmentary — the audience should scan in 5 seconds
- **Never** put body prose on an agenda slide — it's a map, not a slide

### Section divider

**When to use:** Transition between major sections. Not every section needs
one — only when the shift in topic warrants a visual reset.

Section dividers are pauses, not content. Their visual energy comes entirely
from background color and a single large title.

- Set `eyebrow` to a two-digit section number: "01", "02", "03"
- `orange-red` — highest impact, limit to ONE per deck
- `blue` — secondary emphasis, good for the second or third section
- `dot-grid` — low-key, quiet separator
- **Never** add body copy or explanation to a section divider
- **Never** use more than one secondary color across all dividers in a deck

### TitleAndGrid (2 columns)

**When to use:** Two parallel ideas — before/after, pros/cons, two capabilities.

- Both columns carry equal weight — content should be roughly equal in length
- Each cell gets an eyebrow label + body text
- **Never** omit the eyebrow labels — without them, parallel content is ambiguous

### TitleAndGrid (3 columns, 1 row)

**When to use:** Three genuinely equal concepts — pillars, principles, process steps.

- Dot-grid texture fills the lower portion automatically — it gives visual weight
  when columns are short, so don't omit it
- Keep body text to 2-3 lines per column — it wraps badly when longer
- **Never** use this for ideas that aren't genuinely parallel

### TitleAndGrid (3×2 grid)

**When to use:** 6 parallel items — features, stats, KPIs — where the structure
of the content is the story, not the prose.

- Dotted rules form tile borders automatically
- Keep tile body text to 2-3 lines max
- **Never** mix tile body lengths significantly — uneven tiles break the rhythm

### TitleAndGrid (1 column, rows)

**When to use:** Named concepts where the structure matters — label gives the
concept, body gives the explanation. Stronger than bullets.

- Left column holds short mono labels (1-4 words)
- Right column holds the explanation in body font
- **Never** make labels full sentences — they undermine the structure

### OneColumn

**When to use:** A focused single-thought slide where whitespace dominates.

- Dot-grid texture sits below the body text automatically
- Good for key takeaways, pull quotes, or thesis statements

### TitleAndBody

**When to use:** When a single body paragraph deserves the whole canvas.

- For one-thought-per-slide narrative beats
- Keep body text to one focused paragraph

### Demo

**When to use:** Any time the presenter hands off to something live — product
demo, video, guest speaker, interactive moment.

- Full dot-grid with centered `[ DEMO ]` label
- The bracket convention signals a live event, not a static claim
- **Never** add context or explanation — the entire message is "something live
  is about to happen"

### Closing

**When to use:** Final slide. Stays on screen during Q&A.

- Designed for dwell time — the oversized Sanity symbol on the right is a
  graphic composition element, not a logo
- Uses the full lockup (symbol + wordmark) at bottom-left, mirroring the Cover
- OrangeRed background is the default — lands with energy
- `title` defaults to "QnA", `eyebrow` to "THANK YOU" — customize if needed
- **Never** add body copy or a tagline — the title and the mark are the message

---

## 6. Chrome

Every slide gets automatic brand chrome via the framework's `Slide` layout
system. You don't write the chrome — the template injects it around every
`<Slide>`'s content:

- **Bottom-left:** Sanity mark (squiggle icon) on content slides, full lockup
  (icon + "Sanity" wordmark) on Cover and Closing — controlled by `lockup: true`
- **Bottom-right:** "SANITY INC - 2026" in IBM Plex Mono — pass `footer: null` to hide
- **Background:** controlled by `tone` (`'dark'` default, `'brand'` for OrangeRed, `'blue'`)

Customise per slide via `<Slide layoutProps={{ tone, lockup, footer }}>`. Defaults are
correct for normal content slides; only set props when you need a Cover (`lockup: true`),
SectionDivider (`tone: 'brand' | 'blue'`), or Closing (`tone: 'brand', lockup: true, footer: null`).

Logo and footer color follow the background: white on dark, Sanity Black on
OrangeRed/blue/secondary backgrounds. The layout handles this automatically.

---

## 7. Texture

- Dot-grid texture is a supporting layer — never the main event
- `OneColumn` shows dot-grid below body text
- `TitleAndGrid` with 3 cols / 1 row shows dot-grid below each column
- `Demo` uses full-bleed dot-grid
- `SectionDivider` dot-grid variant uses a large dot-grid panel
- Texture never goes over text or logos
- **When in doubt, omit the texture.** The brand works without it.

---

## 8. Custom components (tier 2)

Custom components just declare their content — the chrome (background, logo,
footer) is injected by the framework automatically. You don't need any
template-specific imports for that.

```tsx
import { Slide, Box, Text } from '@sanity-labs/slides';
import { z } from 'zod';

export const MyMetricSchema = z.object({ value: z.string(), label: z.string() }).strict();

export const MyMetric = ({ value, label }) => (
  // No background, no logo, no footer — the layout adds all that.
  <Slide className="flex flex-col gap-md justify-center">
    <Box className="text-role-title">{value}</Box>
    <Box className="text-role-eyebrow">{label}</Box>
  </Slide>
);
```

If you need brand texture (dot-grid, dotted rules) or the typed helper components,
import them from the template helpers package:

```tsx
import { BrandText, COLORS, DotGrid, DottedRule, Label, TopLabel } from '@sanity-labs/slides-template';
```

- **Don't** wrap content in any "BrandSlide" — that's gone. Just use `<Slide>`.
- Use `<Slide layoutProps={{ tone: 'brand' }}>` for a colored background on this slide.
- Use `<Slide noLayout>` only for true full-bleed slides where chrome would interfere.
- Use `<TopLabel>` for eyebrows (top-left, mono, gray) when you want the canonical position.
- Use `text-role-title` / `text-role-body` / `text-role-eyebrow` for typographic consistency.
- Use `COLORS.white` / `COLORS.gray300` only when className tokens aren't expressive enough.
- **Never** use hex color literals — always brand tokens.
- Text is Sanity Black or White only — never OrangeRed, never secondary colors.

---

## 9. Anti-patterns

These patterns signal "a model wrote this deck." Avoid them:

- **Generic eyebrows:** "OVERVIEW", "DETAILS", "INFORMATION" — be specific
- **Identical eyebrows on every grid cell** — each should be different
- **Overlong body text** — 2-4 lines per cell/column max. Split into slides.
- **Skipping the Agenda** when the deck has 3+ sections
- **Multiple OrangeRed section dividers** — one per deck max
- **"PROBLEM" / "SOLUTION" / "TRACTION"** on every slide — vary the framing
- **Repeating the same component** for every slide — use the right type for each
- **`font-bold` everywhere** — reserve weight for cases where size isn't enough
- **Solid color cards without breathing room** — decks need whitespace

---

## 10. Visual review

After composing slides, call `slides_preview` to see PNG renders of every slide.
Check for:

- Text running past box boundaries (especially on TitleAndGrid cells)
- White text on white backgrounds or black text on black backgrounds
- Missing chrome (logo or footer not visible)
- Dot-grid textures render as gray placeholders in the preview — that's expected
- Body text too small to read at projection distance

Fix issues via `slides_edit_component` and re-preview before calling `slides_create`.
