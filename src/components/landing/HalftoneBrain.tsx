import { cn } from '@/lib/utils'
import { HALFTONE_CELLS, HALFTONE_COLS, HALFTONE_ROWS } from './halftone-brain'

const PITCH = 10
const SIZE = 8.6

/**
 * The ConFuse mark as a halftone dot matrix (technique measured on
 * supermemory.ai: one SVG rect per cell, scale and fill driven by CSS custom
 * properties, delays derived from the cell's column so a wave sweeps across).
 *
 * Fully deterministic and CSS-only: cells grow in column by column, then every
 * 9s a "re-index" wave crosses the brain, briefly enlarging each cell and
 * tinting it brand pink. Static under prefers-reduced-motion.
 */
export function HalftoneBrain({ className }: { className?: string }) {
  const w = HALFTONE_COLS * PITCH
  const h = HALFTONE_ROWS * PITCH
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn('halftone', className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id="ht-grid" width={PITCH} height={PITCH} patternUnits="userSpaceOnUse">
          <rect x={PITCH / 2 - 0.6} y={PITCH / 2 - 0.6} width={1.2} height={1.2} fill="hsl(var(--foreground) / 0.10)" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="url(#ht-grid)" />
      {HALFTONE_CELLS.map(([c, r, s]) => (
        <rect
          key={`${c}-${r}`}
          x={c * PITCH + (PITCH - SIZE) / 2}
          y={r * PITCH + (PITCH - SIZE) / 2}
          width={SIZE}
          height={SIZE}
          rx={1.4}
          style={{
            ['--s' as string]: s,
            ['--din' as string]: `${c * 28 + r * 6}ms`,
            ['--dw' as string]: `${2.2 + c * 0.11}s`,
          }}
        />
      ))}
    </svg>
  )
}
