import { useState } from 'react'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import type { Appointment } from '../types'
import { AppointmentStatusBadge } from './AppointmentStatusBadge'
import { useCancelAppointment } from '../hooks'

interface NextAppointmentCardProps {
    appointment: Appointment
}

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
    const [showConfirm, setShowConfirm] = useState(false)
    const cancelMutation = useCancelAppointment()

    const handleCancel = () => {
        cancelMutation.mutate(appointment.id, {
            onSuccess: () => {
                setShowConfirm(false)
            },
        })
    }

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
                    {!showConfirm ? (
                        <Button type="button" variant="light" onClick={() => setShowConfirm(true)}>
                            Hủy lịch
                        </Button>
                    ) : (
                        <>
                            <Button type="button" variant="primary" onClick={handleCancel} disabled={cancelMutation.isPending}>
                                {cancelMutation.isPending ? 'Đang hủy...' : 'Xác nhận hủy'}
                            </Button>
                            <Button
                                type="button"
                                variant="light"
                                onClick={() => setShowConfirm(false)}
                                disabled={cancelMutation.isPending}
                            >
                                Giữ lịch
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {cancelMutation.isError && (
                <p className="mt-4 text-sm text-red-400">Không thể hủy lịch hẹn. Vui lòng thử lại sau.</p>
            )}
            {cancelMutation.isSuccess && <p className="mt-4 text-sm text-lambo-hover">Đã hủy lịch hẹn.</p>}
        </section>
    )
}
