/**
 * Sanity template's automatic slide layout.
 *
 * Declared once and passed to `defineTemplate({ layout: SanityLayout })`.
 * The framework wraps every `<Slide>`'s children with this component, so
 * both curated and agent-authored slides share the same chrome — background,
 * logo, footer — without any component needing to know about it.
 *
 * Per-slide variation comes from `<Slide layoutProps={{ ... }}>`:
 *   - `tone`: 'dark' (default) | 'brand' | 'blue'
 *   - `lockup`: false (default — show mark) | true (show full lockup)
 *   - `footer`: string default | null (hide footer entirely)
 *
 * Cover and Closing pass `lockup: true`; section dividers pass a tone;
 * everything else takes the defaults.
 *
 * All chrome pieces are rect-positioned (absolute) so they don't disturb
 * the inner slide content's flex layout.
 */

import type { ReactElement } from 'react';
import { Box, Image, defineLayout } from '@sanity-labs/slides';
import { Background, BRAND_IMAGES, type BrandTone } from './components/brand.js';

export type SanityLayoutProps = {
  readonly tone?: BrandTone;
  readonly lockup?: boolean;
  readonly footer?: string | null;
};

const lockupForTone = (tone: BrandTone) => {
  if (tone === 'brand') return BRAND_IMAGES.lockupBrand;
  return BRAND_IMAGES.lockupWhite;
};

const markForTone = (tone: BrandTone) => {
  if (tone === 'brand') return BRAND_IMAGES.markBrand;
  if (tone === 'blue') return BRAND_IMAGES.markBlue;
  return BRAND_IMAGES.markWhite;
};

const footerColorClass = (tone: BrandTone): string =>
  tone === 'dark' ? 'text-gray-300' : 'text-black';

export const SanityLayout = defineLayout<SanityLayoutProps>(
  ({ children, layoutProps }): ReactElement => {
    const tone = layoutProps?.tone ?? 'dark';
    const lockup = layoutProps?.lockup ?? false;
    const footerText =
      layoutProps && 'footer' in layoutProps ? layoutProps.footer : 'SANITY INC - 2026';

    return (
      <>
        <Background tone={tone} />
        {children}
        <Image
          rect={
            lockup
              ? { x: 24, y: 491.19, w: 115.2, h: 28.8 }
              : { x: 24, y: 488.93, w: 33.6, h: 27.36 }
          }
          image={lockup ? lockupForTone(tone) : markForTone(tone)}
          altText={lockup ? 'Sanity logo' : 'Sanity mark'}
        />
        {footerText === null ? null : (
          <Box
            rect={{ x: 826, y: 497, w: 110, h: 16 }}
            className={`text-role-footer text-right ${footerColorClass(tone)}`}
          >
            {footerText}
          </Box>
        )}
      </>
    );
  },
);
