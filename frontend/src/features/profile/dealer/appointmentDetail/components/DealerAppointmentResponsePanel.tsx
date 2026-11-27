import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../../components/ui/Button'
import { dealerDetailApi } from '../api'
import type { DealerAppointmentDetailDTO } from '../types'

interface DealerAppointmentResponsePanelProps {
    detail: DealerAppointmentDetailDTO
}

export function DealerAppointmentResponsePanel({ detail }: DealerAppointmentResponsePanelProps) {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleConfirm = async () => {
        setIsSubmitting(true)
        setError(null)
        setSuccess(false)
        try {
            await dealerDetailApi.confirmAppointment(detail.maLichHen)
            setSuccess(true)
            setTimeout(() => navigate('/profile/dealer/appointment'), 1500)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể xác nhận lịch hẹn. Vui lòng thử lại.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="flex flex-col border border-lambo-pressed bg-lambo-tertiary p-6">
            <h2 className="font-barlow-condensed text-[28px] font-semibold uppercase leading-8 text-lambo-secondary">
                Phản hồi yêu cầu
            </h2>
            <p className="mt-4 font-barlow text-base leading-6 text-lambo-hover">
                Kiểm tra lịch của showroom trước khi xác nhận. Khách hàng sẽ được thông báo qua email.
            </p>

            <div className="mt-auto flex flex-col gap-4 pt-10">
                {error && (
                    <div className="border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-300">
                        Xác nhận lịch hẹn thành công
                    </div>
                )}
                <Button
                    variant="primary"
                    className="w-full justify-center"
                    icon={<Check className="h-4 w-4" />}
                    iconPosition="left"
                    onClick={handleConfirm}
                    disabled={isSubmitting || success}
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận lịch hẹn'}
                </Button>
                <Button
                    variant="light"
                    className="w-full justify-center"
                    icon={<X className="h-4 w-4" />}
                    iconPosition="left"
                    onClick={() => navigate(`/profile/dealer/appointment/${detail.maLichHen}/refuse`)}
                    disabled={isSubmitting || success}
                >
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
