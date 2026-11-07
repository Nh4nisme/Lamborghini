import type { FC } from 'react'
import { STEPS } from '../constants'

interface StepTabsProps {
    currentIndex: number
    onSelectStep: (index: number) => void
}

export const StepTabs: FC<StepTabsProps> = ({ currentIndex, onSelectStep }) => {
    return (
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.18em]">
            {STEPS.map((step, index) => {
                const isActive = currentIndex === index
                return (
                    <button
                        key={step.key}
                        type="button"
                        onClick={() => onSelectStep(index)}
                        className={`relative py-1 uppercase transition-colors cursor-pointer ${
                            isActive
                                ? 'text-neutral-900 font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#eab308]'
                                : 'text-neutral-400 hover:text-neutral-700'
                        }`}
                    >
                        {step.label}
                    </button>
                )
            })}
        </nav>
    )
}
