import { useQuery } from '@tanstack/react-query'
import { dealerCustomerApi } from './api'

export const useDealerCustomers = () =>
    useQuery({
        queryKey: ['dealer-customers'],
        queryFn: dealerCustomerApi.getDealerCustomers,
    })
