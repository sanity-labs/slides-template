import type { ReactElement } from 'react';
import { Box, Slide } from '@sanity-labs/slides';
import { z } from 'zod';

export const CoverSchema = z
  .object({
    title: z.string().min(1).describe('The deck title. Big, prominent.'),
    subtitle: z.string().optional().describe('Optional subtitle / tagline below title.'),
    eyebrow: z
      .string()
      .optional()
      .describe('Optional small label above the title. Defaults to EYEBROW.'),
  })
  .strict();

type CoverProps = z.infer<typeof CoverSchema>;

export const Cover = ({ title, subtitle, eyebrow = 'EYEBROW' }: CoverProps): ReactElement => (
  <Slide layoutProps={{ lockup: true }} className="flex flex-col p-6 gap-3">
    <Box className="text-role-eyebrow text-gray-300" slotId="cover:eyebrow">
      {eyebrow}
    </Box>
    <Box className="text-role-cover-title text-white" slotId="cover:title">
      {title}
    </Box>
    {subtitle === undefined ? null : (
      <Box
        className="text-role-cover-subtitle text-white pt-4 pl-10 w-1/2"
        slotId="cover:subtitle"
      >
        {subtitle}
      </Box>
    )}
  </Slide>
);
