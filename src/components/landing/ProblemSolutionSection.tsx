'use client'

import { Reveal } from "./Reveal";
import { SpotlightGroup } from "./Spotlight";
import { SearchX, BrainCircuit, Users, RefreshCw, Plug, Layers, MessageCircleQuestion } from "lucide-react";

const PROBLEMS = [
  {
    icon: SearchX,
    title: "Knowledge is scattered",
    body: "A bit in the repos. A bit in the docs. The rest buried in chat threads and log streams. Nobody has the whole picture.",
  },
  {
    icon: BrainCircuit,
    title: "AI that guesses",
    body: "Assistants answer without your context — confidently, and often wrong. Trust erodes with every made-up detail.",
  },
  {
    icon: Users,
    title: "Onboarding takes weeks",
    body: "The 'why' behind the code lives in people's heads. New teammates re-ask the same questions in every channel.",
  },
  {
    icon: RefreshCw,
    title: "Answers go stale",
    body: "The moment code changes, every doc and every cached answer drifts out of date. Nobody knows what's still true.",
  },
];

const SOLUTIONS = [
  {
    icon: Plug,
    step: "01",
    title: "Connect",
    body: "Bring your repositories, documentation, conversations, and logs together in minutes — no migration, no busywork.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Unify",
    body: "ConFuse weaves them into one living context layer that understands how your work fits together and keeps itself current.",
  },
  {
    icon: MessageCircleQuestion,
    step: "03",
    title: "Ask",
    body: "Get grounded answers with sources — in your browser, or inside the AI agents your team already uses.",
  },
];

/** Section heading: eyebrow, H2 and lede, centred in the 768px column. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className = "mb-14 md:mb-16",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
      <p className="eyebrow mb-5 text-subtle">{eyebrow}</p>
      <h2 className="mb-5 text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-[2.75rem]">{title}</h2>
      {lede && <p className="text-lg leading-relaxed text-muted-foreground">{lede}</p>}
    </Reveal>
  );
}

export function ProblemSolutionSection() {
  return (
    <>
      {/* ── The problem ── */}
      <section className="relative py-20 md:py-24">
        <div className="container-lg">
          <SectionHeading
            eyebrow="The problem"
            title={<>Your knowledge is everywhere.<br />And that means it&apos;s nowhere.</>}
            lede={<>Teams don&apos;t lack information — they lack a way to hold it all
                at once. The cost shows up as wrong answers, slow ramps, and
                decisions made on stale context.</>}
          />

          <SpotlightGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PROBLEMS.map((problem, index) => (
              <Reveal key={problem.title} delay={index * 90} className="h-full">
                <div className="spotlight card-hover card-lit h-full rounded-xl border border-border p-7">
                  <div className="mb-10 flex items-center justify-between">
                    <problem.icon className="h-5 w-5 text-subtle" aria-hidden="true" />
                    <span className="font-mono text-xs text-dim">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 font-sans text-[17px] font-semibold tracking-[-0.01em]">{problem.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{problem.body}</p>
                </div>
              </Reveal>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* ── The solution ── */}
      <section className="relative border-t border-border py-20 md:py-24">
        <div className="container-lg">
          <SectionHeading
            eyebrow="The solution"
            title={<>One place that actually<br />knows your stack.</>}
            lede={<>ConFuse turns the sprawl into a single, always-current context
                layer — and delivers it wherever questions get asked.</>}
          />

          <Reveal plain className="relative">
            {/* hairline connector, drawn once left to right */}
            <div className="pointer-events-none absolute left-[calc((100%-4rem)/6)] right-[calc((100%-4rem)/6)] top-[22px] hidden h-px md:block" aria-hidden="true">
              <div className="grow-x h-full w-full bg-foreground/15" style={{ ['--d' as string]: "300ms" }} />
            </div>
            <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
              {SOLUTIONS.map((solution, index) => (
                <li key={solution.step}>
                  <Reveal delay={200 + index * 180} className="flex flex-col items-start text-left md:items-center md:text-center">
                    <div className="relative z-10 mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-background text-brand-soft">
                      <solution.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="mb-2 font-mono text-xs text-primary">{solution.step}</span>
                    <h3 className="mb-3 font-sans text-xl font-semibold tracking-[-0.015em]">{solution.title}</h3>
                    <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">{solution.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
    </>
  );
}
