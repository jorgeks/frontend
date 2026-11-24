'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Closing CTA — deck-style "thank you" slide: centred display headline in a
 * lit .frame panel with the top glow and grid backdrop. Copy and destinations unchanged
 * (primary -> /billing, secondary -> /pricing).
 */
export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="frame relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-glow-top" />
              <div className="absolute inset-0 bg-grid" />
            </div>

            <div className="relative">
              <h2 className="font-display mb-5 text-3xl font-bold leading-[1.05] tracking-display md:text-5xl">
                Ready to unify your <span className="text-gradient-display">context?</span>
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
                Start free, invite your team when it clicks, and scale when you&apos;re
                ready. No credit card required.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/billing">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
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
