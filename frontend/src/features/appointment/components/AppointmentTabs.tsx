import { APPOINTMENT_TABS } from '../data'
import type { AppointmentTab } from '../types'

interface AppointmentTabsProps {
    activeTab: AppointmentTab
    counts: Record<AppointmentTab, number>
    onChange: (tab: AppointmentTab) => void
}

export function AppointmentTabs({ activeTab, counts, onChange }: AppointmentTabsProps) {
    return (
        <div data-node-id="226:5756" role="tablist" className="flex w-full border-b border-white/10 md:max-w-[720px]">
            {APPOINTMENT_TABS.map(({ value, label }) => {
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
                        {label} ({counts[value]})
                    </button>
                )
            })}
        </div>
    )
}
