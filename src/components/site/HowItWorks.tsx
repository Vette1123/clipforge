import { Upload, Cpu, Send } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Drop your video',
    body: 'Upload a file or paste a YouTube, podcast, or webinar link. ClipForge ingests up to 4 hours per render.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Let it forge',
    body: 'The engine transcribes, finds the best moments, reframes, and captions — all while you grab a coffee.',
  },
  {
    icon: Send,
    step: '03',
    title: 'Publish everywhere',
    body: 'Review your clips, tweak captions, and schedule straight to TikTok, Reels, Shorts, and X.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden py-28">
      <div className="forge-glow pointer-events-none absolute -left-20 top-1/2 -z-10 size-96 opacity-40" />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">The process</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
            Three steps from one long video to a week of posts.
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting line on desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.12} className="relative">
              <div className="flex items-center gap-4">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl bg-coal ring-hairline">
                  <step.icon className="size-6 text-flame" />
                </span>
                <span className="font-display text-5xl font-bold text-white/10">{step.step}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-smoke">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
