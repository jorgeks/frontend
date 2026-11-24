'use client'

import { Reveal } from "./Reveal";
import { SectionHeading } from "./ProblemSolutionSection";
import { Quote, RefreshCw, Bot, Lock, Zap, TrendingUp } from "lucide-react";

const REASONS = [
  {
    icon: Quote,
    title: "Grounded answers, with receipts",
    body: "Every answer points back to the exact source it came from — no guessing, no vibes, just citations you can click.",
  },
  {
    icon: RefreshCw,
    title: "Always current",
    body: "Change lands in your stack, context updates with it. What you ask today reflects what's true today.",
  },
  {
    icon: Bot,
    title: "Built for agents and humans",
    body: "The same trusted context serves your dashboard and the AI agents wired into your workflow — one truth, two audiences.",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "Your data stays yours: scoped access, row-level security, and explicit permissions for every agent and teammate.",
  },
  {
    icon: Zap,
    title: "Fast where it counts",
    body: "Complex, multi-hop questions answered in milliseconds — because insight that arrives late is insight that never arrived.",
  },
  {
    icon: TrendingUp,
    title: "Grows with you",
    body: "From your first repository to enterprise scale, quotas and controls flex with your team — never a re-platform.",
  },
];

export function WhyConFuseSection() {
  return (
    <section className="relative border-t border-border py-20 md:py-24">
      <div className="container-lg">
        <SectionHeading
          eyebrow="Why ConFuse"
          title={<>Context you can trust.<br />Speed you can feel.</>}
          lede={<>Teams reach for ConFuse when the cost of a wrong answer finally
              outweighs the cost of another tool.</>}
        />

        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * 90} className="h-full">
              <div className="group h-full border-t border-border py-8 pr-4">
                <div className="mb-3 flex items-center gap-3">
                  <reason.icon className="h-[18px] w-[18px] text-brand-soft" aria-hidden="true" />
                  <h3 className="font-sans text-[17px] font-semibold tracking-[-0.01em]">{reason.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
