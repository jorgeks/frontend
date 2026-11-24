'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Pointer-follow highlight for a group of `.spotlight` cards (Linear/Vercel
 * style): one listener on the group writes --mx/--my on every card, so the
 * light also bleeds into the neighbours' borders. Touch devices never fire it.
 */
export function SpotlightGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    ref.current.dataset.spotlightActive = 'true'
    for (const card of ref.current.querySelectorAll<HTMLElement>('.spotlight')) {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      onPointerMove={onMove}
      onPointerLeave={() => ref.current && (ref.current.dataset.spotlightActive = 'false')}
    >
      {children}
    </div>
  )
}
