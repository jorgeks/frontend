'use client'

import { Reveal } from "./Reveal";
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
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="eyebrow mb-4">
              Why ConFuse
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.1] mb-5">
              Context you can trust.
              <br />
              Speed you can feel.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Teams reach for ConFuse when the cost of a wrong answer finally
              outweighs the cost of another tool.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * 120}>
              <div className="card-lit h-full rounded-xl border border-border p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 group">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-primary/30 bg-brand-deep text-brand-soft mb-6 transition-transform duration-300 group-hover:scale-110">
                  <reason.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mb-3">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
