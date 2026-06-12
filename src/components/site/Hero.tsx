import { ArrowRight, Star } from 'lucide-react'
import { ForgeAnimation } from './ForgeAnimation'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      {/* Atmosphere */}
      <div className="grid-floor pointer-events-none absolute inset-0 -z-10" />
      <div className="forge-glow pointer-events-none absolute left-1/2 top-24 -z-10 size-[520px] -translate-x-1/2 animate-drift opacity-70" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <div className="ring-hairline inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3.5 py-1.5 text-xs text-smoke">
            <Star className="size-3.5 fill-gold text-gold" />
            Trusted by 12,000+ creators forging daily
          </div>

          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">
            Forge one video into{' '}
            <span className="text-molten">a hundred clips</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-smoke">
            Drop in a long-form video. ClipForge finds the moments worth sharing,
            cuts them to every aspect ratio, burns in captions, and hands you
            scroll-stopping shorts for TikTok, Reels, Shorts &amp; X — in minutes.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#pricing"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-flame to-ember px-8 font-semibold text-void shadow-[0_8px_30px_-8px_rgba(255,106,0,0.7)] transition-all hover:shadow-[0_10px_40px_-6px_rgba(255,106,0,0.9)] hover:brightness-110 active:scale-[0.98]"
            >
              Start forging free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex h-14 items-center justify-center rounded-full px-6 text-bone ring-hairline bg-white/[0.02] transition-colors hover:bg-white/[0.06]"
            >
              See how it works
            </a>
          </div>

          <p className="mt-5 font-mono text-xs text-faint">
            No credit card to start · Cancel anytime · 7-day money-back guarantee
          </p>
        </div>

        <div className="animate-rise [animation-delay:120ms]">
          <ForgeAnimation />
        </div>
      </div>
    </section>
  )
}
