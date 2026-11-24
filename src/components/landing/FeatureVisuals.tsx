import { SOURCE_CATEGORIES } from './integrations'

/**
 * Small illustrations for the four feature groups. Decorative (aria-hidden)
 * and built only from what the copy states: source categories, webhooks,
 * graph with time, get_context's typed result, permission scopes.
 *
 * Motion follows measured references: Linear's 5x5 dot-matrix loaders
 * (opacity .3 ↔ 1 in 200ms steps), Supermemory's column-delayed sweeps,
 * Vercel's grey-to-accent state fills. All CSS, deterministic, off under
 * prefers-reduced-motion.
 */

const panel = 'overflow-hidden rounded-xl border border-border bg-card/60'
const head = 'flex items-center justify-between border-b border-border px-4 py-2.5'

/** 5x5 dot matrix with a diagonal stepped scan (Linear-style loader). */
function DotMatrix({ offset = 0 }: { offset?: number }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      {Array.from({ length: 25 }, (_, i) => {
        const c = i % 5, r = Math.floor(i / 5)
        return (
          <circle
            key={i}
            cx={2 + c * 3}
            cy={2 + r * 3}
            r={1}
            className="dm-dot"
            style={{ ['--d' as string]: `${((c + r) * 0.2 + offset).toFixed(2)}s` }}
          />
        )
      })}
    </svg>
  )
}

export function SyncVisual() {
  return (
    <div className={panel} aria-hidden="true">
      <div className={head}>
        <span className="label">Real-time sync</span>
        <span className="font-mono text-xs text-subtle">webhooks</span>
      </div>
      <ul className="divide-y divide-border">
        {SOURCE_CATEGORIES.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 px-4 py-3">
            <c.icon className="h-4 w-4 text-subtle" />
            <span className="flex-1 text-sm font-medium">{c.name}</span>
            <DotMatrix offset={i * 0.7} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Graph on a 3-column time axis; nodes snap to a grid, edges are orthogonal. */
const COLS = [60, 180, 300]
const NODES: { c: number; y: number; k: 'code' | 'doc' }[] = [
  { c: 0, y: 44, k: 'code' }, { c: 0, y: 104, k: 'doc' }, { c: 0, y: 164, k: 'code' },
  { c: 1, y: 44, k: 'doc' }, { c: 1, y: 104, k: 'code' }, { c: 1, y: 164, k: 'doc' },
  { c: 2, y: 74, k: 'code' }, { c: 2, y: 134, k: 'doc' },
]
const LINKS: [number, number][] = [[0, 4], [1, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [0, 1], [3, 4]]

export function GraphVisual() {
  const p = (i: number) => ({ x: COLS[NODES[i].c], y: NODES[i].y })
  return (
    <div className={panel} aria-hidden="true">
      <div className={head}>
        <span className="label">Knowledge graph</span>
        <span className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 bg-foreground/80" />code</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 border border-foreground/60" />docs</span>
        </span>
      </div>
      <svg viewBox="0 0 360 220" className="graph-t mx-auto block w-full max-w-[520px]">
        {/* time axis */}
        {COLS.map((x) => (
          <line key={x} x1={x} y1={20} x2={x} y2={188} stroke="hsl(var(--foreground) / .06)" strokeDasharray="2 4" />
        ))}
        <line x1={24} y1={202} x2={336} y2={202} stroke="hsl(var(--foreground) / .14)" />
        <text x={336} y={214} textAnchor="end" className="fill-subtle font-mono text-[9px]">time →</text>
        {/* orthogonal links */}
        {LINKS.map(([a, b], i) => {
          const A = p(a), B = p(b)
          const mx = A.x === B.x ? A.x : (A.x + B.x) / 2
          const d = A.x === B.x ? `M${A.x},${A.y} V${B.y}` : `M${A.x},${A.y} H${mx} V${B.y} H${B.x}`
          return <path key={i} d={d} fill="none" stroke="hsl(var(--foreground) / .18)" pathLength={100} className="beam-base" style={{ ['--d' as string]: `${0.2 + i * 0.06}s` }} />
        })}
        {/* nodes: older columns age out, the newest column is current */}
        {NODES.map((n, i) => (
          <rect
            key={i}
            x={COLS[n.c] - 5}
            y={n.y - 5}
            width={10}
            height={10}
            rx={2}
            className={`g-node g-${n.k}`}
            style={{ ['--d' as string]: `${n.c * 0.9}s`, ['--age' as string]: n.c === 2 ? 1 : n.c === 1 ? 0.7 : 0.4 }}
          />
        ))}
        {/* the "now" scanline sweeps the time axis */}
        <line x1={0} y1={20} x2={0} y2={188} stroke="hsl(var(--brand))" strokeWidth={1} className="g-scan" />
      </svg>
    </div>
  )
}

export function ToolVisual() {
  const k = (s: string) => <span className="text-brand-soft">&quot;{s}&quot;</span>
  return (
    <div className={`${panel} font-mono text-[12.5px] leading-[1.7]`} aria-hidden="true">
      <div className={head}>
        <span className="label font-sans">MCP · get_context</span>
        <span className="text-xs text-subtle">structured</span>
      </div>
      <pre className="overflow-hidden px-4 py-4 text-muted-foreground">
{`{
  `}{k('chunks')}{`: [ … ],
  `}{k('entities')}{`: [ … ],
  `}{k('relationships')}{`: [ … ]
}`}
      </pre>
    </div>
  )
}

const ROLES = ['agent_a', 'agent_b', 'agent_c']
/** Illustrative scope matrix: filled = allowed, outline = not granted. */
const GRANTS = [
  [1, 1, 1],
  [1, 1, 1],
  [0, 1, 1],
  [1, 1, 0],
]

export function ScopeVisual() {
  return (
    <div className={panel} aria-hidden="true">
      <div className={head}>
        <span className="label">Explicit scoping</span>
        <span className="font-mono text-xs text-subtle">row-level</span>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-[1fr_repeat(3,4.5rem)] items-center gap-y-2.5 text-xs">
          <span />
          {ROLES.map((r) => <span key={r} className="text-center font-mono text-[11px] text-subtle">{r}</span>)}
          {SOURCE_CATEGORIES.map((c, ri) => (
            <div key={c.id} className="contents">
              <span className="flex items-center gap-2 text-sm text-foreground">
                <c.icon className="h-3.5 w-3.5 text-subtle" />{c.name}
              </span>
              {GRANTS[ri].map((g, ci) => (
                <span key={ci} className="flex justify-center">
                  <i
                    className={`scope-cell block h-3 w-3 rounded-[3px] ${g ? 'is-on' : ''}`}
                    style={{ ['--d' as string]: `${0.3 + ci * 0.2 + ri * 0.08}s` }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
