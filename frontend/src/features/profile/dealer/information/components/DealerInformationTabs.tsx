import { DEALER_INFORMATION_TABS } from '../data'
import type { DealerInformationTab } from '../types'

interface DealerInformationTabsProps {
    activeTab: DealerInformationTab
    onChange: (tab: DealerInformationTab) => void
}

export function DealerInformationTabs({ activeTab, onChange }: DealerInformationTabsProps) {
    return (
        <div data-node-id="226:6023" role="tablist" className="flex w-full border-b border-white/10">
            {DEALER_INFORMATION_TABS.map(({ value, label }) => {
                const isActive = value === activeTab

                return (
                    <button
                        key={value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(value)}
                        className={`-mb-px flex-1 cursor-pointer border-b-2 pb-3 text-center font-barlow text-sm font-bold uppercase leading-snug tracking-[0.12em] transition-colors ${
                            isActive
                                ? 'border-lambo-primary text-lambo-secondary'
                                : 'border-transparent text-neutral-500 hover:text-lambo-secondary'
                        }`}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}
