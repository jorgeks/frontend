'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/**
 * Site footer for the public landing surface.
 *
 * Column layout on the shared design system: hairline `border-border`,
 * `.container-lg` width, eyebrow labels with the brand dot, no glows.
 */

type FooterLink = { href: string; label: string; testId?: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features', testId: 'footer-features' },
      { href: '/pricing', label: 'Pricing', testId: 'footer-pricing' },
      { href: '/changelog', label: 'Changelog', testId: 'footer-changelog' },
      { href: '/status', label: 'Status', testId: 'footer-status' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs', label: 'Documentation', testId: 'footer-docs' },
      { href: '/blog', label: 'Blog', testId: 'footer-blog' },
      { href: '/help', label: 'Help', testId: 'footer-help' },
      { href: '/community', label: 'Community', testId: 'footer-community' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About', testId: 'footer-about' },
      { href: '/careers', label: 'Careers', testId: 'footer-careers' },
      { href: '/security', label: 'Security', testId: 'footer-security' },
      { href: '/contact', label: 'Contact', testId: 'footer-contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy', testId: 'footer-privacy' },
      { href: '/terms', label: 'Terms', testId: 'footer-terms' },
      { href: '/cookies', label: 'Cookies', testId: 'footer-cookies' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-background pb-10 pt-16 text-foreground"
      data-testid="footer"
    >

      <div className="container-lg mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5" data-testid="footer-brand">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-primary"
              />
              <span className="text-2xl font-bold tracking-[-0.02em]">ConFuse</span>
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Context Layer for coding agents
            </p>
            <Link
              href="/status"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground/25 hover:text-foreground"
            >
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
              Status
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
            data-testid="footer-links"
            aria-label="Footer"
          >
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="flex items-center gap-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  {col.title}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        data-testid={l.testId}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground/70" data-testid="footer-copyright">
            © {new Date().getFullYear()} ConFuse. All rights reserved.
          </p>
          <span aria-hidden className="block h-0.5 w-24 bg-primary" />
        </div>
      </div>
    </footer>
  )
}
