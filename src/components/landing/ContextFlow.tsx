'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Code2 } from 'lucide-react'
import { LogoMark } from '@/components/brand/Logo'
import { INTEGRATIONS } from './integrations'
import { useInView } from './Reveal'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

type Beam = { d: string; delay: number; dur: number; out: boolean }

/**
 * Product scene from the deck's solution slides: every source is wired once
 * into ConFuse, and ConFuse serves every coding agent. Beams draw in when the
 * scene scrolls into view, then packets keep travelling along them. Below,
 * an agent's single tool call returns cited context.
 *
 * Paths are measured from the real DOM tiles, so the same component works
 * left-to-right on desktop and top-to-bottom on mobile.
 */
export function ContextFlow() {
  const [viewRef, visible] = useInView<HTMLDivElement>()
  const box = useRef<HTMLDivElement>(null)
  const core = useRef<HTMLDivElement>(null)
  const srcRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [beams, setBeams] = useState<Beam[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  useIso(() => {
    const measure = () => {
      const b = box.current, c = core.current
      if (!b || !c) return
      const br = b.getBoundingClientRect()
      const cr = c.getBoundingClientRect()
      const vertical = br.width < 768
      const cx = cr.left - br.left + cr.width / 2
      const cy = cr.top - br.top + cr.height / 2
      const next: Beam[] = []
      const curve = (x1: number, y1: number, x2: number, y2: number) =>
        vertical
          ? `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`
          : `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`

      srcRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const x1 = vertical ? r.left - br.left + r.width / 2 : r.right - br.left
        const y1 = vertical ? r.bottom - br.top : r.top - br.top + r.height / 2
        const x2 = vertical ? cx : cr.left - br.left
        const y2 = vertical ? cr.top - br.top : cy
        next.push({ d: curve(x1, y1, x2, y2), delay: i * 0.37, dur: 2.6 + (i % 3) * 0.35, out: false })
      })
      agentRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const x1 = vertical ? cx : cr.right - br.left
        const y1 = vertical ? cr.bottom - br.top : cy
        const x2 = vertical ? r.left - br.left + r.width / 2 : r.left - br.left
        const y2 = vertical ? r.top - br.top : r.top - br.top + r.height / 2
        next.push({ d: curve(x1, y1, x2, y2), delay: 0.9 + i * 0.6, dur: 2.2, out: true })
      })
      setSize({ w: br.width, h: br.height })
      setBeams(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (box.current) ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={viewRef} data-visible={visible} className="frame relative overflow-hidden p-5 sm:p-8 md:p-10">
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4 md:mb-10">
        <span className="label">Context Layer</span>
        <span className="hidden font-mono text-xs text-subtle sm:inline">sources → confuse → agents</span>
      </div>

      <div
        ref={box}
        className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8"
      >
        {/* beams */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          aria-hidden="true"
        >
          {beams.map((b, i) => (
            <g key={i}>
              <path
                d={b.d}
                pathLength={100}
                fill="none"
                stroke="hsl(var(--foreground) / 0.12)"
                strokeWidth={1}
                className="beam-base"
                style={{ ['--d' as string]: `${b.out ? 0.6 : i * 0.06}s` }}
              />
              {visible && (
                <path
                  d={b.d}
                  pathLength={100}
                  fill="none"
                  stroke={b.out ? 'hsl(var(--brand-soft))' : 'hsl(var(--brand))'}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  className="beam-packet"
                  style={{ ['--d' as string]: `${1.2 + b.delay}s`, ['--dur' as string]: `${b.dur}s` }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* sources */}
        <div className="relative grid grid-cols-4 gap-2 sm:grid-cols-7 md:grid-cols-1 md:gap-2.5 md:justify-self-start md:w-full md:max-w-[240px]">
          {INTEGRATIONS.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => { srcRefs.current[i] = el }}
              className="reveal flex items-center justify-center gap-3 rounded-md border border-border bg-card px-2 py-2 md:justify-start md:px-3"
              data-visible={visible}
              style={{ ['--d' as string]: `${i * 60}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" className="h-5 w-5 object-contain" />
              <span className="hidden min-w-0 md:block">
                <span className="block truncate text-sm font-medium text-foreground">{s.name}</span>
                <span className="block text-[11px] uppercase tracking-eyebrow text-subtle">{s.kind}</span>
              </span>
              <span className="sr-only md:hidden">{s.name}</span>
            </div>
          ))}
        </div>

        {/* ConFuse core */}
        <div className="relative flex flex-col items-center gap-3 justify-self-center">
          <div ref={core} className="relative h-28 w-28 md:h-32 md:w-32">
            <span className="ring-out absolute inset-0 rounded-[28px] border border-primary/40" aria-hidden="true" />
            <span
              className="ring-out absolute inset-0 rounded-[28px] border border-primary/30"
              style={{ animationDelay: '1.5s' }}
              aria-hidden="true"
            />
            {/* rotating hairline */}
            <span className="absolute inset-0 overflow-hidden rounded-[28px] bg-border" aria-hidden="true">
              <span className="spin-slow absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--brand))_40deg,transparent_90deg)]" />
            </span>
            <div className="absolute inset-px flex items-center justify-center rounded-[27px] bg-card">
              <LogoMark className="h-14 w-auto text-foreground md:h-16" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-[-0.01em]">ConFuse</span>
        </div>

        {/* agents */}
        <div className="relative grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-16 md:justify-self-end md:w-full md:max-w-[240px]">
          {['Coding agent', 'Coding agent'].map((label, i) => (
            <div
              key={i}
              ref={(el) => { agentRefs.current[i] = el }}
              className="reveal flex items-center gap-3 rounded-md border border-primary/35 bg-primary/[0.05] px-3 py-3"
              data-visible={visible}
              style={{ ['--d' as string]: `${500 + i * 120}ms` }}
            >
              <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 text-brand-soft sm:flex">
                <Code2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{label}</span>
                <span className="block font-mono text-[11px] text-subtle">get_context()</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <ToolCall play={visible} />
    </div>
  )
}

const QUERY = 'Why does checkout retry failed payments?'
const RESULTS = [
  { src: 'repo', ref: 'services/billing/retry.ts', note: 'L12–48' },
  { src: 'docs', ref: 'Payments runbook', note: '§ Retries' },
  { src: 'chat', ref: '#payments', note: 'design decision' },
]

/** Terminal-style mock of one agent tool call, typed out once in view. */
function ToolCall({ play }: { play: boolean }) {
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!play) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setTyped(QUERY.length); setShown(RESULTS.length + 1); return }
    let i = 0
    let rt: ReturnType<typeof setTimeout>
    const start = setTimeout(function tick() {
      i++
      setTyped(i)
      if (i < QUERY.length) rt = setTimeout(tick, 28 + Math.random() * 40)
      else {
        let k = 0
        const reveal = () => { k++; setShown(k); if (k <= RESULTS.length) rt = setTimeout(reveal, 260) }
        rt = setTimeout(reveal, 450)
      }
    }, 1400)
    return () => { clearTimeout(start); clearTimeout(rt) }
  }, [play])

  return (
    <div className="mt-12 overflow-hidden rounded-lg border border-border bg-background/70 font-mono text-[12.5px] leading-relaxed md:mt-14 md:text-[13px]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-subtle">
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="h-2.5 w-2.5 rounded-full border border-border" />
        <span className="ml-2 text-xs">agent · mcp</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 sm:px-5">
        <p className="text-muted-foreground">
          <span className="text-brand-soft">→</span> get_context
          <span className="text-subtle">(</span>
          <span className="text-foreground">&quot;{QUERY.slice(0, typed)}</span>
          {typed < QUERY.length ? (
            <span className="caret inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-foreground/70" />
          ) : (
            <span className="text-foreground">&quot;</span>
          )}
          <span className="text-subtle">)</span>
        </p>
        <p className={`text-subtle transition-opacity duration-300 ${shown > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-primary">✓</span> context capsule · {RESULTS.length} sources cited
        </p>
        {RESULTS.map((r, i) => (
          <p
            key={r.ref}
            className={`flex flex-wrap gap-x-3 pl-4 transition-all duration-300 ${shown > i + 1 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
          >
            <span className="w-10 text-subtle">{r.src}</span>
            <span className="text-foreground">{r.ref}</span>
            <span className="text-subtle">{r.note}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
