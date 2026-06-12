'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'

const FAQS = [
  {
    q: 'What does the free plan include?',
    a: 'You can forge up to 3 videos per month with watermarked exports — plenty to feel the magic before you upgrade. No credit card required.',
  },
  {
    q: 'Which platforms do the clips fit?',
    a: 'Every clip is reframed for TikTok and Reels (9:16), feed posts (1:1), and YouTube (16:9). You choose which formats to export per video.',
  },
  {
    q: 'Can I cancel a subscription anytime?',
    a: 'Yes. Manage or cancel from your billing portal in two clicks — handled securely by Lemon Squeezy. You keep access until the end of the period.',
  },
  {
    q: 'What’s the difference between Studio and Lifetime?',
    a: 'Studio is billed monthly or yearly with everything unlocked. Lifetime is a single payment that includes all Studio features plus every future update — no recurring billing, ever.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Every paid plan is covered by a 7-day money-back guarantee. Not impressed? Email us and we’ll refund you, no forms required.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-28">
      <h2 className="text-center font-display text-4xl font-bold tracking-tight md:text-5xl">
        Questions, answered.
      </h2>

      <div className="mt-12 divide-y divide-white/5 overflow-hidden rounded-3xl bg-coal/60 ring-hairline">
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="font-display text-lg font-medium">{faq.q}</span>
                <Plus
                  className={cn(
                    'size-5 shrink-0 text-flame transition-transform duration-300',
                    isOpen && 'rotate-45'
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-smoke">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
