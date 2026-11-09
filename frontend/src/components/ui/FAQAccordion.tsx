import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { type ReactNode } from 'react'

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
  defaultOpenIndex?: number | null
}

/**
 * FAQAccordion component - collapsible FAQ section
 * Supports single or multiple open items
 */
export function FAQAccordion({
  items,
  className = '',
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className={`border border-lambo-pressed bg-lambo-tertiary ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={index < items.length - 1 ? 'border-b border-lambo-pressed' : ''}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left focus:outline-none focus:ring-1 focus:ring-lambo-primary"
            >
              <span className="text-[22px] font-semibold leading-7 text-lambo-secondary" style={{ fontFamily: 'Barlow, sans-serif' }}>
                {item.question}
              </span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-lambo-primary" aria-hidden="true" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-lambo-primary" aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <div className="px-8 pb-6 animate-fadeIn">
                <p className="text-base leading-6 text-lambo-secondary/80" style={{ fontFamily: 'Barlow, sans-serif' }}>
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}