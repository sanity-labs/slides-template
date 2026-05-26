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

Every slide gets automatic brand chrome via the `BrandSlide` wrapper:

- **Bottom-left:** Sanity mark (squiggle icon) on content slides, full lockup
  (icon + "Sanity" wordmark) on Cover and Closing
- **Bottom-right:** "SANITY INC - 2026" in IBM Plex Mono
- **Do not** add logos or footers manually — the chrome is built into every component

Logo and footer color follow the background: white on dark, Sanity Black on
OrangeRed/blue/secondary backgrounds.

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

When writing custom components with `slides_add_component`, import chrome
helpers from the template:

```tsx
import {
  BrandSlide, BrandText, COLORS, Label, TopLabel,
  DotGrid, DottedRule, Chrome, Background,
} from '@sanity-labs/slides-template';
```

- **Always wrap content in `<BrandSlide>`** — provides background, logo, footer
- Use `<TopLabel>` for eyebrows (top-left, mono, gray)
- Use `<BrandText>` with explicit `rect`, `size`, and `color` for all text
- Use `COLORS.white` for titles/body on dark slides, `COLORS.gray300` for muted labels
- Use `<DottedRule>` and `<DotGrid>` for brand texture patterns
- **Never** use hex color literals — always `COLORS.*`
- Text is Sanity Black or White only — never OrangeRed, never secondary colors

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
