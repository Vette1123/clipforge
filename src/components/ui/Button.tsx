import * as React from 'react'
import { cn } from '@/lib/cn'

type Variant = 'molten' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  molten:
    'relative text-void font-semibold bg-gradient-to-b from-flame to-ember shadow-[0_8px_30px_-8px_rgba(255,106,0,0.7)] hover:shadow-[0_10px_40px_-6px_rgba(255,106,0,0.9)] hover:brightness-110',
  outline:
    'text-bone ring-hairline bg-white/[0.02] hover:bg-white/[0.06] hover:ring-flame/40',
  ghost: 'text-smoke hover:text-bone hover:bg-white/[0.05]',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'molten', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-void',
        'disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'
