import { Captions, Crop, Sparkles, Wand2, Palette, Gauge } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const FEATURES = [
  {
    icon: Wand2,
    title: 'Smart clip detection',
    body: 'Our model scans for hooks, punchlines, and high-retention beats — then cuts them into standalone clips automatically.',
  },
  {
    icon: Crop,
    title: 'Every aspect ratio',
    body: 'One render, all formats. 9:16, 1:1, and 16:9 with intelligent reframing that keeps the subject centered.',
  },
  {
    icon: Captions,
    title: 'Captions that convert',
    body: 'Word-perfect, animated subtitles in 12 languages. Styled to your brand, burned in or exported as SRT.',
  },
  {
    icon: Palette,
    title: 'Brand kit baked in',
    body: 'Fonts, colors, logos, and intro stings applied across every clip so your feed always looks like you.',
  },
  {
    icon: Sparkles,
    title: 'AI hooks & titles',
    body: 'Get three scroll-stopping title and hook variants per clip, ranked by predicted watch-through.',
  },
  {
    icon: Gauge,
    title: 'Minutes, not days',
    body: 'A 40-minute episode becomes a week of posts before your coffee gets cold. Batch a whole backlog overnight.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
          The toolkit
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Everything you need to turn raw footage into a content engine.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/5 ring-hairline sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.06}>
            <div className="group h-full bg-coal/60 p-7 transition-colors hover:bg-iron">
              <span className="grid size-11 place-items-center rounded-xl bg-white/5 text-flame ring-hairline transition-colors group-hover:bg-ember/10 group-hover:text-ember">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-smoke">{feature.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
