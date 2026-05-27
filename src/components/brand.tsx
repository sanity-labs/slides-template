import type { ReactElement } from 'react';
import {
  Box,
  Image,
  type ArtifactRef,
  type HexColor,
  type ImageRef,
} from '@sanity-labs/slides';
import {
  CLOSING_MARK_BLACK_ON_BRAND,
  LOCKUP_BLACK_ON_BRAND,
  LOCKUP_WHITE_ON_BLACK,
  MARK_BLACK_ON_BLUE,
  MARK_BLACK_ON_BRAND,
  MARK_WHITE_ON_BLACK,
} from '../brand-assets.js';

export type Rect = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

export type BrandTone = 'dark' | 'brand' | 'blue';

export const CANVAS: Rect = { x: 0, y: 0, w: 960, h: 540 };

export const COLORS = {
  black: '#0b0b0b',
  white: '#ffffff',
  brand: '#ff5500',
  blue: '#027fff',
  gray100: '#ededed',
  gray200: '#d6d6d6',
  gray300: '#b9b9b9',
  gray500: '#797979',
} as const satisfies Readonly<Record<string, HexColor>>;

const RESOLVED_AT = '2026-05-04T00:00:00.000Z';

const imageRef = (
  identifier: string,
  url: string,
  type: ArtifactRef['type'] = 'logo',
): ImageRef => ({
  url,
  artifact: {
    type,
    identifier,
    resolvedUrl: url,
    resolvedAt: RESOLVED_AT,
  },
});

export const BRAND_IMAGES = {
  markWhite: imageRef('sanity-mark-white-on-black', MARK_WHITE_ON_BLACK),
  lockupWhite: imageRef('sanity-lockup-white-on-black', LOCKUP_WHITE_ON_BLACK),
  markBrand: imageRef('sanity-mark-black-on-brand', MARK_BLACK_ON_BRAND),
  markBlue: imageRef('sanity-mark-black-on-blue', MARK_BLACK_ON_BLUE),
  lockupBrand: imageRef('sanity-lockup-black-on-brand', LOCKUP_BLACK_ON_BRAND),
  closingMark: imageRef('sanity-closing-mark-black-on-brand', CLOSING_MARK_BLACK_ON_BRAND),
} as const;

const toneBackground = (tone: BrandTone): HexColor => {
  if (tone === 'brand') return COLORS.brand;
  if (tone === 'blue') return COLORS.blue;
  return COLORS.black;
};

const svgDataUri = (svg: string): string => {
  if (typeof btoa === 'function') {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
};

// Conform to js-cache-function-results: an identical (pattern, dimensions, color, tone)
// combination is requested by every DottedRule/DotGrid usage across the deck. Caching
// stops us from re-emitting the same data URI and lets pptxgenjs share image bytes
// across slides in the exported file.
const patternRefCache = new Map<string, ImageRef>();
const patternRef = (identifier: string, svg: string): ImageRef => {
  const cached = patternRefCache.get(identifier);
  if (cached) return cached;
  const ref = imageRef(identifier, svgDataUri(svg), 'texture');
  patternRefCache.set(identifier, ref);
  return ref;
};

type DotSvgOptions = {
  readonly width: number;
  readonly height: number;
  readonly step: number;
  readonly radius: number;
  readonly color: HexColor;
  readonly opacity?: number;
};

const singleDotRowSvg = ({
  width,
  height,
  step,
  radius,
  color,
  opacity = 1,
}: DotSvgOptions): string => {
  const y = height / 2;
  const circles: string[] = [];
  for (let x = radius; x < width; x += step) {
    circles.push(
      `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${radius}" fill="${color}" opacity="${opacity}" />`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${circles.join('')}</svg>`;
};

const dotPatternSvg = ({
  width,
  height,
  step,
  radius,
  color,
  opacity = 1,
}: DotSvgOptions): string => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="dots" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${color}" opacity="${opacity}" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#dots)" />
</svg>`;

export const Background = ({ tone = 'dark' }: { readonly tone?: BrandTone }): ReactElement => (
  <Box rect={CANVAS} fill={{ kind: 'solid', color: toneBackground(tone) }} />
);

export const DottedRule = ({
  rect,
  tone = 'dark',
}: {
  readonly rect: Rect;
  readonly tone?: BrandTone;
}): ReactElement => {
  const color = tone === 'dark' ? COLORS.gray300 : COLORS.black;
  const svg = singleDotRowSvg({
    width: rect.w,
    height: rect.h,
    step: 5.2,
    radius: 0.65,
    color,
    opacity: tone === 'dark' ? 0.8 : 1,
  });

  return (
    <Image
      rect={rect}
      image={patternRef(`dotted-rule-${tone}-${rect.w}x${rect.h}`, svg)}
      altText=""
    />
  );
};

export const DotGrid = ({ rect }: { readonly rect: Rect }): ReactElement => {
  const svg = dotPatternSvg({
    width: rect.w,
    height: rect.h,
    step: 7.2,
    radius: 0.52,
    color: COLORS.gray500,
    opacity: 0.82,
  });

  return (
    <Image rect={rect} image={patternRef(`dot-grid-dark-${rect.w}x${rect.h}`, svg)} altText="" />
  );
};
