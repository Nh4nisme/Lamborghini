import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { ScrollToTop } from '../../../../components/feedback'
import { Button } from '../../../../components/ui/Button'
import { APPOINTMENT_TABS, SAMPLE_APPOINTMENTS } from '../../../../features/profile/user/appointment/data'
import { useMyAppointments } from '../../../../features/profile/user/appointment/hooks'
import { AppointmentHeader } from '../../../../features/profile/user/appointment/components/AppointmentHeader'
import { AppointmentListItem } from '../../../../features/profile/user/appointment/components/AppointmentListItem'
import { AppointmentTabs } from '../../../../features/profile/user/appointment/components/AppointmentTabs'
import { NextAppointmentCard } from '../../../../features/profile/user/appointment/components/NextAppointmentCard'
import { adaptAppointment, type Appointment, type AppointmentTab } from '../../../../features/profile/user/appointment/types'

export default function AppointmentPage() {
    const { data, isLoading, isError } = useMyAppointments()
    const [activeTab, setActiveTab] = useState<AppointmentTab>('UPCOMING')

    const appointments = useMemo<Appointment[]>(() => {
        const useSample = import.meta.env.DEV && (isError || !data?.length)
        return (useSample ? SAMPLE_APPOINTMENTS : (data ?? [])).map(adaptAppointment)
    }, [data, isError])

    const counts = useMemo(() => {
        const result: Record<AppointmentTab, number> = { UPCOMING: 0, COMPLETED: 0, CANCELLED: 0 }
        for (const item of appointments) result[item.tab] += 1
        return result
    }, [appointments])

    const visibleAppointments = useMemo(
        () => appointments.filter((item) => item.tab === activeTab),
        [appointments, activeTab]
    )

    const nextAppointment = useMemo(() => {
        if (activeTab !== 'UPCOMING') return undefined
        return [...visibleAppointments].sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]
    }, [activeTab, visibleAppointments])

    const activeTabConfig = APPOINTMENT_TABS.find((tab) => tab.value === activeTab)
    const hasError = isError && appointments.length === 0

    return (
        <div className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AppointmentHeader />

                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <AppointmentTabs activeTab={activeTab} counts={counts} onChange={setActiveTab} />
                    <Button variant="primary" icon={<CalendarDays className="h-4 w-4" />} iconPosition="left">
                        Đặt lịch hẹn
                    </Button>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    </div>
                )}

                {!isLoading && hasError && (
                    <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                        Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && !hasError && visibleAppointments.length === 0 && (
                    <div className="border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                        Chưa có lịch hẹn nào.
                    </div>
                )}

                {!isLoading && !hasError && visibleAppointments.length > 0 && (
                    <>
                        {nextAppointment && <NextAppointmentCard appointment={nextAppointment} />}

                        <h2 className="mb-5 mt-10 font-barlow text-[22px] font-semibold text-lambo-secondary">
                            {activeTabConfig?.heading}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {visibleAppointments.map((item) => (
                                <AppointmentListItem key={item.id} appointment={item} />
                            ))}
                        </div>
                    </>
                )}

                <p className="mt-10 text-sm text-lambo-hover">
                    Cần thay đổi kế hoạch? Vui lòng cập nhật trước lịch hẹn ít nhất 24 giờ.
                </p>
            </div>

            <ScrollToTop />
        </div>
    )
}
