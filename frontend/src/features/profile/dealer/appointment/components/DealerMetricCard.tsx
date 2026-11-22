import { Eyebrow } from '../../../../../components/ui/Eyebrow'

interface DealerMetricCardProps {
    label: string
    value: number
    caption: string
}

export function DealerMetricCard({ label, value, caption }: DealerMetricCardProps) {
    return (
        <div className="flex h-28 flex-col justify-between border border-lambo-pressed bg-lambo-tertiary p-5">
            <Eyebrow>{label}</Eyebrow>
            <div className="flex items-end justify-between">
                <span className="font-barlow-condensed text-4xl font-semibold text-lambo-secondary">
                    {String(value).padStart(2, '0')}
                </span>
                <span className="text-sm text-lambo-hover">{caption}</span>
            </div>
        </div>
    )
}
