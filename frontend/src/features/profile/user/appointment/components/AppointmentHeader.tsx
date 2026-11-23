import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'

export function AppointmentHeader() {
    return (
        <header data-node-id="226:5750" className="pt-10 pb-8">
            <Eyebrow className="mb-2">Customer / Private Area</Eyebrow>
            <SectionHeading as="h1">Lịch hẹn của tôi</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Quản lý những cuộc hẹn và hành trình tiếp theo của bạn.
            </p>
        </header>
    )
}
