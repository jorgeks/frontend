'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Fires once when the element enters the viewport and exposes it as
 * `data-visible`, so CSS can run both the entrance (.reveal: fade, 16px rise,
 * short blur, deck easing) and any nested one-shot animation (logo draw,
 * beams, underline growth). Stagger with `delay` (ms).
 */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, visible] as const
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  plain = false,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  /** Only flag visibility (for nested animations), without the fade-in. */
  plain?: boolean
}) {
  const [ref, visible] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn(!plain && 'reveal', className)}
      style={{ ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
