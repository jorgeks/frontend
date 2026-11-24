'use client'

import { Check, FileText, GitBranch, Lock, MessageSquare, Terminal, X } from 'lucide-react'

/**
 * Small product illustrations for the four feature groups. Decorative only
 * (aria-hidden); motion is slow, low-contrast and off under reduced motion.
 */

const panel = 'overflow-hidden rounded-xl border border-border bg-card/60'

export function SyncVisual() {
  const rows = [
    { icon: GitBranch, name: 'Repositories', event: 'push · main', dur: '3.4s', d: '0s' },
    { icon: FileText, name: 'Documentation', event: 'page edited', dur: '4.2s', d: '.8s' },
    { icon: MessageSquare, name: 'Conversations', event: 'thread resolved', dur: '3.8s', d: '1.6s' },
    { icon: Terminal, name: 'Logs', event: 'stream', dur: '2.6s', d: '.4s' },
  ]
  return (
    <div className={panel} aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label">Event pipeline</span>
        <span className="font-mono text-[11px] text-subtle">webhooks</span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r) => (
          <li key={r.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3">
            <r.icon className="h-4 w-4 text-subtle" />
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-sm font-medium">{r.name}</span>
                <span className="truncate font-mono text-[11px] text-subtle">{r.event}</span>
              </div>
              <div className="mt-2 h-px w-full overflow-hidden bg-border">
                <div className="sync-bar h-full w-full origin-left bg-primary/80" style={{ ['--dur' as string]: r.dur, ['--d' as string]: r.d }} />
              </div>
            </div>
            <Check className="h-3.5 w-3.5 text-primary" />
          </li>
        ))}
      </ul>
    </div>
  )
}

const NODES: [number, number, 'code' | 'doc' | 'old'][] = [
  [48, 60, 'code'], [120, 34, 'doc'], [196, 58, 'code'], [262, 30, 'doc'], [318, 76, 'code'],
  [86, 128, 'doc'], [160, 112, 'code'], [236, 128, 'doc'], [300, 150, 'old'], [40, 176, 'old'],
  [124, 192, 'code'], [204, 186, 'doc'], [270, 206, 'code'],
]
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [2, 7], [4, 7], [4, 8], [5, 6], [6, 7],
  [7, 8], [5, 9], [5, 10], [6, 10], [6, 11], [7, 11], [11, 12], [8, 12], [10, 11], [9, 10],
]
const COLOR = { code: 'hsl(var(--brand))', doc: 'hsl(var(--brand-soft))', old: 'hsl(var(--dim))' }

export function GraphVisual() {
  return (
    <div className={panel} aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label">Knowledge graph</span>
        <span className="flex items-center gap-3 font-mono text-[11px] text-subtle">
          <span className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-primary" />code</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-brand-soft" />docs</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-dim" />outdated</span>
        </span>
      </div>
      <svg viewBox="0 0 360 236" className="block w-full">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]}
            stroke="hsl(var(--foreground) / 0.14)" strokeWidth={1}
            pathLength={100}
            className="beam-base"
            style={{ ['--d' as string]: `${0.3 + i * 0.05}s` }}
          />
        ))}
        {/* a query walking the graph */}
        <polyline
          points={[0, 1, 6, 7, 11, 12].map((n) => NODES[n].slice(0, 2).join(',')).join(' ')}
          fill="none" stroke="hsl(var(--brand))" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
          pathLength={100} className="beam-packet" style={{ ['--d' as string]: '1.8s', ['--dur' as string]: '4s' }}
        />
        {NODES.map(([x, y, k], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={k === 'old' ? 3.5 : 4} fill={k === 'old' ? 'hsl(var(--card))' : COLOR[k]} stroke={k === 'old' ? 'hsl(var(--subtle))' : 'none'} strokeDasharray={k === 'old' ? '2 2' : undefined} className={k === 'old' ? '' : 'node-pulse'} style={{ ['--d' as string]: `${(i * 0.37) % 3}s` }} />
            {k !== 'old' && <circle cx={x} cy={y} r={9} fill="none" stroke={COLOR[k]} strokeOpacity={0.18} />}
          </g>
        ))}
      </svg>
    </div>
  )
}

export function ToolVisual() {
  return (
    <div className={`${panel} font-mono text-[12.5px] leading-[1.7]`} aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label font-sans">MCP · tool call</span>
        <span className="text-[11px] text-subtle">200 OK</span>
      </div>
      <pre className="overflow-hidden px-4 py-4 text-muted-foreground">
{`{
  `}<span className="text-brand-soft">&quot;tool&quot;</span>{`: `}<span className="text-foreground">&quot;get_context&quot;</span>{`,
  `}<span className="text-brand-soft">&quot;chunks&quot;</span>{`: [ `}<span className="text-foreground">…</span>{` ],
  `}<span className="text-brand-soft">&quot;entities&quot;</span>{`: [ `}<span className="text-foreground">&quot;RetryPolicy&quot;</span>{` ],
  `}<span className="text-brand-soft">&quot;relationships&quot;</span>{`: [ `}<span className="text-foreground">…</span>{` ],
  `}<span className="text-brand-soft">&quot;sources&quot;</span>{`: [ `}<span className="text-foreground">&quot;repo&quot;</span>{`, `}<span className="text-foreground">&quot;docs&quot;</span>{`, `}<span className="text-foreground">&quot;chat&quot;</span>{` ]
}`}<span className="caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[3px] bg-primary/80" />
      </pre>
    </div>
  )
}

export function ScopeVisual() {
  const rows = [
    { who: 'agent:ci', what: 'repo/billing/*', ok: true },
    { who: 'agent:support', what: 'docs/public', ok: true },
    { who: 'role:viewer', what: 'workspace', ok: true },
    { who: 'agent:ci', what: 'docs/hr/*', ok: false },
  ]
  return (
    <div className={panel} aria-hidden="true">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label">Access scopes</span>
        <Lock className="h-3.5 w-3.5 text-subtle" />
      </div>
      <ul className="divide-y divide-border font-mono text-[12.5px]">
        {rows.map((r, i) => (
          <li key={i} className={`grid grid-cols-[1fr_1fr_auto] items-center gap-3 px-4 py-3 ${r.ok ? '' : 'text-dim'}`}>
            <span className={r.ok ? 'text-foreground' : ''}>{r.who}</span>
            <span className={r.ok ? 'text-muted-foreground' : 'line-through'}>{r.what}</span>
            {r.ok ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-primary"><Check className="h-3 w-3" />read</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px]"><X className="h-3 w-3" />denied</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
