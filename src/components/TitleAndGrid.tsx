import type { ReactElement } from 'react';
import { Box, Slide, type SlotId } from '@sanity-labs/slides';
import { z } from 'zod';
import { DotGrid, DottedRule, type Rect } from './brand.js';

const slotIdOrUndefined = (slotPrefix: string | undefined, name: string): SlotId | undefined =>
  slotPrefix === undefined ? undefined : (`${slotPrefix}:${name}` as SlotId);

export const TitleAndGridSchema = z
  .object({
    title: z.string().min(1).describe('The slide title.'),
    eyebrow: z.string().optional().describe('Optional small label above the title.'),
    cols: z
      .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
      .describe('Number of grid columns.'),
    rows: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .optional()
      .describe('Number of grid rows. Inferred from cell count if omitted.'),
    cells: z
      .array(
        z.object({
          eyebrow: z.string().optional(),
          body: z.string().min(1),
        }),
      )
      .min(1)
      .describe('Cell contents in row-major order.'),
    footer: z.string().optional().describe('Optional bottom-right footer text.'),
    slotPrefix: z
      .string()
      .optional()
      .describe(
        'Optional slot prefix for re-fill workflows. Omit unless the caller plans to address this slide by slot later; slot IDs are unique deck-wide.',
      ),
  })
  .strict();

type TitleAndGridProps = z.infer<typeof TitleAndGridSchema>;
type GridCell = TitleAndGridProps['cells'][number];

// Grid bounds match the curated reference deck. Cells are positioned absolutely
// because the dotted-rule and dot-grid textures are <Image> overlays that need
// known coordinates. Text inside each cell flexes naturally via className.
const GRID_BOUNDS: Rect = { x: 57.6, y: 136, w: 844.8, h: 262 };
const ROW_BOUNDS: Rect = { x: 132, y: 146, w: 640, h: 230 };

const cellRect = (bounds: Rect, cols: number, rows: number, gap: number, index: number): Rect => {
  const col = index % cols;
  const row = Math.floor(index / cols);
  const w = (bounds.w - (cols - 1) * gap) / cols;
  const h = (bounds.h - (rows - 1) * gap) / rows;
  return {
    x: bounds.x + col * (w + gap),
    y: bounds.y + row * (h + gap),
    w,
    h,
  };
};

const inferredRows = (rows: TitleAndGridProps['rows'], cols: number, count: number): 1 | 2 | 3 =>
  rows ?? (Math.min(3, Math.max(1, Math.ceil(count / cols))) as 1 | 2 | 3);

const GridField = ({
  cell,
  rect,
  index,
  showTexture,
  slotPrefix,
}: {
  readonly cell: GridCell;
  readonly rect: Rect;
  readonly index: number;
  readonly showTexture: boolean;
  readonly slotPrefix: string | undefined;
}): ReactElement => (
  <>
    <DottedRule rect={{ x: rect.x, y: rect.y, w: rect.w, h: 12 }} />
    <Box rect={rect} className="flex flex-col gap-2 pt-4">
      {cell.eyebrow === undefined ? null : (
        <Box
          className="text-role-eyebrow text-gray-300"
          slotId={slotIdOrUndefined(slotPrefix, `cell-${index}-eyebrow`)}
        >
          {cell.eyebrow}
        </Box>
      )}
      <Box
        className="text-role-body-xs text-white"
        slotId={slotIdOrUndefined(slotPrefix, `cell-${index}-body`)}
      >
        {cell.body}
      </Box>
    </Box>
    {showTexture ? <DotGrid rect={{ x: rect.x, y: rect.y + 132, w: rect.w, h: 130 }} /> : null}
  </>
);

const RowField = ({
  cell,
  rect,
  index,
  slotPrefix,
}: {
  readonly cell: GridCell;
  readonly rect: Rect;
  readonly index: number;
  readonly slotPrefix: string | undefined;
}): ReactElement => (
  <Box rect={rect} className="flex flex-row gap-8">
    <Box
      className="text-role-eyebrow text-gray-300 w-1/4"
      slotId={slotIdOrUndefined(slotPrefix, `row-${index}-eyebrow`)}
    >
      {cell.eyebrow}
    </Box>
    <Box
      className="text-role-body-md text-white flex-1"
      slotId={slotIdOrUndefined(slotPrefix, `row-${index}-body`)}
    >
      {cell.body}
    </Box>
  </Box>
);

export const TitleAndGrid = ({
  title,
  eyebrow = 'EYEBROW',
  cols,
  rows,
  cells,
  footer,
  slotPrefix,
}: TitleAndGridProps): ReactElement => {
  const rowCount = inferredRows(rows, cols, cells.length);
  const rowLayout = cols === 1 && rowCount > 1;

  return (
    <Slide layoutProps={{ footer }} className="flex flex-col p-6 gap-3">
      <Box
        className="text-role-eyebrow text-gray-300"
        slotId={slotIdOrUndefined(slotPrefix, 'eyebrow')}
      >
        {eyebrow}
      </Box>
      <Box
        className="text-role-title text-white"
        slotId={slotIdOrUndefined(slotPrefix, 'title')}
      >
        {title}
      </Box>
      {cells.map((cell, index) => {
        const rect = rowLayout
          ? cellRect(ROW_BOUNDS, 1, rowCount, 12, index)
          : cellRect(GRID_BOUNDS, cols, rowCount, 16, index);
        return rowLayout ? (
          <RowField key={index} cell={cell} rect={rect} index={index} slotPrefix={slotPrefix} />
        ) : (
          <GridField
            key={index}
            cell={cell}
            rect={rect}
            index={index}
            showTexture={cols === 3 && rowCount === 1}
            slotPrefix={slotPrefix}
          />
        );
      })}
    </Slide>
  );
};
