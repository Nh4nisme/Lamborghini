import { Check, X } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import type { DealerAppointmentDetailDTO } from '../types'

interface DealerAppointmentResponsePanelProps {
    detail: DealerAppointmentDetailDTO
}

export function DealerAppointmentResponsePanel({ detail }: DealerAppointmentResponsePanelProps) {
    return (
        <section className="flex flex-col border border-lambo-pressed bg-lambo-tertiary p-6">
            <h2 className="font-barlow-condensed text-[28px] font-semibold uppercase leading-8 text-lambo-secondary">
                Phản hồi yêu cầu
            </h2>
            <p className="mt-4 font-barlow text-base leading-6 text-lambo-hover">
                Kiểm tra lịch của showroom trước khi xác nhận. Khách hàng sẽ được thông báo qua email.
            </p>

            <div className="mt-auto flex flex-col gap-4 pt-10">
                <Button variant="primary" className="w-full justify-center" icon={<Check className="h-4 w-4" />} iconPosition="left">
                    Xác nhận lịch hẹn
                </Button>
                <Button variant="light" className="w-full justify-center" icon={<X className="h-4 w-4" />} iconPosition="left">
                    Từ chối lịch hẹn
                </Button>
            </div>

            <p className="mt-6 font-barlow text-sm leading-5 text-lambo-secondary">
                Dealer phụ trách
                <br />
                {detail.tenDealer} · {detail.maDealer}
            </p>
        </section>
    )
}
