import { Button } from '../../../../../components/ui/Button'
import type { Appointment } from '../types'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'

interface AppointmentListItemProps {
    appointment: Appointment
    onViewDetail?: (appointment: Appointment) => void
}

export function AppointmentListItem({ appointment, onViewDetail }: AppointmentListItemProps) {
    return (
        <article className="flex flex-wrap items-center gap-x-8 gap-y-4 border border-lambo-pressed bg-lambo-tertiary p-6">
            <div className="w-24 shrink-0 font-barlow text-sm font-medium tracking-[0.04em] text-lambo-primary">
                {appointment.code}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="font-barlow text-lg font-semibold text-lambo-secondary">{appointment.title}</h3>
                <p className="mt-1 text-sm text-lambo-hover">
                    {appointment.dateLabel} · {appointment.timeLabel}
                </p>
            </div>

            <AppointmentStatusBadge status={appointment.status} />
            <Button type="button" variant="light" onClick={() => onViewDetail?.(appointment)}>
                Xem chi tiết
            </Button>
        </article>
    )
}
