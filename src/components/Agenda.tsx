import type { ReactElement } from 'react';
import { Box, Slide, type SlotId } from '@sanity-labs/slides';
import { z } from 'zod';
import { DottedRule, type Rect } from './brand.js';

const slotIdOrUndefined = (slotPrefix: string | undefined, name: string): SlotId | undefined =>
  slotPrefix === undefined ? undefined : (`${slotPrefix}:${name}` as SlotId);

const AgendaItemSchema = z.object({
  number: z.string().describe('Two-digit agenda number.'),
  title: z.string().min(1).describe('Agenda item title.'),
  bullets: z.array(z.string()).optional().describe('Optional detail bullets.'),
});

export const AgendaSchema = z
  .object({
    variant: z.enum(['simple', 'detailed']).optional().describe('Agenda layout density.'),
    eyebrow: z.string().optional().describe('Top-left label.'),
    slotPrefix: z
      .string()
      .optional()
      .describe(
        'Optional slot prefix for re-fill workflows. Omit unless the caller plans to address this slide by slot later.',
      ),
    items: z.array(AgendaItemSchema).min(1).describe('Agenda rows.'),
  })
  .strict();

type AgendaProps = z.infer<typeof AgendaSchema>;
type AgendaItem = AgendaProps['items'][number];

const bulletText = (bullets: readonly string[] | undefined): string =>
  (bullets ?? []).map((bullet) => `- ${bullet.toUpperCase()}`).join('\n');

// Row placement matches the curated reference deck. Each row is rect-positioned
// (absolute) so the dotted-rule overlay above it stays aligned to its top edge,
// regardless of variable-height content like multi-line bullets. Inside each
// row, content flows via flex.
const detailRowRect = (index: number): Rect => ({ x: 120, y: 94 + index * 124, w: 720, h: 112 });
const simpleRowRect = (index: number): Rect => ({ x: 120, y: 86 + index * 52, w: 720, h: 52 });

const DetailRow = ({
  item,
  index,
  slotPrefix,
}: {
  readonly item: AgendaItem;
  readonly index: number;
  readonly slotPrefix: string | undefined;
}): ReactElement => {
  const rect = detailRowRect(index);
  return (
    <>
      <DottedRule rect={{ x: rect.x, y: rect.y, w: rect.w, h: 12 }} />
      <Box
        rect={{ x: rect.x, y: rect.y + 19, w: rect.w, h: rect.h - 19 }}
        className="flex flex-row gap-8"
      >
        <Box
          className="text-role-agenda-number text-white w-1/4"
          slotId={slotIdOrUndefined(slotPrefix, `item-${index}-number`)}
        >
          {item.number}
        </Box>
        <Box className="flex flex-col flex-1 gap-3">
          <Box
            className="text-role-agenda-title text-white"
            slotId={slotIdOrUndefined(slotPrefix, `item-${index}-title`)}
          >
            {item.title}
          </Box>
          <Box
            className="text-role-bullet text-gray-200"
            slotId={slotIdOrUndefined(slotPrefix, `item-${index}-bullets`)}
          >
            {bulletText(item.bullets)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SimpleRow = ({
  item,
  index,
  slotPrefix,
}: {
  readonly item: AgendaItem;
  readonly index: number;
  readonly slotPrefix: string | undefined;
}): ReactElement => {
  const rect = simpleRowRect(index);
  return (
    <>
      <DottedRule rect={{ x: rect.x, y: rect.y, w: rect.w, h: 12 }} />
      <Box
        rect={{ x: rect.x, y: rect.y + 14, w: rect.w, h: rect.h - 14 }}
        className="flex flex-row gap-8"
      >
        <Box
          className="text-role-bullet text-gray-200 w-1/4"
          slotId={slotIdOrUndefined(slotPrefix, `item-${index}-number`)}
        >
          {item.number}
        </Box>
        <Box
          className="text-role-agenda-title-simple text-white flex-1"
          slotId={slotIdOrUndefined(slotPrefix, `item-${index}-title`)}
        >
          {item.title}
        </Box>
      </Box>
    </>
  );
};

export const Agenda = ({
  variant = 'simple',
  eyebrow,
  slotPrefix,
  items,
}: AgendaProps): ReactElement => {
  const label = eyebrow ?? (variant === 'detailed' ? 'AGENDA DETAILED' : 'AGENDA');

  return (
    <Slide className="flex flex-col p-6">
      <Box
        className="text-role-eyebrow text-gray-300"
        slotId={slotIdOrUndefined(slotPrefix, 'eyebrow')}
      >
        {label}
      </Box>
      {items.map((item, index) =>
        variant === 'detailed' ? (
          <DetailRow key={index} item={item} index={index} slotPrefix={slotPrefix} />
        ) : (
          <SimpleRow key={index} item={item} index={index} slotPrefix={slotPrefix} />
        ),
      )}
    </Slide>
  );
};
