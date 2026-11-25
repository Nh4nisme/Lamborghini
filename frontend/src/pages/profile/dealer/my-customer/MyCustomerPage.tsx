import { useMemo, useState } from 'react'
import { ScrollToTop } from '../../../../components/feedback'
import { Eyebrow } from '../../../../components/ui/Eyebrow'
import { DealerAppointmentPagination } from '../../../../features/profile/dealer/appointment/components/DealerAppointmentPagination'
import { useDealerCustomers } from '../../../../features/profile/dealer/my-customer/hooks'
import { DealerCustomerHeader } from '../../../../features/profile/dealer/my-customer/components/DealerCustomerHeader'
import { DealerCustomerRow } from '../../../../features/profile/dealer/my-customer/components/DealerCustomerRow'
import { DealerCustomerToolbar } from '../../../../features/profile/dealer/my-customer/components/DealerCustomerToolbar'
import { CustomerDetailModal } from '../../../../features/profile/dealer/my-customer/components/CustomerDetailModal'
import type { DealerCustomerDTO } from '../../../../features/profile/dealer/my-customer/types'

const PAGE_SIZE = 5

export default function MyCustomerPage() {
    const { data, isLoading, isError } = useDealerCustomers()
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [selectedCustomer, setSelectedCustomer] = useState<DealerCustomerDTO | null>(null)

    const customers = useMemo(() => {
        return data ?? []
    }, [data])

    const filtered = useMemo(() => {
        const keyword = query.trim().toLowerCase()
        if (!keyword) return customers
        return customers.filter(
            (item) =>
                item.hoTen.toLowerCase().includes(keyword) ||
                item.email.toLowerCase().includes(keyword) ||
                item.soDienThoai.toLowerCase().includes(keyword)
        )
    }, [customers, query])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    return (
        <div data-node-id="2021:5443" className="min-h-screen bg-lambo-bold-black pb-20 text-[#e5e5e5]">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <DealerCustomerHeader />

                <DealerCustomerToolbar
                    query={query}
                    onQueryChange={(value) => {
                        setQuery(value)
                        setPage(1)
                    }}
                />

                <Eyebrow className="mb-4">{customers.length} khách hàng được phân công</Eyebrow>

                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-lambo-primary border-t-transparent" />
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="border border-red-800 bg-red-950/40 p-6 text-sm text-red-300">
                        Không lấy được danh sách khách hàng. Vui lòng thử lại sau.
                    </div>
                )}

                {!isLoading && !isError && (
                    <>
                        <div className="hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_148px] gap-6 border border-lambo-pressed bg-lambo-tertiary px-4 py-3 font-barlow text-sm font-medium tracking-[0.04em] text-lambo-hover md:grid">
                            <span>Khách hàng</span>
                            <span>Liên hệ</span>
                            <span>Quan tâm</span>
                            <span>Lần gần nhất</span>
                            <span>Thao tác</span>
                        </div>

                        {pageItems.length === 0 ? (
                            <div className="mt-4 border border-lambo-pressed bg-lambo-tertiary p-6 text-sm text-lambo-hover">
                                Không có data
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {pageItems.map((item, index) => (
                                    <DealerCustomerRow
                                        key={item.maKhachHang}
                                        customer={item}
                                        striped={index % 2 === 1}
                                        onSelect={setSelectedCustomer}
                                    />
                                ))}
                            </div>
                        )}

                        <DealerAppointmentPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageSize={PAGE_SIZE}
                            total={filtered.length}
                            itemLabel="khách hàng"
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>

            <CustomerDetailModal
                isOpen={!!selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
                customerId={selectedCustomer?.maKhachHang ?? null}
                dongXeQuanTam={selectedCustomer?.dongXeQuanTam}
                maHoSo={selectedCustomer?.maHoSo}
            />

            <ScrollToTop />
        </div>
    )
}
