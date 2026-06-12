import { Flame } from 'lucide-react'
import { siteConfig } from '@/config/site'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-void/60 px-4 py-2.5 backdrop-blur-xl md:px-6">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-b from-flame to-ember shadow-[0_4px_16px_-4px_rgba(255,106,0,0.8)]">
            <Flame className="size-4 text-void" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-smoke transition-colors hover:bg-white/5 hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#pricing"
          className="rounded-full bg-bone px-4 py-2 text-sm font-semibold text-void transition-transform hover:scale-[1.03] active:scale-95"
        >
          Start forging
        </a>
      </div>
    </header>
  )
}
