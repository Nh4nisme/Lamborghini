import { useQuery } from '@tanstack/react-query'
import { dealerApi } from './api'

export const useDealerAppointments = () =>
    useQuery({
        queryKey: ['dealer-appointments'],
        queryFn: dealerApi.getDealerAppointments,
    })
