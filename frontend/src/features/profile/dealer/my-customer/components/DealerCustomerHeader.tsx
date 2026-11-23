import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { SectionHeading } from '../../../../../components/ui/SectionHeading'

export function DealerCustomerHeader() {
    return (
        <header className="pt-10 pb-8">
            <Eyebrow className="mb-2">Dealer / Private Area</Eyebrow>
            <SectionHeading as="h1">Khách hàng của tôi</SectionHeading>
            <p className="mt-3 text-base leading-6 text-lambo-hover">
                Lamborghini · Không gian quản lý dành riêng cho DEALER.
            </p>
        </header>
    )
}
