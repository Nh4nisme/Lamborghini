import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollToTop } from '../../../../components/feedback'
import { SAMPLE_DEALER_APPOINTMENT_DETAIL } from '../../../../features/profile/dealer/appointmentDetail/data'
import { useDealerAppointmentDetail } from '../../../../features/profile/dealer/appointmentDetail/hooks'
import { DealerAppointmentDetailHeader } from '../../../../features/profile/dealer/appointmentDetail/components/DealerAppointmentDetailHeader'
import { DealerAppointmentInfoPanel } from '../../../../features/profile/dealer/appointmentDetail/components/DealerAppointmentInfoPanel'
import { DealerAppointmentNote } from '../../../../features/profile/dealer/appointmentDetail/components/DealerAppointmentNote'
import { DealerAppointmentResponsePanel } from '../../../../features/profile/dealer/appointmentDetail/components/DealerAppointmentResponsePanel'

export default function DealerAppointmentDetailPage() {
    const { id = '' } = useParams()
    const { data, isLoading, isError } = useDealerAppointmentDetail(id)
    const [noteDraft, setNoteDraft] = useState<string | null>(null)

    const detail = import.meta.env.DEV && isError ? SAMPLE_DEALER_APPOINTMENT_DETAIL : data

    return (
        <div data-node-id="2018:5473" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    </div>
                )}

                {!isLoading && !detail && (
                    <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                        Không thể tải chi tiết lịch hẹn. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && detail && (
                    <>
                        <DealerAppointmentDetailHeader detail={detail} />

                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.64fr)_minmax(0,1fr)] md:gap-8">
                            <DealerAppointmentInfoPanel detail={detail} />
                            <DealerAppointmentResponsePanel detail={detail} />
                        </div>

                        <DealerAppointmentNote
                            customerMessage={detail.loiNhanKhachHang}
                            note={noteDraft ?? detail.ghiChuNoiBo}
                            onNoteChange={setNoteDraft}
                        />
                    </>
                )}
            </div>

            <ScrollToTop />
        </div>
    )
}
