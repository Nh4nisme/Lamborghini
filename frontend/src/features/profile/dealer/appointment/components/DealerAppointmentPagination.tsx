import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'

interface DealerAppointmentPaginationProps {
    currentPage: number
    totalPages: number
    pageSize: number
    total: number
    itemLabel?: string
    onPageChange: (page: number) => void
}

export function DealerAppointmentPagination({
    currentPage,
    totalPages,
    pageSize,
    total,
    itemLabel = 'lịch hẹn',
    onPageChange,
}: DealerAppointmentPaginationProps) {
    const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, total)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-barlow text-sm text-lambo-hover">
                Hiển thị {start}–{end} / {total} {itemLabel}
            </p>

            <nav aria-label="Phân trang" className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    aria-label="Trang trước"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="h-10 w-10 justify-center px-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'primary' : 'secondary'}
                        onClick={() => onPageChange(page)}
                        className="h-10 w-10 justify-center px-0"
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant="secondary"
                    aria-label="Trang sau"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="h-10 w-10 justify-center px-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </nav>
        </div>
    )
}
