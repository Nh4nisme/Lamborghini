import { useMemo, useState } from 'react'
import { ScrollToTop } from '../../../../components/feedback'

import { useDealerAppointments } from '../../../../features/profile/dealer/appointment/hooks'
import { DealerAppointmentHeader } from '../../../../features/profile/dealer/appointment/components/DealerAppointmentHeader'
import { DealerAppointmentPagination } from '../../../../features/profile/dealer/appointment/components/DealerAppointmentPagination'
import { DealerAppointmentRow } from '../../../../features/profile/dealer/appointment/components/DealerAppointmentRow'
import { DealerAppointmentToolbar } from '../../../../features/profile/dealer/appointment/components/DealerAppointmentToolbar'
import { DealerMetricCard } from '../../../../features/profile/dealer/appointment/components/DealerMetricCard'
import type { DealerStatusFilter } from '../../../../features/profile/dealer/appointment/types'

const PAGE_SIZE = 5

function todayISO() {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

export default function DealerAppointmentsPage() {
    const { data, isLoading, isError } = useDealerAppointments()
    const [query, setQuery] = useState('')
    const [status, setStatus] = useState<DealerStatusFilter>('ALL')
    const [page, setPage] = useState(1)

    const appointments = useMemo(() => {
        return data ?? []
    }, [data])

    const metrics = useMemo(() => {
        const today = todayISO()
        const thisMonth = today.slice(0, 7)
        return {
            pending: appointments.filter((item) => item.trangThai === 'CHO_XAC_NHAN').length,
            today: appointments.filter((item) => item.ngayHen === today).length,
            confirmedThisMonth: appointments.filter(
                (item) => item.trangThai === 'DA_XAC_NHAN' && item.ngayHen.startsWith(thisMonth)
            ).length,
        }
    }, [appointments])

    const filtered = useMemo(() => {
        const keyword = query.trim().toLowerCase()
        return appointments.filter((item) => {
            if (status !== 'ALL' && item.trangThai !== status) return false
            if (!keyword) return true
            return (
                item.tenKhachHang.toLowerCase().includes(keyword) ||
                item.maYeuCau.toLowerCase().includes(keyword)
            )
        })
    }, [appointments, query, status])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    return (
        <div data-node-id="2017:5864" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <DealerAppointmentHeader />

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <DealerMetricCard label="Chờ xác nhận" value={metrics.pending} caption="Cần phản hồi" />
                    <DealerMetricCard label="Hôm nay" value={metrics.today} caption={todayISO().split('-').reverse().join('/')} />
                    <DealerMetricCard label="Đã xác nhận" value={metrics.confirmedThisMonth} caption="Trong tháng này" />
                </div>

                <DealerAppointmentToolbar
                    query={query}
                    status={status}
                    onQueryChange={(value) => {
                        setQuery(value)
                        setPage(1)
                    }}
                    onStatusChange={(value) => {
                        setStatus(value)
                        setPage(1)
                    }}
                />

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                        Không lấy được dữ liệu lịch hẹn đại lý. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="hidden grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_140px_auto] gap-6 border border-lambo-pressed bg-lambo-tertiary px-4 py-3 font-barlow text-sm font-medium tracking-[0.04em] text-lambo-hover md:grid">
                            <span>Mã lịch</span>
                            <span>Khách hàng</span>
                            <span>Thời gian</span>
                            <span>Trạng thái</span>
                            <span>Thao tác</span>
                        </div>

                        {pageItems.length === 0 ? (
                            <div className="mt-4 border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                                Không có data
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {pageItems.map((item, index) => (
                                    <DealerAppointmentRow key={item.maLichHen} appointment={item} striped={index % 2 === 1} />
                                ))}
                            </div>
                        )}

                        <DealerAppointmentPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={PAGE_SIZE}
                            total={filtered.length}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>

            <ScrollToTop />
        </div>
    )
}
