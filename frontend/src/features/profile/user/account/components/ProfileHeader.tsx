import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'

export function ProfileHeader() {
    return (
        <header data-node-id="226:5784" className="pt-10 pb-8">
            <Eyebrow className="mb-2">Customer / Private Area</Eyebrow>
            <SectionHeading as="h1">Thông tin cá nhân</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Lamborghini · Không gian quản lý dành riêng cho CUSTOMER.
            </p>
        </header>
    )
}
