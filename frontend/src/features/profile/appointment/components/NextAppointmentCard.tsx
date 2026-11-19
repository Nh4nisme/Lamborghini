import { Button } from '../../../../components/ui/Button'
import { Eyebrow } from '../../../../components/ui/Eyebrow'
import type { Appointment } from '../types'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'

interface NextAppointmentCardProps {
    appointment: Appointment
}

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
    return (
        <section data-node-id="226:5757" className="border border-lambo-pressed bg-lambo-tertiary p-6">
            <div className="flex items-start justify-between gap-4">
                <Eyebrow>Lịch hẹn tiếp theo</Eyebrow>
                <AppointmentStatusBadge status={appointment.status} />
            </div>

            <div className="mt-6 font-barlow text-5xl font-bold uppercase leading-[52px] text-lambo-secondary">
                {appointment.dayLabel}
            </div>
            <p className="mt-3 text-lg font-semibold text-lambo-secondary">
                {appointment.timeLabel} · {appointment.title}
            </p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <p className="text-base text-lambo-hover">{appointment.venue}</p>
                <div className="flex flex-wrap gap-3">
                    <Button variant="light">Đổi lịch</Button>
                    <Button variant="light">Hủy lịch</Button>
                </div>
            </div>
        </section>
    )
}
