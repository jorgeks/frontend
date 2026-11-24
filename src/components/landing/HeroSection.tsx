'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, GitBranch, FileText, MessageSquare, Terminal, Bot } from "lucide-react";
import { useAuth } from '@/contexts/auth';
import { DemoModal } from "./DemoModal";

const SOURCE_TAGS = [
  { icon: GitBranch, label: "Repositories" },
  { icon: FileText, label: "Documentation" },
  { icon: MessageSquare, label: "Conversations" },
  { icon: Terminal, label: "Logs" },
];

/** Integrations shown in the product visual and the logo strip (public/logos). */
const LOGOS = [
  { src: "/logos/github.png", name: "GitHub" },
  { src: "/logos/bitbucket.png", name: "Bitbucket" },
  { src: "/logos/notion.png", name: "Notion" },
  { src: "/logos/confluence.png", name: "Confluence" },
  { src: "/logos/google-drive.png", name: "Google Drive" },
  { src: "/logos/dropbox.png", name: "Dropbox" },
];

/**
 * Hero — styled after the ConFuse pitch deck (v7): pink-dot eyebrow, tight
 * bold display type, accent on the key phrase, soft-bordered 14px cards and a
 * glow backdrop. Copy is intentionally unchanged; only the look moved.
 * Colours come from the scoped design tokens (.landing) so the hero follows
 * the shared palette.
 */
export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleGetStarted = () => {
    window.location.href = isAuthenticated ? '/dashboard' : '/auth/login';
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* backdrop: accent glows + faint dot grid */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl animate-[float-slow_11s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.09)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground backdrop-blur animate-[fade-in-up_0.6s_ease-out_both]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              v1.0.0-beta · The Context Layer for coding agents is here
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-[-0.03em] leading-[1.02] animate-[fade-in-up_0.7s_ease-out_0.1s_both]">
                ConFuse:{" "}
                <span className="text-primary">Context Layer for coding agents</span>.
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-foreground/90 animate-[fade-in-up_0.7s_ease-out_0.25s_both]">
                Stop hunting for context. Start shipping with it.
              </h2>
              <p className="max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground animate-[fade-in-up_0.7s_ease-out_0.4s_both]">
                Your repositories, documentation, conversations, and logs — connected
                in one living context layer. Every answer, for every teammate and every
                AI agent, is grounded in what your team actually knows.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 animate-[fade-in-up_0.7s_ease-out_0.55s_both]">
              <Button
                className="h-12 rounded-full px-7 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.7)] group"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full px-7 text-base font-semibold border-border bg-card/40 hover:bg-card"
                onClick={() => setIsDemoOpen(true)}
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* source-type strip: what ConFuse unifies */}
            <div className="flex flex-wrap gap-2 animate-[fade-in-up_0.7s_ease-out_0.7s_both]">
              {SOURCE_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1.5 text-sm font-medium text-foreground/80"
                >
                  <tag.icon className="w-3.5 h-3.5 text-primary" />
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* product visual: sources -> ConFuse -> agents */}
          <ProductVisual />
        </div>

        {/* integration logo strip */}
        <ul
          aria-label="Integrations"
          className="mt-16 md:mt-20 grid grid-cols-3 sm:grid-cols-6 gap-3 border-t border-border pt-8 animate-[fade-in-up_0.7s_ease-out_0.9s_both]"
        >
          {LOGOS.map((logo) => (
            <li
              key={logo.name}
              className="flex h-14 items-center justify-center gap-2.5 rounded-[14px] border border-border bg-card/40 px-3 transition-colors hover:bg-card"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt="" className="h-full w-full object-contain" loading="lazy" />
              </span>
              <span className="hidden md:inline text-sm font-semibold tracking-[-0.01em] text-foreground/80">
                {logo.name}
              </span>
              <span className="sr-only md:hidden">{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </section>
  );
}

/**
 * Decorative product visual in the deck's card language: integration tiles
 * feed a glowing ConFuse core that serves the context to a coding agent.
 */
function ProductVisual() {
  const left = LOGOS.slice(0, 3);
  const right = LOGOS.slice(3);

  return (
    <div
      className="relative animate-[fade-in-up_0.8s_ease-out_0.35s_both]"
      aria-hidden="true"
    >
      <div className="absolute -inset-6 rounded-[28px] bg-primary/15 blur-3xl" />
      <div className="relative rounded-[20px] border border-border bg-card/70 p-5 sm:p-6 shadow-2xl backdrop-blur">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 pb-4 border-b border-border">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="ml-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Context Layer
          </span>
        </div>

        <div className="relative mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
          <LogoColumn logos={left} />

          {/* core */}
          <div className="relative flex flex-col items-center">
            <span className="absolute h-28 w-28 rounded-full border border-primary/40 animate-[pulse-soft_3s_ease-in-out_infinite]" />
            <span className="absolute h-40 w-40 rounded-full border border-primary/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/60 bg-primary/15 shadow-[0_0_50px_hsl(var(--primary)/0.45)]">
              <span className="text-sm font-bold tracking-[-0.02em]">ConFuse</span>
            </div>
          </div>

          <LogoColumn logos={right} />
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-[14px] border border-primary/50 bg-primary/10 px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/15">
            <Bot className="h-4 w-4 text-primary" />
          </span>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-foreground/25" />
            <div className="h-2 w-1/2 rounded-full bg-foreground/15" />
          </div>
          <span className="h-2 w-2 rounded-full bg-primary animate-[pulse-soft_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

function LogoColumn({ logos }: { logos: typeof LOGOS }) {
  return (
    <div className="flex flex-col gap-3">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center gap-2.5 rounded-[12px] border border-border bg-background/40 p-2 sm:px-3"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" className="h-full w-full object-contain" />
          </span>
          <span className="hidden sm:inline truncate text-xs font-semibold text-foreground/80">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
}
