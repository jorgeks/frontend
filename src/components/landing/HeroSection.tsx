'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, GitBranch, FileText, MessageSquare, Terminal } from "lucide-react";
import { useAuth } from '@/contexts/auth';
import { DemoModal } from "./DemoModal";
import { NeuralBrain } from "./NeuralBrain";
import { ContextFlow } from "./ContextFlow";
import { INTEGRATIONS } from "./integrations";

const SOURCE_TAGS = [
  { icon: GitBranch, label: "Repositories" },
  { icon: FileText, label: "Documentation" },
  { icon: MessageSquare, label: "Conversations" },
  { icon: Terminal, label: "Logs" },
];

/**
 * Hero, after the deck's cover slide: copy on the left, the ConFuse brain on
 * the right built from particles that fuse into the real logo. Below it, the
 * product scene (sources -> ConFuse -> agents) and the integrations marquee.
 * Copy is unchanged; only the look and motion moved.
 */
export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleGetStarted = () => {
    window.location.href = isAuthenticated ? '/dashboard' : '/auth/login';
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-lg relative pt-10 md:pt-16 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-4">
          {/* copy */}
          <div className="flex min-w-0 max-w-full flex-col items-start text-left">
            <a
              href="#features"
              className="rise group inline-flex max-w-full items-center gap-2.5 rounded-full border border-border py-1 pl-1 pr-3.5 text-xs text-muted-foreground transition-colors duration-200 hover:border-foreground/25 hover:text-foreground sm:text-sm"
            >
              <span className="rounded-full border border-primary/40 bg-primary/10 shrink-0 whitespace-nowrap px-2.5 py-0.5 font-mono text-[11px] text-brand-soft">
                v1.0.0-beta
              </span>
              <span className="min-w-0 truncate">The Context Layer for coding agents is here</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <h1
              className="rise mt-7 font-display text-[2.4rem] font-bold leading-[1.06] tracking-[-0.035em] text-foreground sm:text-[3.2rem] xl:text-[3.6rem]"
              style={{ ['--d' as string]: '80ms' }}
            >
              ConFuse: Context Layer for <span className="text-primary">coding agents</span>.
            </h1>
            <h2
              className="rise mt-6 font-sans text-lg font-medium tracking-[-0.01em] text-foreground/90 md:text-xl"
              style={{ ['--d' as string]: '180ms' }}
            >
              Stop hunting for context. Start shipping with it.
            </h2>
            <p
              className="rise mt-3 max-w-[560px] text-base leading-relaxed text-muted-foreground md:text-[17px]"
              style={{ ['--d' as string]: '260ms' }}
            >
              Your repositories, documentation, conversations, and logs — connected
              in one living context layer. Every answer, for every teammate and every
              AI agent, is grounded in what your team actually knows.
            </p>

            <div
              className="rise mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              style={{ ['--d' as string]: '340ms' }}
            >
              <Button size="lg" variant="secondary" className="group" onClick={handleGetStarted}>
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsDemoOpen(true)}>
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* what ConFuse unifies */}
            <ul
              className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
              style={{ ['--d' as string]: '420ms' }}
            >
              {SOURCE_TAGS.map((tag) => (
                <li key={tag.label} className="inline-flex items-center gap-2">
                  <tag.icon className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
                  {tag.label}
                </li>
              ))}
            </ul>
          </div>

          {/* the brain: fragmented dots fuse into the ConFuse mark */}
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
            <div
              className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.10),transparent)]"
              aria-hidden="true"
            />
            <NeuralBrain className="relative block aspect-[1020/868] w-full" />
          </div>
        </div>

        {/* product scene */}
        <div className="mt-12 md:mt-16">
          <ContextFlow />
        </div>

        {/* integrations marquee */}
        <div className="mt-14 pb-16 md:mt-20 md:pb-20">
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-eyebrow text-subtle">
            Integrations
          </p>
          <div className="marquee overflow-hidden" aria-label="Integrations">
            <ul className="marquee-track flex w-max gap-12 pr-12">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((logo, i) => (
                <li
                  key={`${logo.name}-${i}`}
                  aria-hidden={i >= INTEGRATIONS.length ? true : undefined}
                  className="flex items-center gap-3 text-[15px] font-medium text-muted-foreground opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt="" className="h-6 w-6 object-contain" loading="lazy" />
                  {logo.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </section>
  );
}
