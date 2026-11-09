import { type ReactNode } from 'react'

/**
 * Eyebrow component - small uppercase label used as section/category indicator
 * Used throughout the Lamborghini design system
 */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.08em] text-lambo-primary ${className}`}
      style={{ fontFamily: 'Barlow, sans-serif' }}
    >
      {children}
    </p>
  )
}