import { Search } from 'lucide-react'
import { Input, Select } from '../../../../../components/ui/FormField'
import type { DealerStatusFilter } from '../types'
import { DEALER_STATUS_OPTIONS } from '../data'

interface DealerAppointmentToolbarProps {
    query: string
    status: DealerStatusFilter
    onQueryChange: (query: string) => void
    onStatusChange: (status: DealerStatusFilter) => void
}

export function DealerAppointmentToolbar({
    query,
    status,
    onQueryChange,
    onStatusChange,
}: DealerAppointmentToolbarProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
                <Input
                    id="dealer-appointment-search"
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Tìm theo khách hàng hoặc mã lịch hẹn"
                    aria-label="Tìm lịch hẹn"
                    className="h-12 pr-12 text-sm"
                />
                <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" aria-hidden="true" />
            </div>

            <div className="md:w-80">
                <Select
                    id="dealer-appointment-status"
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value as DealerStatusFilter)}
                    aria-label="Lọc theo trạng thái"
                    className="h-12 font-barlow text-sm font-semibold uppercase tracking-[0.04em]"
                >
                    {DEALER_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </div>
        </div>
    )
}
