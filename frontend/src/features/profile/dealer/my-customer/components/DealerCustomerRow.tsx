import { Button } from '../../../../../components/ui/Button'
import { formatCustomerDate, type DealerCustomerDTO } from '../types'

interface DealerCustomerRowProps {
    customer: DealerCustomerDTO
    striped: boolean
    onSelect: (customer: DealerCustomerDTO) => void
}

export function DealerCustomerRow({ customer, striped, onSelect }: DealerCustomerRowProps) {
    return (
        <article
            className={`grid grid-cols-1 items-center gap-4 border border-lambo-pressed p-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_148px] md:gap-6 md:px-4 ${striped ? 'bg-lambo-tertiary' : 'bg-lambo-bold-black'}`}
        >
            <div className="min-w-0">
                <h3 className="truncate font-barlow text-lg font-semibold text-lambo-secondary">{customer.hoTen}</h3>
                {customer.maHoSo && <p className="mt-1 font-barlow text-xs text-lambo-primary">{customer.maHoSo}</p>}
            </div>

            <div className="min-w-0">
                <p className="truncate font-barlow text-sm text-lambo-secondary">{customer.email}</p>
                <p className="mt-1 font-barlow text-xs text-lambo-hover">{customer.soDienThoai}</p>
            </div>

            <div className="font-barlow text-base text-lambo-secondary">{customer.dongXeQuanTam}</div>

            <div className="font-barlow text-sm text-lambo-secondary">{formatCustomerDate(customer)}</div>

            <div>
                <Button
                    variant="light"
                    className="h-10 w-full justify-center px-4 text-[11px]"
                    onClick={() => onSelect(customer)}
                >
                    Xem hồ sơ
                </Button>
            </div>
        </article>
    )
}
