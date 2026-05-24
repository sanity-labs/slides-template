# @sanity-labs/slides-template

Sanity's branded slide template, built on [`@sanity-labs/slides`](https://github.com/sanity-labs/slides).

Eight slide types: Cover, Agenda, SectionDivider, OneColumn, TitleAndBody, TitleAndGrid, Demo, Closing. Brand chrome, embedded raster marks, SVG dot textures.

## Setup

```bash
git clone git@github.com:sanity-labs/slides-template.git
cd slides-template
pnpm install
pnpm dev    # opens the dev viewer at http://localhost:5173
```

## Build and wire into Claude

```bash
pnpm build
```

Then add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sanity-slides": {
      "command": "npx",
      "args": [
        "-y", "@sanity-labs/slides", "serve",
        "--template", "/absolute/path/to/slides-template/dist/index.js",
        "--output", "/Users/you/Desktop"
      ]
    }
  }
}
```

Restart Claude and ask for a deck.

## Structure

```
src/
├── index.ts              # Template value + SANITY_PPTX_FONT_SUBSTITUTION export
├── preview.tsx           # Canonical 12-slide preview deck
├── tokens.ts             # Frozen Sanity-DS token catalog
├── flatten-for-brand.ts  # Adapter: nested BrandTokens → flat Template slots
├── brand-assets.ts       # Module-relative URLs to the embedded PNG marks
├── assets/               # 6 cropped Sanity brand marks
├── components/           # 8 slide components + brand.tsx chrome helpers
└── tokens/types.ts       # Token shape types
```
