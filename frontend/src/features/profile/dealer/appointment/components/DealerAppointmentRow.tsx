import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../../components/ui/Button'
import { AppointmentStatusBadge } from '../../../user/appointment/components/AppointmentStatusBadge'
import { formatDealerSchedule, type DealerAppointmentDTO } from '../types'

interface DealerAppointmentRowProps {
    appointment: DealerAppointmentDTO
    striped: boolean
}

export function DealerAppointmentRow({ appointment, striped }: DealerAppointmentRowProps) {
    const navigate = useNavigate()
    const isPending = appointment.trangThai === 'CHO_XAC_NHAN'

    return (
        <article
            className={`grid grid-cols-1 items-center gap-4 border border-lambo-pressed p-5 md:grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_140px_auto] md:gap-6 md:px-4 ${striped ? 'bg-lambo-tertiary' : 'bg-lambo-bold-black'}`}
        >
            <div className="font-barlow text-sm text-lambo-primary">{appointment.maYeuCau}</div>

            <div className="min-w-0">
                <h3 className="truncate font-barlow text-sm font-medium tracking-[0.04em] text-lambo-secondary">
                    {appointment.tenKhachHang}
                </h3>
                <p className="mt-1 font-barlow text-xs text-lambo-hover">{appointment.tieuDe}</p>
            </div>

            <div className="font-barlow text-sm text-lambo-secondary">{formatDealerSchedule(appointment)}</div>

            <div>
                <AppointmentStatusBadge status={appointment.trangThai} />
            </div>

            <div className="flex flex-wrap gap-2">
                <Button
                    variant="light"
                    className="h-10 px-4 text-[11px]"
                    onClick={() => navigate(`/profile/dealer/appointment/${appointment.maLichHen}`)}
                >
                    Chi tiết
                </Button>
                {isPending ? (
                    <Button variant="primary" className="h-10 px-4 text-[11px]">
                        Xác nhận
                    </Button>
                ) : (
                    <Button variant="light" className="h-10 px-4 text-[11px]">
                        Đã duyệt
                    </Button>
                )}
                <Button
                    variant="light"
                    className="h-10 px-4 text-[11px]"
                    onClick={() => navigate(`/profile/dealer/appointment/${appointment.maLichHen}/refuse`)}
                >
                    Từ chối
                </Button>
            </div>
        </article>
    )
}
