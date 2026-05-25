import { describe, expect, test } from 'vitest';
import { flattenForBrand, inferFontRole } from './flatten-for-brand.js';
import type { BrandTokens } from './tokens/types.js';

const buildTokens = (overrides: Partial<BrandTokens> = {}): BrandTokens => ({
  primitiveColors: [],
  semanticColors: [],
  spacing: [],
  radii: [],
  textures: [],
  typography: [],
  ...overrides,
});

describe('inferFontRole', () => {
  test('classifies page-heading as display', () => {
    expect(inferFontRole('text-page-heading-xl')).toBe('display');
    expect(inferFontRole('text-page-heading-sm')).toBe('display');
  });

  test('classifies component-heading as display', () => {
    expect(inferFontRole('text-component-heading-md')).toBe('display');
  });

  test('classifies code-* / label-* / detail-* as mono (per @sanity/sanity-id var(--font-mono))', () => {
    expect(inferFontRole('text-code-lg')).toBe('mono');
    expect(inferFontRole('text-code-sm')).toBe('mono');
    expect(inferFontRole('text-label-lg')).toBe('mono');
    expect(inferFontRole('text-label-sm')).toBe('mono');
    expect(inferFontRole('text-detail-md')).toBe('mono');
    expect(inferFontRole('text-detail-sm')).toBe('mono');
  });

  test('defaults body / quote to body role', () => {
    expect(inferFontRole('text-body-md')).toBe('body');
    expect(inferFontRole('text-quote-lg')).toBe('body');
  });

  test('defaults unknown prefixes to body (forgiving)', () => {
    expect(inferFontRole('text-future-style-xl')).toBe('body');
  });
});

describe('flattenForBrand — colors', () => {
  test('flattens primitives to "primitive.<name>" keys', () => {
    const out = flattenForBrand(
      buildTokens({
        primitiveColors: [
          { name: 'brand', hex: '#ff5500' },
          { name: 'gray-100', hex: '#ededed' },
        ],
      }),
    );

    expect(out.colors['primitive.brand']).toBe('#ff5500');
    expect(out.colors['primitive.gray-100']).toBe('#ededed');
  });

  test('flattens semantics to "semantic.<name>.<theme>" keys for both themes', () => {
    const out = flattenForBrand(
      buildTokens({
        semanticColors: [{ name: 'fg-base', light: '#0b0b0b', dark: '#ffffff' }],
      }),
    );

    expect(out.colors['semantic.fg-base.light']).toBe('#0b0b0b');
    expect(out.colors['semantic.fg-base.dark']).toBe('#ffffff');
  });

  test('throws when a primitive hex is malformed', () => {
    expect(() =>
      flattenForBrand(
        buildTokens({
          primitiveColors: [{ name: 'broken', hex: 'not-a-hex' }],
        }),
      ),
    ).toThrow(/invalid hex/);
  });

  test('throws when a semantic hex is malformed', () => {
    expect(() =>
      flattenForBrand(
        buildTokens({
          semanticColors: [{ name: 'broken', light: '#ff0000', dark: 'oops' }],
        }),
      ),
    ).toThrow(/invalid hex.*broken\.dark/);
  });
});

describe('flattenForBrand — typography', () => {
  test('produces fontFamily=display for heading styles', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [
          {
            name: 'text-page-heading-xl',
            fontSizeRem: 4.5,
            fontSizePx: 72,
            fontWeight: 400,
            lineHeight: '1.05',
            letterSpacing: '-0.04em',
          },
        ],
      }),
    );

    const t = out.typography['text-page-heading-xl'];
    expect(t?.fontFamily).toBe('display');
    expect(t?.fontSize).toBe(72); // px passes through 1:1 for typography
    expect(t?.fontWeight).toBe(400);
    expect(t?.lineHeight).toBe(1.05);
    expect(t?.letterSpacing).toBeCloseTo(-0.04, 5);
  });

  test('produces fontFamily=body for body styles', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [{ name: 'text-body-md', fontSizeRem: 1.125, fontSizePx: 18 }],
      }),
    );

    expect(out.typography['text-body-md']?.fontFamily).toBe('body');
  });

  test('produces fontFamily=mono for code styles', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [{ name: 'text-code-md', fontSizeRem: 1, fontSizePx: 16 }],
      }),
    );

    expect(out.typography['text-code-md']?.fontFamily).toBe('mono');
  });

  test('skips styles without a numeric size (decorative-only utilities)', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [
          { name: 'text-trim', fontSizeRem: null, fontSizePx: null },
          { name: 'text-body-md', fontSizeRem: 1, fontSizePx: 16 },
        ],
      }),
    );

    expect(out.typography['text-trim']).toBeUndefined();
    expect(out.typography['text-body-md']).toBeDefined();
  });

  test('falls back to lineHeight 1.5 when source value is non-numeric', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [
          {
            name: 'text-body-md',
            fontSizeRem: 1,
            fontSizePx: 16,
            lineHeight: '1.5em', // not a bare multiplier
          },
        ],
      }),
    );

    expect(out.typography['text-body-md']?.lineHeight).toBe(1.5);
  });

  test('omits letterSpacing when not parseable', () => {
    const out = flattenForBrand(
      buildTokens({
        typography: [
          {
            name: 'text-body-md',
            fontSizeRem: 1,
            fontSizePx: 16,
            letterSpacing: 'normal',
          },
        ],
      }),
    );

    expect(out.typography['text-body-md']?.letterSpacing).toBeUndefined();
  });
});

describe('flattenForBrand — spacing', () => {
  test('converts px to pt with the spatial 0.7 ratio', () => {
    const out = flattenForBrand(
      buildTokens({
        spacing: [
          { name: 'spacing-16', raw: '1rem', rem: 1, px: 16 },
          { name: 'spacing-32', raw: '2rem', rem: 2, px: 32 },
        ],
      }),
    );

    expect(out.spacing['spacing-16']).toBeCloseTo(11.2, 5); // 16 * 0.7
    expect(out.spacing['spacing-32']).toBeCloseTo(22.4, 5); // 32 * 0.7
  });

  test('skips spacing tokens with no numeric value', () => {
    const out = flattenForBrand(
      buildTokens({
        spacing: [{ name: 'spacing-mystery', raw: 'auto', rem: null, px: null }],
      }),
    );

    expect(out.spacing['spacing-mystery']).toBeUndefined();
  });
});

describe('flattenForBrand — output is frozen', () => {
  test('returned slot maps reject mutation', () => {
    const out = flattenForBrand(
      buildTokens({
        primitiveColors: [{ name: 'brand', hex: '#ff5500' }],
      }),
    );

    expect(Object.isFrozen(out.colors)).toBe(true);
    expect(Object.isFrozen(out.typography)).toBe(true);
    expect(Object.isFrozen(out.spacing)).toBe(true);
  });
});

describe('flattenForBrand — short-form aliases', () => {
  test('emits short color aliases (fg-base, bg-base, accent) keyed off the dark theme', () => {
    const out = flattenForBrand(
      buildTokens({
        primitiveColors: [{ name: 'brand', hex: '#ff5500' }],
        semanticColors: [
          { name: 'fg-base', light: '#0b0b0b', dark: '#ffffff' },
          { name: 'bg-base', light: '#ffffff', dark: '#0b0b0b' },
        ],
      }),
    );

    // Short aliases pin Sanity's dark-default deck aesthetic so the agent's
    // Tier-2 components reach for the right contrast automatically.
    expect(out.colors['fg-base']).toBe('#ffffff'); // dark theme
    expect(out.colors['bg-base']).toBe('#0b0b0b'); // dark theme
    expect(out.colors['accent']).toBe('#ff5500'); // primitive.brand

    // Long-form keys still present alongside.
    expect(out.colors['semantic.fg-base.light']).toBe('#0b0b0b');
    expect(out.colors['semantic.fg-base.dark']).toBe('#ffffff');
    expect(out.colors['primitive.brand']).toBe('#ff5500');
  });

  test('short aliases for missing source tokens are silently skipped (tolerant)', () => {
    // A brand that doesn't ship 'fg-dim' or 'accent-magenta' should still
    // flatten cleanly — only the aliases with real sources get emitted.
    const out = flattenForBrand(
      buildTokens({
        primitiveColors: [{ name: 'brand', hex: '#ff5500' }],
        semanticColors: [{ name: 'fg-base', light: '#000000', dark: '#ffffff' }],
      }),
    );

    expect(out.colors['fg-base']).toBe('#ffffff');
    expect(out.colors['accent']).toBe('#ff5500');
    expect(out.colors['fg-dim']).toBeUndefined();
    expect(out.colors['accent-magenta']).toBeUndefined();
  });

  test('emits short spacing aliases (xs, sm, md, lg, xl) from the spacing-N scale', () => {
    const out = flattenForBrand(
      buildTokens({
        spacing: [
          { name: 'spacing-4', raw: '0.25rem', rem: 0.25, px: 4 },
          { name: 'spacing-8', raw: '0.5rem', rem: 0.5, px: 8 },
          { name: 'spacing-16', raw: '1rem', rem: 1, px: 16 },
          { name: 'spacing-32', raw: '2rem', rem: 2, px: 32 },
          { name: 'spacing-48', raw: '3rem', rem: 3, px: 48 },
        ],
      }),
    );

    expect(out.spacing['xs']).toBeCloseTo(2.8, 5); // 4 * 0.7
    expect(out.spacing['sm']).toBeCloseTo(5.6, 5); // 8 * 0.7
    expect(out.spacing['md']).toBeCloseTo(11.2, 5); // 16 * 0.7
    expect(out.spacing['lg']).toBeCloseTo(22.4, 5); // 32 * 0.7
    expect(out.spacing['xl']).toBeCloseTo(33.6, 5); // 48 * 0.7
    // Long-form keys still addressable.
    expect(out.spacing['spacing-16']).toBeCloseTo(11.2, 5);
  });

  test('short spacing aliases for missing scale entries are silently skipped', () => {
    const out = flattenForBrand(
      buildTokens({
        spacing: [{ name: 'spacing-16', raw: '1rem', rem: 1, px: 16 }],
      }),
    );

    expect(out.spacing['md']).toBeCloseTo(11.2, 5);
    expect(out.spacing['xs']).toBeUndefined();
    expect(out.spacing['xl']).toBeUndefined();
  });
});
