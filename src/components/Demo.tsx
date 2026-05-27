import type { ReactElement } from 'react';
import { Box, Slide } from '@sanity-labs/slides';
import { z } from 'zod';
import { DotGrid } from './brand.js';

export const DemoSchema = z
  .object({
    eyebrow: z.string().optional().describe('Top-left label.'),
    label: z.string().optional().describe('Centered demo placeholder label.'),
  })
  .strict();

type DemoProps = z.infer<typeof DemoSchema>;

export const Demo = ({ eyebrow = 'EYEBROW', label = '[ DEMO ]' }: DemoProps): ReactElement => (
  <Slide className="flex flex-col p-6 gap-3">
    <Box className="text-role-eyebrow text-gray-300" slotId="demo:eyebrow">
      {eyebrow}
    </Box>
    <DotGrid rect={{ x: 24, y: 44, w: 900, h: 430 }} />
    {/* Centered black panel + label, absolute-positioned so the dot-grid sits
        behind it on the dark canvas. */}
    <Box
      rect={{ x: 326, y: 184, w: 340, h: 150 }}
      className="bg-black flex items-center justify-center"
    >
      <Box
        className="text-role-demo-label text-gray-200 text-center"
        slotId="demo:label"
      >
        {label}
      </Box>
    </Box>
  </Slide>
);
