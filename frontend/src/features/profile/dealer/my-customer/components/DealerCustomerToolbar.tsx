import { Search } from 'lucide-react'
import { Button } from '../../../../../components/ui/Button'
import { Input } from '../../../../../components/ui/FormField'

interface DealerCustomerToolbarProps {
    query: string
    onQueryChange: (query: string) => void
}

export function DealerCustomerToolbar({ query, onQueryChange }: DealerCustomerToolbarProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
                <Input
                    id="dealer-customer-search"
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Tìm tên, email hoặc số điện thoại"
                    aria-label="Tìm khách hàng"
                    className="h-12 pr-12 text-sm"
                />
                <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lambo-primary" aria-hidden="true" />
            </div>

            <Button variant="light" className="h-10 w-full justify-center md:w-80" onClick={() => onQueryChange('')}>
                Tất cả khách hàng
            </Button>
        </div>
    )
}
