import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'

export function DealerAppointmentHeader() {
    return (
        <header className="pt-10 pb-8">
            <Eyebrow className="mb-2">Dealer / Private Area</Eyebrow>
            <SectionHeading as="h1">Lịch hẹn phụ trách</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Theo dõi yêu cầu, xác nhận lịch hẹn và kết nối với khách hàng.
            </p>
        </header>
    )
}
