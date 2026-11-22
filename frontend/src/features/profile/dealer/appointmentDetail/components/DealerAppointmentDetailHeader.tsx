import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'
import { AppointmentStatusBadge } from '../../../user/appointment/components/AppointmentStatusBadge'
import { formatReceivedDate, type DealerAppointmentDetailDTO } from '../types'

interface DealerAppointmentDetailHeaderProps {
    detail: DealerAppointmentDetailDTO
}

export function DealerAppointmentDetailHeader({ detail }: DealerAppointmentDetailHeaderProps) {
    return (
        <header className="pt-10 pb-8">
            <Eyebrow className="mb-2">Dealer / Private Area</Eyebrow>
            <SectionHeading as="h1">Chi tiết lịch hẹn</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Lamborghini · Không gian quản lý dành riêng cho DEALER.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <AppointmentStatusBadge status={detail.trangThai} />
                <span className="font-barlow text-xs font-semibold uppercase tracking-[0.08em] text-lambo-primary">
                    {detail.maYeuCau} / Tiếp nhận {formatReceivedDate(detail)}
                </span>
            </div>
        </header>
    )
}
