'use client'

import { motion } from 'motion/react'
import { Film, Scissors, Sparkles } from 'lucide-react'

/** The clips a master video gets "forged" into. */
const CLIPS = [
  { label: 'TikTok', ratio: '9:16', tint: 'from-ember/30 to-ember/5', dur: '0:24' },
  { label: 'Reels', ratio: '9:16', tint: 'from-spark/25 to-spark/5', dur: '0:31' },
  { label: 'Shorts', ratio: '9:16', tint: 'from-gold/30 to-gold/5', dur: '0:18' },
  { label: 'X', ratio: '1:1', tint: 'from-flame/25 to-flame/5', dur: '0:42' },
]

/**
 * The product's value proposition, in motion: a single master timeline is
 * "forged" into a fan of platform-ready clips. Loops gently and forever.
 */
export function ForgeAnimation() {
  return (
    <div className="relative mx-auto w-full max-w-md select-none">
      {/* Master source clip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="ring-hairline relative overflow-hidden rounded-2xl bg-coal/80 p-4 backdrop-blur"
      >
        <div className="flex items-center justify-between text-xs text-smoke">
          <span className="inline-flex items-center gap-1.5 font-mono">
            <Film className="size-3.5 text-flame" /> MASTER.mp4
          </span>
          <span className="font-mono">38:12</span>
        </div>
        {/* Waveform-ish timeline */}
        <div className="mt-3 flex h-10 items-end gap-[3px]">
          {Array.from({ length: 38 }).map((_, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-full bg-gradient-to-t from-ember/40 to-flame"
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: [0.2, 0.4 + ((i * 7) % 10) / 12, 0.2] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: (i % 12) * 0.08,
                ease: 'easeInOut',
              }}
              style={{ originY: 1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Forge node — the "split" moment */}
      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-flame/50 to-transparent" />
        <motion.div
          className="relative z-10 inline-flex items-center gap-2 rounded-full bg-coal px-4 py-2 ring-hairline"
          animate={{ boxShadow: ['0 0 0 0 rgba(255,106,0,0)', '0 0 28px 2px rgba(255,106,0,0.35)', '0 0 0 0 rgba(255,106,0,0)'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Scissors className="size-4 text-ember" />
          <span className="font-mono text-xs tracking-wide text-bone">FORGING</span>
          <Sparkles className="size-4 animate-[spark_2.4s_ease-in-out_infinite] text-spark" />
        </motion.div>
      </div>

      {/* Forged clips fan out */}
      <div className="grid grid-cols-4 gap-2.5">
        {CLIPS.map((clip, i) => (
          <motion.div
            key={clip.label}
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.4 + i * 0.12,
              repeat: Infinity,
              repeatDelay: 3.2,
              repeatType: 'reverse',
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`ring-hairline flex aspect-[9/16] flex-col justify-between rounded-lg bg-gradient-to-b ${clip.tint} p-2`}
          >
            <span className="font-mono text-[9px] text-smoke">{clip.ratio}</span>
            <div>
              <span className="block text-[11px] font-semibold leading-none text-bone">
                {clip.label}
              </span>
              <span className="font-mono text-[9px] text-faint">{clip.dur}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
