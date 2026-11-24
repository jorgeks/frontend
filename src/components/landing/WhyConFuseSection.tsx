'use client'

import { Reveal } from "./Reveal";

const REASONS = [
  {
    title: "Grounded answers, with receipts",
    body: "Every answer points back to the exact source it came from — no guessing, no vibes, just citations you can click.",
  },
  {
    title: "Always current",
    body: "Change lands in your stack, context updates with it. What you ask today reflects what's true today.",
  },
  {
    title: "Built for agents and humans",
    body: "The same trusted context serves your dashboard and the AI agents wired into your workflow — one truth, two audiences.",
  },
  {
    title: "Private by design",
    body: "Your data stays yours: scoped access, row-level security, and explicit permissions for every agent and teammate.",
  },
  {
    title: "Fast where it counts",
    body: "Complex, multi-hop questions answered in milliseconds — because insight that arrives late is insight that never arrived.",
  },
  {
    title: "Grows with you",
    body: "From your first repository to enterprise scale, quotas and controls flex with your team — never a re-platform.",
  },
];

/**
 * Spec-sheet layout (Linear's feature lists): a sticky heading on the left and
 * the six reasons as indexed rows with hairlines on the right. No icons, no
 * boxes; hover only shifts colour (Vercel's 0.15s state change).
 */
export function WhyConFuseSection() {
  return (
    <section className="relative border-t border-border py-20 md:py-24">
      <div className="container-lg grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-5 text-subtle">Why ConFuse</p>
          <h2 className="mb-5 text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[2.75rem]">
            Context you can trust.<br />Speed you can feel.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Teams reach for ConFuse when the cost of a wrong answer finally
            outweighs the cost of another tool.
          </p>
        </Reveal>

        <div role="list" className="border-b border-border">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 60}>
              <div role="listitem" className="why-row grid gap-2 border-t border-border py-6 sm:grid-cols-[3rem_minmax(0,1fr)] md:py-7">
                <span className="why-idx font-mono text-xs text-dim sm:pt-1">0{index + 1}</span>
                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-8">
                  <h3 className="why-title font-sans text-[17px] font-semibold tracking-[-0.01em]">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
