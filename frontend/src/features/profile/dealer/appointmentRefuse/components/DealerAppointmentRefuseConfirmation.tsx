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
    const goBackToDetail = () => navigate(`/profile/dealer/appointment/${detail.maLichHen}`)

    const handleReject = async () => {
        if (!lyDoTuChoi.trim()) return
        
        setIsSubmitting(true)
        try {
            await dealerDetailApi.rejectAppointment(detail.maLichHen, lyDoTuChoi)
            navigate('/profile/dealer/appointment')
        } catch (error) {
            console.error('Failed to reject appointment:', error)
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
                <Button variant="primary" className="w-full justify-center" onClick={handleReject} disabled={isSubmitting}>
                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận từ chối'}
                </Button>
                <Button variant="light" className="w-full justify-center" onClick={goBackToDetail} disabled={isSubmitting}>
                    Giữ lịch hẹn
                </Button>
            </div>
        </section>
    )
}
