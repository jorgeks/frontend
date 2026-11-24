'use client'

import { useEffect, useRef } from 'react'
import { LOGO_PATH, LOGO_TRANSFORM, LOGO_VIEWBOX } from '@/components/brand/logo-path'

/**
 * The deck's cover visual, built from the real logo: particles are sampled
 * from the ConFuse brain mark, start scattered (fragmented knowledge) and
 * fuse into the brain. Once assembled, "signals" fire across neighbouring
 * nodes and the pointer gently pushes particles aside.
 *
 * Canvas 2D, DPR capped at 2, paused off-screen / in background tabs, and a
 * single static frame under prefers-reduced-motion.
 */

type P = {
  x: number; y: number; tx: number; ty: number; sx: number; sy: number
  vx: number; vy: number; r: number; pink: boolean; delay: number; heat: number; ph: number
}

const BRAND = [230, 63, 168]
const FG = [243, 232, 244]

export function NeuralBrain({ className, density = 1 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const [vbx, vby, vbw, vbh] = LOGO_VIEWBOX.split(' ').map(Number)
    const [ttx, tty] = LOGO_TRANSFORM.match(/[\d.]+/g)!.map(Number)

    let W = 0, H = 0
    let parts: P[] = []
    let edges: [number, number][] = []
    let neigh: number[][] = []
    let raf = 0
    let running = false
    let t0 = 0
    let lastSpark = 0
    const mouse = { x: -9999, y: -9999 }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      W = rect.width; H = rect.height
      if (!W || !H) return
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)

      // rasterise the mark at a modest size and sample its filled pixels
      const S = 260
      const scale = Math.min(S / vbw, S / vbh)
      const off = document.createElement('canvas')
      off.width = Math.ceil(vbw * scale); off.height = Math.ceil(vbh * scale)
      const o = off.getContext('2d')!
      o.setTransform(scale, 0, 0, scale, -vbx * scale, -vby * scale)
      o.translate(ttx, tty)
      o.fill(new Path2D(LOGO_PATH), 'evenodd')
      const img = o.getImageData(0, 0, off.width, off.height).data
      const pts: [number, number][] = []
      const step = 2
      for (let y = 0; y < off.height; y += step)
        for (let x = 0; x < off.width; x += step)
          if (img[(y * off.width + x) * 4 + 3] > 128) pts.push([x, y])

      const target = Math.round((W < 520 ? 520 : 900) * density)
      // even-ish thinning so the stroke structure stays readable
      const keep: [number, number][] = []
      const ratio = Math.min(1, target / pts.length)
      for (const p of pts) if (Math.random() < ratio) keep.push(p)

      // fit into the canvas
      const pad = 0.06
      const fit = Math.min((W * (1 - pad * 2)) / off.width, (H * (1 - pad * 2)) / off.height)
      const ox = (W - off.width * fit) / 2
      const oy = (H - off.height * fit) / 2

      parts = keep.map(([x, y]) => {
        const tx = ox + x * fit + (Math.random() - 0.5) * 1.2
        const ty = oy + y * fit + (Math.random() - 0.5) * 1.2
        // start scattered towards the edges: fragmented sources
        const a = Math.random() * Math.PI * 2
        const d = Math.max(W, H) * (0.45 + Math.random() * 0.5)
        const sx = W / 2 + Math.cos(a) * d * 0.9
        const sy = H / 2 + Math.sin(a) * d * 0.6
        return {
          x: sx, y: sy, tx, ty, sx, sy, vx: 0, vy: 0,
          r: 0.7 + Math.random() * 1.1,
          pink: Math.random() < 0.28,
          delay: Math.random() * 0.3,
          heat: 0,
          ph: Math.random() * Math.PI * 2,
        }
      })

      // neighbour graph (grid hash) for faint links and signal propagation
      const cell = Math.max(10, fit * 9)
      const grid = new Map<string, number[]>()
      parts.forEach((p, i) => {
        const k = `${Math.floor(p.tx / cell)},${Math.floor(p.ty / cell)}`
        const arr = grid.get(k)
        if (arr) arr.push(i)
        else grid.set(k, [i])
      })
      edges = []
      neigh = parts.map(() => [])
      const maxD = cell * 1.0
      parts.forEach((p, i) => {
        const cx = Math.floor(p.tx / cell), cy = Math.floor(p.ty / cell)
        let links = 0
        for (let dx = -1; dx <= 1 && links < 3; dx++)
          for (let dy = -1; dy <= 1 && links < 3; dy++) {
            const arr = grid.get(`${cx + dx},${cy + dy}`)
            if (!arr) continue
            for (const j of arr) {
              if (j <= i || links >= 3) continue
              const q = parts[j]
              const dd = Math.hypot(p.tx - q.tx, p.ty - q.ty)
              if (dd < maxD && dd > maxD * 0.35 && Math.random() < 0.35) {
                edges.push([i, j]); neigh[i].push(j); neigh[j].push(i); links++
              }
            }
          }
      })
    }

    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)

    const frame = (now: number) => {
      if (!t0) t0 = now
      const t = (now - t0) / 1000
      const assemble = reduce ? 1 : t / 1.5
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // propagate signals once fused
      if (!reduce && assemble > 1.1 && now - lastSpark > 420 && parts.length) {
        lastSpark = now
        parts[(Math.random() * parts.length) | 0].heat = 1
      }

      for (const p of parts) {
        const k = ease((assemble - p.delay) / (1 - p.delay * 0.6))
        let gx = p.sx + (p.tx - p.sx) * k
        let gy = p.sy + (p.ty - p.sy) * k
        if (k >= 1 && !reduce) {
          gx += Math.sin(t * 0.8 + p.ph) * 0.6
          gy += Math.cos(t * 0.7 + p.ph) * 0.6
        }
        // pointer repulsion with spring back
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 4900 && k >= 1) {
          const f = (1 - Math.sqrt(d2) / 70) * 1.4
          p.vx += (dx / (Math.sqrt(d2) + 0.01)) * f
          p.vy += (dy / (Math.sqrt(d2) + 0.01)) * f
        }
        p.vx += (gx - p.x) * 0.12
        p.vy += (gy - p.y) * 0.12
        p.vx *= 0.72; p.vy *= 0.72
        p.x += p.vx; p.y += p.vy
        if (reduce) { p.x = p.tx; p.y = p.ty }
      }

      // links fade in as the brain fuses
      const linkA = Math.max(0, Math.min(1, (assemble - 0.7) / 0.5))
      if (linkA > 0) {
        ctx.lineWidth = 0.6
        for (const [i, j] of edges) {
          const a = parts[i], b = parts[j]
          const h = Math.max(a.heat, b.heat)
          ctx.strokeStyle = h > 0.05
            ? `rgba(${BRAND[0]},${BRAND[1]},${BRAND[2]},${0.15 + h * 0.6})`
            : `rgba(${FG[0]},${FG[1]},${FG[2]},${0.07 * linkA})`
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
        }
      }

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (p.heat > 0.02) {
          // hand the signal to a neighbour, decay here
          if (p.heat > 0.6 && Math.random() < 0.18) {
            const n = neigh[i]
            if (n.length) { const j = n[(Math.random() * n.length) | 0]; if (parts[j].heat < 0.3) parts[j].heat = p.heat * 0.96 }
          }
          p.heat *= 0.955
        } else p.heat = 0
        const c = p.heat > 0.05 || p.pink ? BRAND : FG
        const alpha = p.pink ? 0.85 : 0.55
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(1, alpha + p.heat)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + p.heat * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      if (running && !reduce) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    build()
    if (reduce) { running = false; frame(performance.now()) }

    const io = new IntersectionObserver(([e]) => {
      if (reduce) return
      if (e.isIntersecting && !document.hidden) start(); else stop()
    })
    io.observe(canvas)
    const onVis = () => { if (document.hidden) stop() }
    document.addEventListener('visibilitychange', onVis)

    let rt: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(rt)
      rt = setTimeout(() => {
        const prevW = W
        const r = canvas.getBoundingClientRect()
        if (Math.abs(r.width - prevW) < 2) return
        build()
        // keep it assembled on resize
        t0 = performance.now() - 4000
        for (const p of parts) { p.x = p.tx; p.y = p.ty; p.sx = p.tx; p.sy = p.ty }
        if (reduce) frame(performance.now())
      }, 150)
    })
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      stop(); io.disconnect(); ro.disconnect(); clearTimeout(rt)
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
