import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'

const primaryButtonClass =
  'inline-flex h-12 items-center gap-3 bg-lambo-primary px-8 text-sm font-semibold uppercase tracking-[0.04em] text-black transition-colors hover:bg-lambo-hover focus:outline-none focus:ring-1 focus:ring-lambo-hover'

const outlineButtonClass =
  'inline-flex h-10 items-center gap-3 self-start border border-lambo-primary bg-black px-5 text-sm font-semibold uppercase tracking-[0.04em] text-lambo-secondary transition-colors hover:bg-lambo-primary hover:text-black focus:outline-none focus:ring-1 focus:ring-lambo-primary'

const secondaryButtonClass =
  'inline-flex h-10 items-center gap-3 border border-lambo-primary bg-transparent px-5 text-sm font-semibold uppercase tracking-[0.04em] text-lambo-primary transition-colors hover:bg-lambo-primary hover:text-black focus:outline-none focus:ring-1 focus:ring-lambo-primary'

interface BaseButtonProps {
  children: ReactNode
  className?: string
  disabled?: boolean
  'aria-label'?: string
}

type ButtonAs = 'button' | 'a' | 'link'

interface ButtonProps extends BaseButtonProps {
  as?: ButtonAs
  to?: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline' | 'secondary'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

/**
 * Button component - unified button with multiple variants
 * Supports rendering as button, anchor, or Link (react-router)
 */
export function Button({
  children,
  className = '',
  disabled = false,
  as = 'button',
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  icon,
  iconPosition = 'right',
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const baseClass = variant === 'outline' ? outlineButtonClass : variant === 'secondary' ? secondaryButtonClass : primaryButtonClass
  const combinedClass = `${baseClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  const iconElement = icon ? (
    <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
  ) : null

  const content = (
    <>
      {iconPosition === 'left' && iconElement}
      <span>{children}</span>
      {iconPosition === 'right' && iconElement}
    </>
  )

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>)
  }

  if (as === 'link' && to) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        className={combinedClass}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={combinedClass}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={combinedClass}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {content}
    </button>
  )
}

/**
 * PrimaryButton - convenience component for primary variant
 */
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />
}

/**
 * OutlineButton - convenience component for outline variant
 */
export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />
}

/**
 * SecondaryButton - convenience component for secondary variant
 */
export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />
}