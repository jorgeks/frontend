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
 * Hero — pitch-deck (v7) brand on the measured Muse spec: announcement pill,
 * 80/84 display headline with the 120deg white-magenta-white gradient, two
 * text greys, hairline borders, no glows and no entrance motion; then the
 * product visual in a .frame and the integration logo strip. Copy is intentionally
 * unchanged; only the look moved. Styling relies on the shared design system
 * (tokens + utilities in globals.css).
 */
export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleGetStarted = () => {
    window.location.href = isAuthenticated ? '/dashboard' : '/auth/login';
  };

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* backdrop: faint grid with a soft radial tint behind the headline */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-glow-top" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="container-lg section relative z-10 pt-28 md:pt-36">
        {/* copy, centred */}
        <div className="mx-auto flex max-w-[1024px] flex-col items-center text-center">
          <div className="pill-announce max-w-full text-xs sm:text-sm">
            <span className="pill-announce-inner shrink-0 whitespace-nowrap">v1.0.0-beta</span>
            <span className="text-left">
              The Context Layer for coding agents is here
              <ArrowRight aria-hidden="true" className="ml-1.5 inline h-3.5 w-3.5 align-[-2px]" />
            </span>
          </div>

          <h1 className="text-gradient-display font-display mt-8 text-4xl sm:text-5xl md:text-[80px] md:leading-[84px] font-bold tracking-display leading-[1.08]">
            ConFuse: Context Layer for coding agents.
          </h1>
          <h2 className="mt-6 font-sans text-lg md:text-xl font-medium tracking-display text-subtitle">
            Stop hunting for context. Start shipping with it.
          </h2>
          <p className="mt-4 max-w-[768px] text-base md:text-lg md:leading-[27px] tracking-display text-muted-foreground">
            Your repositories, documentation, conversations, and logs — connected
            in one living context layer. Every answer, for every teammate and every
            AI agent, is grounded in what your team actually knows.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <Button size="lg" className="group" onClick={handleGetStarted}>
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsDemoOpen(true)}>
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>

          {/* source-type strip: what ConFuse unifies */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SOURCE_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-2 rounded-[20px] border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
              >
                <tag.icon className="w-3.5 h-3.5 text-primary" />
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* product visual: sources -> ConFuse -> agents */}
        <div className="mt-16 md:mt-20">
          <ProductVisual />
        </div>

        {/* integration logo strip */}
        <ul
          aria-label="Integrations"
          className="mt-12 md:mt-16 grid grid-cols-3 sm:grid-cols-6 gap-4"
        >
          {LOGOS.map((logo) => (
            <li
              key={logo.name}
              className="flex h-14 items-center justify-center gap-2.5 rounded-md border border-border px-3 transition-colors duration-200 hover:border-primary/40"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt="" className="h-full w-full object-contain" loading="lazy" />
              </span>
              <span className="hidden md:inline text-sm font-medium text-muted-foreground">
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
    <div className="relative" aria-hidden="true">
      <div className="frame relative p-4 sm:p-8">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 pb-4 border-b border-border">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="label ml-3">
            Context Layer
          </span>
        </div>

        <div className="relative mx-auto mt-8 grid max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-10">
          <LogoColumn logos={left} />

          {/* core */}
          <div className="relative flex flex-col items-center">
            <span className="absolute h-28 w-28 rounded-full border border-primary/40" />
            <span className="absolute h-40 w-40 rounded-full border border-primary/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/60 bg-brand-deep">
              <span className="font-display text-xs font-bold">ConFuse</span>
            </div>
          </div>

          <LogoColumn logos={right} />
        </div>

        <div className="card-brand mx-auto mt-10 flex max-w-3xl items-center gap-3 rounded-lg border px-4 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/15">
            <Bot className="h-4 w-4 text-primary" />
          </span>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-foreground/25" />
            <div className="h-2 w-1/2 rounded-full bg-foreground/15" />
          </div>
          <span className="h-2 w-2 rounded-full bg-primary" />
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
          className="card-lit flex items-center gap-2.5 rounded-md border border-border p-2 sm:px-3"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" className="h-full w-full object-contain" />
          </span>
          <span className="hidden sm:inline truncate text-xs font-medium text-muted-foreground">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
}
