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
    <section className="relative section">
      <div className="container-lg">
        <Reveal>
          <div className="max-w-[768px] mx-auto text-center mb-12">
            <p className="eyebrow mb-4">
              Why ConFuse
            </p>
            <h2 className="text-3xl md:text-5xl font-medium leading-[1.2] mb-4">
              Context you can trust.
              <br />
              Speed you can feel.
            </h2>
            <p className="text-lg leading-[1.5] text-subtitle">
              Teams reach for ConFuse when the cost of a wrong answer finally
              outweighs the cost of another tool.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={(index % 3) * 120}>
              <div className="card-chamfer h-full p-8 group">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-brand-mid bg-brand-deep text-brand-soft mb-6">
                  <reason.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium leading-[1.5] mb-2">{reason.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
