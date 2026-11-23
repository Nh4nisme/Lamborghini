import { http } from '../../../../api/http'
import type { DealerCustomerDTO } from './types'

export const dealerCustomerApi = {
    getDealerCustomers: () => http<DealerCustomerDTO[]>('/customer/dealer'),
}
