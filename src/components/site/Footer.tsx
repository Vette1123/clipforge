import { Flame } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-coal/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-12 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-b from-flame to-ember">
            <Flame className="size-3.5 text-void" />
          </span>
          <span className="font-display text-base font-bold">{siteConfig.name}</span>
          <span className="ml-2 text-sm text-faint">{siteConfig.tagline}</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-smoke">
          <a href="#features" className="hover:text-bone">Features</a>
          <a href="#pricing" className="hover:text-bone">Pricing</a>
          <a href="#faq" className="hover:text-bone">FAQ</a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-bone">Contact</a>
        </nav>
      </div>
      <div className="border-t border-white/5 py-5">
        <p className="text-center font-mono text-xs text-faint">
          © {/* year set at build */}2026 {siteConfig.name}. A Lemon Squeezy integration demo.
        </p>
      </div>
    </footer>
  )
}
