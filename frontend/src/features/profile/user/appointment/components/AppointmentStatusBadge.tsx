import { CircleCheck, CircleX, TriangleAlert, type LucideIcon } from 'lucide-react'
import type { AppointmentStatus } from '../types'

const STATUS_STYLES: Record<string, { label: string; className: string; Icon: LucideIcon }> = {
    DA_XAC_NHAN: { label: 'Đã xác nhận', className: 'border-lambo-hover text-lambo-hover', Icon: CircleCheck },
    CHO_XAC_NHAN: { label: 'Chờ xác nhận', className: 'border-lambo-primary text-lambo-primary', Icon: TriangleAlert },
    HOAN_TAT: { label: 'Đã hoàn tất', className: 'border-lambo-secondary text-lambo-secondary', Icon: CircleCheck },
    HOAN_THANH: { label: 'Đã hoàn tất', className: 'border-lambo-secondary text-lambo-secondary', Icon: CircleCheck },
    DA_HUY: { label: 'Đã hủy', className: 'border-neutral-500 text-neutral-400', Icon: CircleX },
    HUY: { label: 'Đã hủy', className: 'border-neutral-500 text-neutral-400', Icon: CircleX },
    TU_CHOI: { label: 'Từ chối', className: 'border-red-500 text-red-400', Icon: CircleX },
}

interface AppointmentStatusBadgeProps {
    status: AppointmentStatus | string
}

export function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
    const { label, className, Icon } = STATUS_STYLES[status] ?? {
        label: status || 'Không xác định',
        className: 'border-neutral-500 text-neutral-400',
        Icon: TriangleAlert,
    }

    return (
        <span
            className={`inline-flex h-6 shrink-0 items-center gap-2 border bg-lambo-tertiary px-2.5 font-barlow text-xs font-semibold tracking-[0.08em] ${className}`}
        >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
        </span>
    )
}
