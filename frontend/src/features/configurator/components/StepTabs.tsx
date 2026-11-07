import { STEPS } from '../constants'

export function StepTabs({ index, onChange }: { index: number; onChange: (i: number) => void }) {
    return (
        <nav className="flex gap-6 text-xs tracking-widest">
            {STEPS.map((s, i) => (
                <button key={s.key} onClick={() => onChange(i)}
                        className={i === index ? 'border-b-2 border-yellow-400 pb-1 text-white' : 'pb-1 text-neutral-400 hover:text-white'}>
                    {s.label.toUpperCase()}
                </button>
            ))}
        </nav>
    )
}