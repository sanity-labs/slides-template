import type { ReactElement } from 'react';
import { Box, Slide } from '@sanity-labs/slides';
import { z } from 'zod';
import { DotGrid } from './brand.js';

export const OneColumnSchema = z
  .object({
    title: z.string().min(1).describe('The slide title.'),
    eyebrow: z.string().optional().describe('Optional small label above the title.'),
    bodyEyebrow: z.string().optional().describe('Optional small label above the body.'),
    body: z.string().min(1).describe('The main body text.'),
    footer: z.string().optional().describe('Optional bottom-right footer text.'),
  })
  .strict();

type OneColumnProps = z.infer<typeof OneColumnSchema>;

export const OneColumn = ({
  title,
  eyebrow = 'EYEBROW',
  bodyEyebrow = 'SUBTITLE',
  body,
  footer,
}: OneColumnProps): ReactElement => (
  <Slide layoutProps={{ footer }} className="flex flex-col p-6 gap-3">
    <Box className="text-role-eyebrow text-gray-300" slotId="one-column:eyebrow">
      {eyebrow}
    </Box>
    <Box className="text-role-title text-white" slotId="one-column:title">
      {title}
    </Box>
    <Box className="flex flex-col gap-2 pt-6 pl-12 w-1/3">
      <Box className="text-role-eyebrow text-gray-300" slotId="one-column:body-eyebrow">
        {bodyEyebrow}
      </Box>
      <Box className="text-role-body-sm text-white" slotId="one-column:body">
        {body}
      </Box>
    </Box>
    <DotGrid rect={{ x: 106, y: 218, w: 330, h: 235 }} />
  </Slide>
);
