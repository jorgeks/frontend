'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Closing CTA — deck-style "thank you" slide: centred display headline on a
 * glowing, softly bordered panel. Copy and destinations unchanged
 * (primary -> /billing, secondary -> /pricing).
 */
export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-primary/50 bg-card px-6 py-16 text-center shadow-[inset_0_0_80px_hsl(var(--primary)/0.10)] md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" />
              <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            </div>

            <div className="relative">
              <h2 className="mb-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                Ready to unify your <span className="text-primary">context?</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
                Start free, invite your team when it clicks, and scale when you&apos;re
                ready. No credit card required.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.7)] hover:bg-primary/90"
                >
                  <Link href="/billing">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-border bg-card/40 px-7 text-base font-semibold hover:bg-card"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
