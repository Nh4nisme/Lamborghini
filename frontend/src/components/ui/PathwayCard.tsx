import { Link } from 'react-router-dom'
import { ArrowUpRight, Leaf } from 'lucide-react'
import { type ReactNode } from 'react'

const outlineButtonClass =
  'inline-flex h-10 items-center gap-3 self-start border border-lambo-primary bg-black px-5 text-sm font-semibold uppercase tracking-[0.04em] text-lambo-secondary transition-colors hover:bg-lambo-primary hover:text-black'

interface PathwayCardProps {
  title: string
  description: string
  action: string
  to?: string
  href?: string
  icon?: ReactNode
}

/**
 * PathwayCard component - reusable card for contact pathways, culture resources, etc.
 * Features a leaf icon by default, action button with arrow
 */
export function PathwayCard({
  title,
  description,
  action,
  to,
  href,
  icon,
}: PathwayCardProps) {
  const actionContent = (
    <>
      {action}
      <ArrowUpRight className="h-4 w-4" />
    </>
  )

  return (
    <article className="flex flex-col border border-lambo-pressed bg-lambo-tertiary p-8">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lambo-pressed">
        {icon || <Leaf className="h-4 w-4 text-lambo-primary" />}
      </span>
      <h3 className="mt-6 text-[36px] font-semibold uppercase leading-[40px] text-lambo-secondary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {title}
      </h3>
      <p className="mt-4 text-base leading-6 text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
        {description}
      </p>
      <div className="mt-auto pt-8">
        <div className="mb-6 border-t border-lambo-pressed" />
        {to ? (
          <Link to={to} className={outlineButtonClass} style={{ fontFamily: 'Barlow, sans-serif' }}>
            {actionContent}
          </Link>
        ) : href ? (
          <a href={href} className={outlineButtonClass} style={{ fontFamily: 'Barlow, sans-serif' }}>
            {actionContent}
          </a>
        ) : (
          <button type="button" className={outlineButtonClass} style={{ fontFamily: 'Barlow, sans-serif' }}>
            {actionContent}
          </button>
        )}
      </div>
    </article>
  )
}