import type { ReactElement } from 'react';
import { Box, Image, Slide } from '@sanity-labs/slides';
import { z } from 'zod';
import { BRAND_IMAGES } from './brand.js';

export const ClosingSchema = z
  .object({
    slideNumber: z
      .string()
      .optional()
      .describe('Optional slide number / sequence label in the lower-right.'),
    title: z.string().optional().describe('Closing title. Defaults to QnA.'),
    eyebrow: z.string().optional().describe('Top-left closing label. Defaults to THANK YOU.'),
  })
  .strict();

type ClosingProps = z.infer<typeof ClosingSchema>;

export const Closing = ({
  slideNumber,
  title = 'QnA',
  eyebrow = 'THANK YOU',
}: ClosingProps): ReactElement => (
  <Slide
    layoutProps={{ tone: 'brand', lockup: true, footer: null }}
    className="flex flex-col p-6 gap-3"
  >
    {/* Oversized closing mark — absolute overlay on the right of the slide. */}
    <Image
      rect={{ x: 240, y: 0, w: 720, h: 540 }}
      image={BRAND_IMAGES.closingMark}
      altText="Sanity mark"
    />
    <Box className="text-role-eyebrow text-black" slotId="closing:eyebrow">
      {eyebrow}
    </Box>
    {/* Spacer pushes the title down to roughly match the curated y=205. */}
    <Box className="h-1/3" />
    <Box className="text-role-closing-title text-black" slotId="closing:title">
      {title}
    </Box>
    {slideNumber === undefined ? null : (
      <Box
        rect={{ x: 826, y: 497, w: 110, h: 16 }}
        className="text-role-footer text-black text-right"
        slotId="closing:slide-number"
      >
        {slideNumber}
      </Box>
    )}
  </Slide>
);
