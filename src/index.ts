/**
 * @sanity-labs/slides — Sanity's brand-locked slide component library.
 *
 * Implements the `Template` interface from `react-pptx`. Provides
 * components, brand tokens (extracted from `@sanity/sanity-id`), texture
 * references, and master template IDs.
 *
 * **Token surface.** Tokens are extracted from `@sanity/sanity-id` at this
 * package's publish time and frozen into `tokens.ts`. The frozen snapshot
 * makes consumers deterministic.
 *
 * **Status:** Eight components ship with the reference-deck visual system:
 * `<Cover/>`, `<Agenda/>`, `<SectionDivider/>`, `<OneColumn/>`,
 * `<TitleAndBody/>`, `<TitleAndGrid/>`, `<Demo/>`, `<Closing/>`.
 * They compose from the token-typed primitive layer and the reference-deck
 * chrome helpers.
 *
 * **Import surface:**
 *   - `@sanity-labs/slides/sanity` — everything in this file (Template, helpers, brand-asset refs)
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CANVAS_16_9, defineTemplate, defineTemplateComponent } from '@sanity-labs/slides';
import { Agenda, AgendaSchema } from './components/Agenda.js';
import { Cover, CoverSchema } from './components/Cover.js';
import { SectionDivider, SectionDividerSchema } from './components/SectionDivider.js';
import { OneColumn, OneColumnSchema } from './components/OneColumn.js';
import { TitleAndBody, TitleAndBodySchema } from './components/TitleAndBody.js';
import { TitleAndGrid, TitleAndGridSchema } from './components/TitleAndGrid.js';
import { Demo, DemoSchema } from './components/Demo.js';
import { Closing, ClosingSchema } from './components/Closing.js';
import { flattenForBrand } from './flatten-for-brand.js';
import { preview } from './preview.js';
import { sanityBrandTokens } from './tokens.js';
import { SanityLayout } from './layout.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const skill = readFileSync(resolve(HERE, 'SKILL.md'), 'utf8');

/**
 * PPTX font substitution map for the Sanity brand.
 *
 * Pass into `new PptxSlidesRuntime({ fontSubstitution: SANITY_PPTX_FONT_SUBSTITUTION })`.
 * Keys are the literal family names the reconciler emits after role
 * resolution; values are the family names written into the .pptx file. PPTX
 * cannot embed fonts, so viewers without these installed will see their
 * PowerPoint/Slides fallback.
 *
 * Entries:
 *   - Arial/Helvetica (primary exported deck metrics) — identity pass
 *   - Geist (brand primary when installed) — identity pass
 *   - Waldenburg (pre-Geist legacy snapshot) — remap forward to Geist
 *   - IBM Plex Mono (brand mono) — identity pass
 *   - Courier New, Inter, Roboto — system fallbacks, identity pass
 */
export const SANITY_PPTX_FONT_SUBSTITUTION: Readonly<Record<string, string>> = Object.freeze({
  Geist: 'Geist',
  Waldenburg: 'Geist',
  Inter: 'Inter',
  'IBM Plex Mono': 'IBM Plex Mono',
  Arial: 'Arial',
  Helvetica: 'Helvetica',
  'Courier New': 'Courier New',
  Roboto: 'Roboto',
});

export const sanity = defineTemplate({
  name: 'sanity',
  canvas: CANVAS_16_9,
  fonts: {
    // Use an installed system family first so browser preview and exported
    // PPTX resolve to the same metrics. PPTX cannot embed Geist, so keeping
    // it first caused renderer-specific fallbacks and different text wraps.
    display: ['Arial', 'Helvetica', 'Geist', 'Inter'],
    body: ['Arial', 'Helvetica', 'Geist', 'Inter'],
    mono: ['IBM Plex Mono', 'Courier New'],
  },
  ...(() => {
    const flat = flattenForBrand(sanityBrandTokens);
    return {
      ...flat,
      colors: {
        ...flat.colors,
        // Short-form aliases for agent-authored Tier-2 components.
        // These make className usage natural: `bg-black`, `text-white`,
        // `bg-brand`, `bg-blue` instead of `bg-primitive.black` etc.
        black: '#0b0b0b',
        white: '#ffffff',
        brand: '#ff5500',
        blue: '#027fff',
        'gray-100': '#ededed',
        'gray-200': '#d6d6d6',
        'gray-300': '#b9b9b9',
        'gray-500': '#797979',
        'gray-700': '#4a4a4a',
        'gray-800': '#353535',
        'gray-900': '#212121',
        // Semantic aliases that match the Tailwind mental model.
        'fg-base': '#0b0b0b',
        'fg-muted': '#4a4a4a',
        'fg-dim': '#797979',
        'bg-base': '#0b0b0b',
        'bg-surface': '#ffffff',
        accent: '#ff5500',
      },
      typography: {
        ...flat.typography,
        // Role aliases used by the curated slide components via
        // `text-role-<name>` classes. Each alias pins fontFamily + fontSize
        // so the same role renders consistently across slides and in any
        // Tier-2 custom component that reaches for it.
        'cover-title': { fontFamily: 'display', fontSize: 66, lineHeight: 1.05 },
        'cover-subtitle': { fontFamily: 'body', fontSize: 24, lineHeight: 1.24 },
        'section-title': { fontFamily: 'display', fontSize: 60, lineHeight: 1.05 },
        'closing-title': { fontFamily: 'display', fontSize: 66, lineHeight: 1.05 },
        title: { fontFamily: 'display', fontSize: 44, lineHeight: 1.05 },
        'agenda-title': { fontFamily: 'display', fontSize: 38, lineHeight: 1.1 },
        'agenda-number': { fontFamily: 'display', fontSize: 38, lineHeight: 1.1 },
        'agenda-title-simple': { fontFamily: 'display', fontSize: 34, lineHeight: 1.1 },
        body: { fontFamily: 'body', fontSize: 20, lineHeight: 1.28 },
        'body-md': { fontFamily: 'body', fontSize: 18, lineHeight: 1.28 },
        'body-sm': { fontFamily: 'body', fontSize: 16, lineHeight: 1.28 },
        'body-xs': { fontFamily: 'body', fontSize: 15, lineHeight: 1.28 },
        'demo-label': { fontFamily: 'mono', fontSize: 13, lineHeight: 1.2 },
        bullet: { fontFamily: 'mono', fontSize: 11, lineHeight: 1.4 },
        eyebrow: { fontFamily: 'mono', fontSize: 10, lineHeight: 1.2 },
        footer: { fontFamily: 'mono', fontSize: 10, lineHeight: 1.2 },
      },
    };
  })(),
  // Opt the brand-chrome helpers into the agent's import allowlist so
  // Tier-2 custom components can compose with <DotGrid>, <DottedRule>, etc.,
  // matching the curated slides' visual system. The framework's brand lock
  // still applies to imports outside this list.
  additionalImportAllowlist: ['@sanity-labs/slides-template'],
  components: {
    Cover: defineTemplateComponent({
      component: Cover,
      schema: CoverSchema,
      description:
        'Use as the first slide. Full-bleed black with large white title, optional subtitle, Sanity lockup, and fixed deck footer chrome.',
    }),
    Agenda: defineTemplateComponent({
      component: Agenda,
      schema: AgendaSchema,
      description:
        'Use for agenda slides. Simple mode is a dense numbered list; detailed mode adds mono bullet notes under each section.',
    }),
    SectionDivider: defineTemplateComponent({
      component: SectionDivider,
      schema: SectionDividerSchema,
      description:
        'Use to mark a major section break in a deck. Orange-red and blue match the reference section slides; dot-grid keeps a quieter black texture variant.',
    }),
    OneColumn: defineTemplateComponent({
      component: OneColumn,
      schema: OneColumnSchema,
      description:
        'Use for a focused single-column body slide with dark canvas, white title, mono body eyebrow, dot-grid texture, and Sanity chrome.',
    }),
    TitleAndBody: defineTemplateComponent({
      component: TitleAndBody,
      schema: TitleAndBodySchema,
      description:
        'Use when a single body paragraph deserves the whole canvas. Dark canvas, large white title, mono body eyebrow, and Sanity chrome.',
    }),
    TitleAndGrid: defineTemplateComponent({
      component: TitleAndGrid,
      schema: TitleAndGridSchema,
      description:
        'Use to compare parallel ideas. Dark canvas with dotted separators, mono labels, white body copy, optional dot-grid texture for 3-column feature slides, and row mode when cols=1.',
    }),
    Demo: defineTemplateComponent({
      component: Demo,
      schema: DemoSchema,
      description:
        'Use as a live demo placeholder: full dark dot-grid field with a centered [ DEMO ] label and Sanity chrome.',
    }),
    Closing: defineTemplateComponent({
      component: Closing,
      schema: ClosingSchema,
      description:
        'Use as the LAST slide of a deck. Full-bleed Sanity OrangeRed canvas, oversized black Sanity mark, QnA title, thank-you label, and black lockup.',
    }),
  },
  preview,
  skill,
  layout: SanityLayout,
});

// Brand chrome helpers — callers can compose new slide types without
// re-deriving the canvas constants, tone palette, or footer chrome.
export {
  BRAND_IMAGES,
  Background,
  CANVAS,
  COLORS,
  DotGrid,
  DottedRule,
  type BrandTone,
  type Rect,
} from './components/brand.js';

// Slide components are exported individually so consumers can compose them
// inside their own tree (e.g. a custom preview, a programmatic deck).
export {
  Agenda,
  AgendaSchema,
  Closing,
  ClosingSchema,
  Cover,
  CoverSchema,
  Demo,
  DemoSchema,
  OneColumn,
  OneColumnSchema,
  SectionDivider,
  SectionDividerSchema,
  TitleAndBody,
  TitleAndBodySchema,
  TitleAndGrid,
  TitleAndGridSchema,
};
