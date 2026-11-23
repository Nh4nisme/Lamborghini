import { PROFILE_TABS } from '../data'
import type { ProfileTab } from '../types'

interface ProfileTabsProps {
    activeTab: ProfileTab
    onChange: (tab: ProfileTab) => void
}

export function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
    return (
        <div data-node-id="226:5789" role="tablist" className="flex w-full border-b border-white/10">
            {PROFILE_TABS.map(({ value, label }) => {
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
