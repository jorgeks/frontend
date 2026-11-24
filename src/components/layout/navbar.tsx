'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useAuth } from '@/contexts/auth'
import { cn } from '@/lib/utils'

/**
 * Global marketing/navigation bar.
 *
 * `showUserMenu` renders the authenticated user controls; `showAuth` gates the
 * whole auth area (Sign In and the primary CTA included) for surfaces like docs
 * that keep a navigation-only bar. Every other page keeps the default behaviour.
 *
 * Visual language follows the ConFuse deck: near-black surface, hairline
 * white/13% borders, #E63FA8 accent with a soft pink glow, Space Grotesk.
 */

const NAV_LINKS = [
  { href: '/#features', label: 'Features', testId: 'navbar-features' },
  { href: '/pricing', label: 'Pricing', testId: 'navbar-pricing' },
  { href: '/docs', label: 'Documentation', testId: 'navbar-docs' },
] as const

const goToLogin = () => {
  window.location.href = '/auth/login'
}

export function Navbar({ showUserMenu = true, showAuth = true }: { showUserMenu?: boolean; showAuth?: boolean }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  // Slightly denser bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    !href.startsWith('/#') && (pathname === href || pathname?.startsWith(`${href}/`))

  const primaryCta = signedIn ? (
    <Link
      href="/dashboard"
      className="cf-cta group rounded-md"
      data-testid="navbar-cta"
    >
      Dashboard
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  ) : (
    <button type="button" onClick={goToLogin} className="cf-cta group rounded-md" data-testid="navbar-cta">
      Get started
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </button>
  )

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b text-foreground backdrop-blur-xl transition-colors duration-300',
        scrolled || open
          ? 'border-border bg-background/85'
          : 'border-foreground/[0.08] bg-background/60'
      )}
      data-testid="navbar"
    >
      {/* Deck-style controls built on the shared theme tokens (primary = brand pink). */}
      <style>{`
        .cf-cta{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 16px;
          background:hsl(var(--primary));color:hsl(var(--primary-foreground));font-size:14px;font-weight:600;
          letter-spacing:-.01em;white-space:nowrap;
          box-shadow:0 0 0 1px hsl(0 0% 100% / .18) inset,0 8px 28px -8px hsl(var(--primary) / .65);
          transition:filter .2s,box-shadow .2s,transform .2s}
        .cf-cta:hover{filter:brightness(1.08);box-shadow:0 0 0 1px hsl(0 0% 100% / .28) inset,0 10px 34px -8px hsl(var(--primary) / .85)}
        .cf-cta:active{transform:translateY(1px)}
        .cf-cta:focus-visible,.cf-ghost:focus-visible,.cf-link:focus-visible{outline:2px solid hsl(var(--ring));outline-offset:2px}
        .cf-ghost{display:inline-flex;align-items:center;height:38px;padding:0 14px;
          border:1px solid hsl(var(--border));color:hsl(var(--foreground));font-size:14px;font-weight:500;white-space:nowrap;
          transition:border-color .2s,background-color .2s}
        .cf-ghost:hover{border-color:hsl(var(--foreground) / .3);background:hsl(var(--foreground) / .04)}
        @keyframes cf-drop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
        .cf-drop{animation:cf-drop .28s cubic-bezier(.2,.7,.2,1) both}
        @media (prefers-reduced-motion:reduce){.cf-drop{animation:none}}
      `}</style>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="cf-link flex items-center gap-2.5 rounded-sm"
          data-testid="navbar-brand"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.9)]"
          />
          <span className="text-xl font-bold tracking-[-0.02em] text-foreground">ConFuse</span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-lg border border-foreground/[0.10] bg-foreground/[0.03] p-1 md:flex"
          data-testid="navbar-links"
          aria-label="Main"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'cf-link rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
                isActive(l.href)
                  ? 'bg-foreground/[0.08] text-foreground'
                  : 'text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground'
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
                  <span
                    className="max-w-[160px] truncate text-sm text-muted-foreground/70"
                    data-testid="navbar-user"
                  >
                    {user?.name || user?.email}
                  </span>
                  <button type="button" onClick={logout} className="cf-ghost rounded-md" data-testid="navbar-sign-out">
                    Sign Out
                  </button>
                </>
              ) : showSignIn ? (
                <button type="button" onClick={goToLogin} className="cf-ghost rounded-md" data-testid="navbar-sign-in">
                  Sign In
                </button>
              ) : null}
              {primaryCta}
            </div>
          )}

          <div className="md:hidden">
            <button
              type="button"
              className="cf-ghost rounded-md !h-10 !w-10 !justify-center !p-0"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="navbar-mobile-menu"
              onClick={() => setOpen((v) => !v)}
              data-testid="navbar-menu-toggle"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="navbar-mobile-menu"
          className="cf-drop absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-foreground/[0.08] bg-background px-4 pb-8 pt-4 sm:px-6 md:hidden"
          data-testid="navbar-mobile-menu"
        >
          <div className="mb-3 flex items-center gap-3 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Menu
          </div>
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'cf-link flex items-center justify-between rounded-lg border px-5 py-4 text-lg font-semibold tracking-[-0.01em] transition-colors',
                  isActive(l.href)
                    ? 'border-primary/55 bg-primary/[0.06] text-foreground'
                    : 'border-border bg-card text-foreground hover:border-foreground/25'
                )}
                data-testid={`${l.testId}-mobile`}
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-muted-foreground/70" aria-hidden />
              </Link>
            ))}
          </nav>

          {showAuth && (
            <div className="mt-6 flex flex-col gap-3 border-t border-foreground/[0.10] pt-6">
              {signedIn ? (
                <>
                  <span className="truncate px-1 text-sm text-muted-foreground/70">{user?.name || user?.email}</span>
                  <Link href="/dashboard" className="cf-cta rounded-md !h-12 justify-center text-base" onClick={() => setOpen(false)}>
                    Dashboard
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <button type="button" onClick={logout} className="cf-ghost rounded-md !h-12 justify-center text-base">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={goToLogin} className="cf-cta rounded-md !h-12 justify-center text-base">
                    Get started
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                  {showSignIn && (
                    <button type="button" onClick={goToLogin} className="cf-ghost rounded-md !h-12 justify-center text-base">
                      Sign In
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}
