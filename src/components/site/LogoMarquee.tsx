const BRANDS = [
  'PodNation',
  'StreamLab',
  'CreatorHQ',
  'VlogForge',
  'TalkBox',
  'ReelWorks',
  'NorthCast',
  'FrameRate',
]

/** Edge-faded, infinitely scrolling row of "as seen on" brands. */
export function LogoMarquee() {
  return (
    <section className="border-y border-white/5 bg-coal/40 py-8">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
        Powering content teams everywhere
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl font-semibold text-smoke/60 transition-colors hover:text-bone"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
