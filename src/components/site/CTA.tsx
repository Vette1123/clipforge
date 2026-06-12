import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-iron to-coal px-8 py-16 text-center ring-hairline md:py-24">
        <div className="forge-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[420px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight md:text-6xl">
            Your next viral clip is already <span className="text-molten">in your archive</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-smoke">
            Stop letting great moments rot in long videos. Forge them into a feed that grows while you sleep.
          </p>
          <a
            href="#pricing"
            className="group mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-flame to-ember px-9 font-semibold text-void shadow-[0_8px_30px_-8px_rgba(255,106,0,0.7)] transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Start forging free
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
