'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Reveal } from "./Reveal";

/**
 * Closing CTA, after the deck's "thank you" slide: the ConFuse mark traces
 * itself in, then the headline and the two actions. Copy and destinations
 * unchanged (primary -> /billing, secondary -> /pricing).
 */
export function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 md:py-24">
      <div className="container-md">
        <Reveal plain className="relative flex flex-col items-center text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.12),transparent)]"
            aria-hidden="true"
          />
          <LogoMark draw className="relative mb-10 h-24 w-auto text-foreground md:h-28" />
          <Reveal delay={600}>
            <h2 className="mb-5 text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[2.75rem]">
              Ready to unify your <span className="text-primary">context?</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              Start free, invite your team when it clicks, and scale when you&apos;re
              ready. No credit card required.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/billing">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
