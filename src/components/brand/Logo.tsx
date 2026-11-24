import { cn } from '@/lib/utils'
import { LOGO_PATH, LOGO_TRANSFORM, LOGO_VIEWBOX } from './logo-path'

/**
 * The ConFuse brain mark (official logo, inlined so it inherits `currentColor`
 * and can animate). `draw` traces the outline once and then fills it, the
 * same way the deck reveals its diagrams.
 */
export function LogoMark({
  className,
  draw = false,
  title,
}: {
  className?: string
  draw?: boolean
  title?: string
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn('shrink-0', draw && 'cf-mark-draw', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        transform={LOGO_TRANSFORM}
        d={LOGO_PATH}
        fillRule="evenodd"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={draw ? 3 : 0}
        pathLength={1}
      />
    </svg>
  )
}

/** Mark + wordmark lockup used in the navbar, footer and auth screens. */
export function Logo({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string
  markClassName?: string
  wordClassName?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={cn('h-6 w-auto text-foreground', markClassName)} />
      <span className={cn('text-xl font-bold tracking-[-0.03em] text-foreground', wordClassName)}>
        ConFuse
      </span>
    </span>
  )
}
