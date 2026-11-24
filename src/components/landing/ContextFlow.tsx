'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/brand/Logo'
import { SOURCE_CATEGORIES } from './integrations'
import { useInView } from './Reveal'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

/** Agent clients the product's own help copy names for the MCP server. */
const AGENTS = ['Cursor', 'Windsurf', 'Claude Desktop']

/** One sync cycle, in seconds: sources → ConFuse → agents. */
const CYCLE = 6
const IN_STEP = 0.12
const OUT_START = 0.75

type Line = { d: string; delay: number }

/**
 * Product scene: what ConFuse unifies (by category) wired once into ConFuse,
 * which serves the coding agents. Hairline paths, no particles: one
 * deterministic signal per cycle draws along each line in order (sources,
 * then hub, then agents) and the card it reaches lights its edge for a beat.
 * Timing comes from measured references (Supermemory's stroke flash at ~2.5%
 * of a 6s loop; Linear's cubic-bezier(.32,.72,0,1) for drawn strokes).
 * Paths are measured from the DOM, so it lays out left-to-right on desktop
 * and top-to-bottom on phones.
 */
export function ContextFlow() {
  const [viewRef, visible] = useInView<HTMLDivElement>()
  const box = useRef<HTMLDivElement>(null)
  const core = useRef<HTMLDivElement>(null)
  const coreWrap = useRef<HTMLDivElement>(null)
  const srcRefs = useRef<(HTMLDivElement | null)[]>([])
  const agentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lines, setLines] = useState<Line[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  useIso(() => {
    const measure = () => {
      const b = box.current, c = core.current
      if (!b || !c) return
      const br = b.getBoundingClientRect()
      const cr = c.getBoundingClientRect()
      const wr = coreWrap.current?.getBoundingClientRect() ?? cr
      const vertical = br.width < 768
      const cx = cr.left - br.left + cr.width / 2
      const cy = cr.top - br.top + cr.height / 2
      const curve = (x1: number, y1: number, x2: number, y2: number) =>
        vertical
          ? `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`
          : `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`
      const next: Line[] = []
      srcRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        next.push({
          d: curve(
            vertical ? r.left - br.left + r.width / 2 : r.right - br.left,
            vertical ? r.bottom - br.top : r.top - br.top + r.height / 2,
            vertical ? cx : cr.left - br.left,
            vertical ? cr.top - br.top : cy
          ),
          delay: i * IN_STEP,
        })
      })
      agentRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        next.push({
          d: curve(
            vertical ? cx : cr.right - br.left,
            vertical ? wr.bottom - br.top + 4 : cy,
            vertical ? r.left - br.left + r.width / 2 : r.left - br.left,
            vertical ? r.top - br.top : r.top - br.top + r.height / 2
          ),
          delay: OUT_START + i * IN_STEP,
        })
      })
      setSize({ w: br.width, h: br.height })
      setLines(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (box.current) ro.observe(box.current)
    return () => ro.disconnect()
  }, [])

  const cyc = { ['--cycle' as string]: `${CYCLE}s` }

  return (
    <div ref={viewRef} data-visible={visible} className="frame relative overflow-hidden p-5 sm:p-8 md:p-10" style={cyc}>
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4 md:mb-10">
        <span className="label">Context Layer</span>
        <span className="hidden font-mono text-xs text-subtle sm:inline">sources → confuse → agents</span>
      </div>

      <div ref={box} className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          aria-hidden="true"
        >
          {lines.map((l, i) => (
            <g key={i}>
              <path d={l.d} pathLength={100} fill="none" stroke="hsl(var(--foreground) / 0.14)" strokeWidth={1} className="beam-base" style={{ ['--d' as string]: `${i * 0.05}s` }} />
              {visible && (
                <path
                  d={l.d}
                  pathLength={100}
                  fill="none"
                  stroke="hsl(var(--brand))"
                  strokeWidth={1.25}
                  className="flow-signal"
                  style={{ ['--d' as string]: `${1.4 + l.delay}s` }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* what ConFuse unifies, by category */}
        <div className="relative grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-3 md:justify-self-start md:w-full md:max-w-[280px]">
          {SOURCE_CATEGORIES.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => { srcRefs.current[i] = el }}
              className={`reveal rounded-md border border-border bg-card px-3 py-2.5 ${visible ? 'flow-edge' : ''}`}
              data-visible={visible}
              style={{ ['--d' as string]: `${i * 80}ms`, ['--fd' as string]: `${1.4 + i * IN_STEP}s` }}
            >
              <div className="flex items-center gap-2">
                <c.icon className="h-4 w-4 text-subtle" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{c.name}</span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {c.items.map((it) => (
                  <li key={it.label} className="inline-flex items-center gap-1.5 rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {it.icon && <img src={it.icon} alt="" className="h-3.5 w-3.5 object-contain" />}
                    {it.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ConFuse */}
        <div ref={coreWrap} className="relative flex flex-col items-center gap-3 justify-self-center">
          <div
            ref={core}
            className={`flex h-28 w-28 items-center justify-center rounded-[24px] border border-border bg-card md:h-32 md:w-32 ${visible ? 'flow-edge' : ''}`}
            style={{ ['--fd' as string]: `${1.4 + 0.6}s` }}
          >
            <LogoMark className="h-14 w-auto text-foreground md:h-16" />
          </div>
          <span className="relative rounded bg-card px-2 text-sm font-semibold tracking-[-0.01em]">ConFuse</span>
        </div>

        {/* agents */}
        <div className="relative grid grid-cols-3 gap-2 md:grid-cols-1 md:gap-6 md:justify-self-end md:w-full md:max-w-[240px]">
          {AGENTS.map((label, i) => (
            <div
              key={label}
              ref={(el) => { agentRefs.current[i] = el }}
              className={`reveal rounded-md border border-border bg-card px-3 py-3 ${visible ? 'flow-edge' : ''}`}
              data-visible={visible}
              style={{ ['--d' as string]: `${400 + i * 100}ms`, ['--fd' as string]: `${1.4 + OUT_START + 0.6 + i * IN_STEP}s` }}
            >
              <span className="block text-[13px] font-medium leading-tight sm:truncate sm:text-sm">{label}</span>
              <span className="sr-only"> (coding agent)</span>
              <span className="hidden font-mono text-xs text-subtle sm:block">get_context</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
