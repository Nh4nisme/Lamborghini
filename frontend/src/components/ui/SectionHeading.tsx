import { type ReactNode } from 'react'

/**
 * SectionHeading component - main section heading with Barlow Condensed font
 * Used throughout the Lamborghini design system
 */
export function SectionHeading({
  children,
  className = '',
  as: Component = 'h2',
}: {
  children: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Component
      className={`text-[36px] font-bold uppercase leading-[40px] text-lambo-secondary md:text-[48px] md:leading-[52px] ${className}`}
      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {children}
    </Component>
  )
}