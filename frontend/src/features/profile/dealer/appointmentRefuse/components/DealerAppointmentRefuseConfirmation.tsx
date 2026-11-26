import { Info, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../../components/ui/Button'
import { Eyebrow } from '../../../../../components/ui/Eyebrow'
import { dealerDetailApi } from '../../appointmentDetail/api'
import type { DealerAppointmentDetailDTO } from '../../appointmentDetail/types'

interface DealerAppointmentRefuseConfirmationProps {
    detail: DealerAppointmentDetailDTO
    lyDoTuChoi: string
}

export function DealerAppointmentRefuseConfirmation({ detail, lyDoTuChoi }: DealerAppointmentRefuseConfirmationProps) {
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const goBackToDetail = () => navigate(`/profile/dealer/appointment/${detail.maLichHen}`)

    const handleReject = async () => {
        if (!lyDoTuChoi.trim()) {
            setError('Vui lòng nhập lý do từ chối')
            return
        }
        
        setIsSubmitting(true)
        setError(null)
        setSuccess(false)
        try {
            await dealerDetailApi.rejectAppointment(detail.maLichHen, lyDoTuChoi)
            setSuccess(true)
            setTimeout(() => navigate('/profile/dealer/appointment'), 1500)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể từ chối lịch hẹn. Vui lòng thử lại.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="mx-auto mt-10 flex w-full max-w-[472px] flex-col border border-lambo-primary bg-lambo-tertiary p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <Eyebrow>Xác nhận</Eyebrow>
                    <Eyebrow className="mt-1">Phản hồi lịch hẹn</Eyebrow>
                </div>
                <button
                    type="button"
                    aria-label="Đóng"
                    onClick={goBackToDetail}
                    className="flex h-8 w-8 items-center justify-center border border-lambo-primary text-lambo-primary"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-4 flex gap-3">
                <Info className="mt-1 h-5 w-5 shrink-0 text-lambo-primary" aria-hidden="true" />
                <div>
                    <h2 className="font-barlow text-[22px] font-semibold leading-7 text-lambo-secondary">
                        Xác nhận từ chối lịch hẹn?
                    </h2>
                    <p className="mt-2 font-barlow text-base leading-6 text-lambo-hover">
                        {detail.maYeuCau} bị từ chối. Khách hàng nhận email kèm lý do và lịch đề xuất.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-lambo-primary pt-6">
                {error && (
                    <div className="border border-red-800 bg-red-950/40 p-3 text-sm text-red-300">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-300">
                        Từ chối lịch hẹn thành công
                    </div>
                )}
                <Button variant="primary" className="w-full justify-center" onClick={handleReject} disabled={isSubmitting || success || !lyDoTuChoi.trim()}>
                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                </Button>
                <Button variant="light" className="w-full justify-center" onClick={goBackToDetail} disabled={isSubmitting}>
                    Giữ lịch hẹn
                </Button>
            </div>
        </section>
    )
}
