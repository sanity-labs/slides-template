import type { ReactElement } from 'react';
import { Box, Slide } from '@sanity-labs/slides';
import { z } from 'zod';

export const TitleAndBodySchema = z
  .object({
    title: z.string().min(1).describe('The slide title.'),
    eyebrow: z.string().optional().describe('Optional small label above the title.'),
    bodyEyebrow: z.string().optional().describe('Optional small label above the body.'),
    body: z.string().min(1).describe('The main body text.'),
    footer: z.string().optional().describe('Optional bottom-right footer text.'),
  })
  .strict();

type TitleAndBodyProps = z.infer<typeof TitleAndBodySchema>;

export const TitleAndBody = ({
  title,
  eyebrow = 'EYEBROW',
  bodyEyebrow = 'SUBTITLE',
  body,
  footer,
}: TitleAndBodyProps): ReactElement => (
  <Slide layoutProps={{ footer }} className="flex flex-col p-6 gap-3">
    <Box className="text-role-eyebrow text-gray-300" slotId="title-and-body:eyebrow">
      {eyebrow}
    </Box>
    <Box className="text-role-title text-white" slotId="title-and-body:title">
      {title}
    </Box>
    <Box className="flex flex-col gap-2 pt-6 pl-16 w-1/2">
      <Box className="text-role-eyebrow text-gray-300" slotId="title-and-body:body-eyebrow">
        {bodyEyebrow}
      </Box>
      <Box className="text-role-body-md text-white" slotId="title-and-body:body">
        {body}
      </Box>
    </Box>
  </Slide>
);
