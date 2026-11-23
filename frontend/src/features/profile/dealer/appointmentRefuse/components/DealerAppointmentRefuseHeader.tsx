import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'
import { formatDetailSchedule, type DealerAppointmentDetailDTO } from '../../appointmentDetail/types'

interface DealerAppointmentRefuseHeaderProps {
    detail: DealerAppointmentDetailDTO
}

export function DealerAppointmentRefuseHeader({ detail }: DealerAppointmentRefuseHeaderProps) {
    return (
        <header className="pt-10 pb-8">
            <Eyebrow className="mb-2">Dealer / Private Area</Eyebrow>
            <SectionHeading as="h1">Từ chối lịch hẹn</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Lamborghini · Không gian quản lý dành riêng cho DEALER.
            </p>

            <p className="mt-6 font-barlow text-[22px] font-semibold leading-7 text-lambo-secondary">
                {detail.maYeuCau} / {detail.tenKhachHang} / {formatDetailSchedule(detail)}
            </p>
        </header>
    )
}
