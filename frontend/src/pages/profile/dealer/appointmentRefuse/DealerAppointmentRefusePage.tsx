import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollToTop } from '../../../../components/feedback'

import { useDealerAppointmentDetail } from '../../../../features/profile/dealer/appointmentDetail/hooks'
import { DealerAppointmentRefuseConfirmation } from '../../../../features/profile/dealer/appointmentRefuse/components/DealerAppointmentRefuseConfirmation'
import { DealerAppointmentRefuseForm } from '../../../../features/profile/dealer/appointmentRefuse/components/DealerAppointmentRefuseForm'
import { DealerAppointmentRefuseHeader } from '../../../../features/profile/dealer/appointmentRefuse/components/DealerAppointmentRefuseHeader'

export default function DealerAppointmentRefusePage() {
    const { id = '' } = useParams()
    const { data, isLoading, isError } = useDealerAppointmentDetail(id)
    const [lyDoTuChoi, setLyDoTuChoi] = useState('')

    return (
        <div data-node-id="2024:5445" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                        Không lấy được thông tin lịch hẹn. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && !isError && !data && (
                    <div className="border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                        Không có data
                    </div>
                )}

                {!isLoading && !isError && data && (
                    <>
                        <DealerAppointmentRefuseHeader detail={data} />
                        <DealerAppointmentRefuseForm value={lyDoTuChoi} onChange={setLyDoTuChoi} />
                        <DealerAppointmentRefuseConfirmation detail={data} lyDoTuChoi={lyDoTuChoi} />
                    </>
                )}
            </div>

            <ScrollToTop />
        </div>
    )
}
