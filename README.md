# @sanity-labs/slides-template

Sanity's branded slide template for [`@sanity-labs/slides`](https://github.com/sanity-labs/slides).

Eight slide types, automatic brand chrome (logo, footer, safe-zone), design guidelines for the MCP agent, and a dev viewer for visual iteration.

## Quick start

The easiest way to get this template running with Claude:

```bash
npm install -g @sanity-labs/slides
slidesctl init
# ? Which template? sanity-labs/slides-template
# ? Where should Claude save the decks it makes? ~/Desktop/slides-template-decks
# ? Set up for Claude Desktop? Yes
# ✓ Done. Restart Claude Desktop, then ask it to make a deck.
```

That's it. `slidesctl init` clones this repo, installs deps, builds, and wires it into Claude Desktop. Ask Claude: *"make me a 5-slide pitch for Acme Corp"*.

## Development

If you want to edit the template or preview it locally:

```bash
git clone https://github.com/sanity-labs/slides-template.git
cd slides-template
pnpm install
pnpm dev        # opens the dev viewer at http://localhost:5173
```

The dev viewer renders all 12 slides from `src/preview.tsx`. Edit any component under `src/components/` and the page hot-reloads. Click **Export** to download a `.pptx`.

To wire your local checkout into Claude Desktop:

```bash
pnpm build
slidesctl init --source ./
# or: slidesctl use slides-template --source ./
```

## Slide types

| Component | Use for |
|-----------|---------|
| `Cover` | Opening slide. Lockup logo, big title, optional subtitle. |
| `Agenda` | Deck roadmap. Simple (numbered list) or detailed (with bullets). |
| `SectionDivider` | Major section break. Orange-red, blue, or dot-grid variants. |
| `OneColumn` | Single-thought slide with dot-grid texture. |
| `TitleAndBody` | One body paragraph, full canvas. |
| `TitleAndGrid` | 2-6 parallel cells. Cols=1 gives label-value rows. |
| `Demo` | Live demo placeholder. Full dot-grid with centered label. |
| `Closing` | Final slide. Orange-red background, oversized Sanity mark. |

## Layout system

Every slide is automatically wrapped with `SanityLayout` (defined in `src/layout.tsx`). This provides:

- **Background** -- dark by default, orange-red or blue via `layoutProps={{ tone: 'brand' }}`
- **Logo** -- Sanity mark bottom-left (or full lockup via `layoutProps={{ lockup: true }}`)
- **Footer** -- "SANITY INC - 2026" in mono, bottom-right

Custom components written by the MCP agent via `slides_add_component` get the same chrome automatically. They just use `<Slide>` and the layout wraps them.

## Design guidelines

`src/SKILL.md` contains 280 lines of brand rules the MCP agent reads via `slides_guidelines` at session start. Covers deck structure, component selection, color system, typography, chrome, textures, and anti-patterns.

## Updating

When this repo gets new commits:

```bash
slidesctl update slides-template
# Pulls the latest, reinstalls, rebuilds. Restart Claude to pick up changes.
```

## Structure

```
src/
├── index.ts              Template definition + re-exports
├── layout.tsx            SanityLayout -- auto-wrapped chrome for every slide
├── preview.tsx           Canonical 12-slide preview deck
├── SKILL.md              Design guidelines for the MCP agent
├── tokens.ts             Frozen Sanity-DS token catalog
├── flatten-for-brand.ts  Adapter: nested BrandTokens -> flat Template slots
├── brand-assets.ts       Module-relative URLs to embedded PNG marks
├── assets/               6 cropped Sanity brand marks (PNG)
├── components/           8 slide components + brand.tsx helpers
└── tokens/types.ts       Token shape types
```
