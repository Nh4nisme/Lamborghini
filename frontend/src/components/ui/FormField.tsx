import { type ReactNode } from 'react'

const controlClass =
  'w-full border border-lambo-primary bg-lambo-tertiary px-4 py-3 text-base text-lambo-secondary placeholder:text-lambo-secondary/60 focus:outline-none focus:ring-1 focus:ring-lambo-hover'

interface FieldProps {
  id: string
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
  error?: string
}

/**
 * Field component - wrapper for form fields with label, hint, and error
 * Provides consistent styling across all forms
 */
export function Field({
  id,
  label,
  required,
  hint,
  children,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium tracking-[0.01em] text-lambo-primary" style={{ fontFamily: 'Barlow, sans-serif' }}>
        {label}
        {required && <span className="text-lambo-primary"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-red-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="mt-2 text-xs text-lambo-primary/70" style={{ fontFamily: 'Barlow, sans-serif' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

/**
 * Input component - styled input with consistent design
 */
export function Input({
  id,
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return (
    <input
      id={id}
      className={`${controlClass} ${className}`}
      {...props}
    />
  )
}

/**
 * Textarea component - styled textarea with consistent design
 */
export function Textarea({
  id,
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { id: string }) {
  return (
    <textarea
      id={id}
      className={`${controlClass} ${className}`}
      {...props}
    />
  )
}

/**
 * Select component - styled select with consistent design
 */
export function Select({
  id,
  className = '',
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { id: string; children: ReactNode }) {
  return (
    <div className="relative">
      <select
        id={id}
        className={`${controlClass} appearance-none pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}