'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-reveal wrapper: a short 0.2s fade when children enter the viewport
 * (Muse-style minimal motion). CSS-transition based (no animation library), stagger via `delay`.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${Math.min(delay, 120)}ms` }}
    >
      {children}
    </div>
  )
}
