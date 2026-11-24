'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/auth'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/Logo'

/**
 * Global marketing/navigation bar.
 *
 * `showUserMenu` renders the authenticated user controls; `showAuth` gates the
 * whole auth area (Sign In and the primary CTA included) for surfaces like docs
 * that keep a navigation-only bar. Every other page keeps the default behaviour.
 *
 * Follows the shared design system: transparent, in-flow bar (~73px), hairline
 * `border-border`, `.container-lg` width, default <Button> for the primary CTA,
 * no glows and 0.2s transitions only.
 */

const NAV_LINKS = [
  { href: '/#features', label: 'Features', testId: 'navbar-features' },
  { href: '/pricing', label: 'Pricing', testId: 'navbar-pricing' },
  { href: '/docs', label: 'Documentation', testId: 'navbar-docs' },
] as const

const goToLogin = () => {
  window.location.href = '/auth/login'
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function Navbar({ showUserMenu = true, showAuth = true }: { showUserMenu?: boolean; showAuth?: boolean }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const signedIn = showUserMenu && isAuthenticated
  const showSignIn = !isLoading && !isAuthenticated

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Escape closes the menu; lock page scroll while it is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) =>
    !href.startsWith('/#') && (pathname === href || pathname?.startsWith(`${href}/`))

  const primaryCta = (className?: string) =>
    signedIn ? (
      <Button asChild className={className} data-testid="navbar-cta">
        <Link href="/dashboard" onClick={() => setOpen(false)}>
          Dashboard
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    ) : (
      <Button onClick={goToLogin} className={className} data-testid="navbar-cta">
        Get started
        <ArrowRight aria-hidden />
      </Button>
    )

  return (
    <header
      className={cn(
        'relative z-40 w-full border-b border-border text-foreground transition-colors duration-200',
        open ? 'bg-background' : 'bg-transparent'
      )}
      data-testid="navbar"
    >
      <div className="container-lg mx-auto flex h-[73px] w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className={cn('flex items-center gap-2.5 rounded-sm', focusRing)}
          data-testid="navbar-brand"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" data-testid="navbar-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-4 py-2 text-[15px] font-medium transition-colors duration-200',
                focusRing,
                isActive(l.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive(l.href) ? 'page' : undefined}
              data-testid={l.testId}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2" data-testid="navbar-actions">
          {showAuth && (
            <div className="hidden items-center gap-2 md:flex">
              {signedIn ? (
                <>
                  <span className="max-w-[160px] truncate text-sm text-muted-foreground" data-testid="navbar-user">
                    {user?.name || user?.email}
                  </span>
                  <Button variant="outline" onClick={logout} data-testid="navbar-sign-out">
                    Sign Out
                  </Button>
                </>
              ) : showSignIn ? (
                <Button variant="ghost" onClick={goToLogin} data-testid="navbar-sign-in">
                  Sign In
                </Button>
              ) : null}
              {primaryCta()}
            </div>
          )}

          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="navbar-mobile-menu"
              onClick={() => setOpen((v) => !v)}
              data-testid="navbar-menu-toggle"
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="navbar-mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-73px)] overflow-y-auto bg-background px-4 pb-8 pt-4 animate-in fade-in-0 duration-200 sm:px-8 md:hidden"
          data-testid="navbar-mobile-menu"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-lg border px-5 py-4 text-lg font-semibold tracking-[-0.01em] transition-colors duration-200',
                  focusRing,
                  isActive(l.href)
                    ? 'border-primary/50 bg-card text-foreground'
                    : 'border-border bg-card text-foreground hover:border-foreground/25'
                )}
                data-testid={`${l.testId}-mobile`}
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />
              </Link>
            ))}
          </nav>

          {showAuth && (
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              {signedIn && (
                <span className="truncate px-1 text-sm text-muted-foreground">{user?.name || user?.email}</span>
              )}
              {primaryCta('h-12 w-full text-base')}
              {signedIn ? (
                <Button variant="outline" size="lg" onClick={logout} className="w-full">
                  Sign Out
                </Button>
              ) : showSignIn ? (
                <Button variant="outline" size="lg" onClick={goToLogin} className="w-full">
                  Sign In
                </Button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
