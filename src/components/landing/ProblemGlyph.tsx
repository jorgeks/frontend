/**
 * Small 7x7 cell fields that draw each problem, in the same cell language as
 * the hero's halftone logo. The motion is deterministic and stepped, the way
 * Linear's 5x5 status loaders are (cells switch state on a fixed schedule;
 * nothing is random):
 *  - scattered: a few lit cells far apart, flashing one after another
 *  - guess:     a question mark that types itself in, cell by cell
 *  - weeks:     a 7x7 calendar filling day by day
 *  - stale:     a full field going dim column by column
 */
export type GlyphKind = 'scattered' | 'guess' | 'weeks' | 'stale'

const N = 7
const PITCH = 8

const SCATTERED = [[0, 1], [5, 0], [3, 2], [6, 4], [1, 5], [4, 6], [2, 3]]
const QUESTION = [
  '.###.',
  '#...#',
  '....#',
  '...#.',
  '..#..',
  '.....',
  '..#..',
]
  .flatMap((row, r) => [...row].map((ch, c) => (ch === '#' ? [c + 1, r] : null)))
  .filter(Boolean) as number[][]

function state(kind: GlyphKind, c: number, r: number): { cls: string; d: number } | null {
  switch (kind) {
    case 'scattered': {
      const k = SCATTERED.findIndex(([x, y]) => x === c && y === r)
      return k < 0 ? null : { cls: 'pg-flash', d: k * 0.6 }
    }
    case 'guess': {
      const k = QUESTION.findIndex(([x, y]) => x === c && y === r)
      return k < 0 ? null : { cls: 'pg-type', d: k * 0.14 }
    }
    case 'weeks':
      return { cls: 'pg-type', d: (r * N + c) * 0.07 }
    case 'stale':
      return { cls: 'pg-decay', d: c * 0.35 + r * 0.04 }
  }
}

export function ProblemGlyph({ kind }: { kind: GlyphKind }) {
  return (
    <svg viewBox={`0 0 ${N * PITCH} ${N * PITCH}`} className="pglyph h-14 w-14"
      style={kind === 'weeks' ? { ['--pg-t' as string]: '6s' } : undefined} aria-hidden="true">
      {Array.from({ length: N * N }, (_, i) => {
        const c = i % N, r = Math.floor(i / N)
        const s = state(kind, c, r)
        return (
          <rect
            key={i}
            x={c * PITCH + 2}
            y={r * PITCH + 2}
            width={4}
            height={4}
            rx={1}
            className={s ? `pg-cell ${s.cls}` : 'pg-cell'}
            style={s ? { ['--d' as string]: `${s.d.toFixed(2)}s` } : undefined}
          />
        )
      })}
    </svg>
  )
}
