import { useQuery } from '@tanstack/react-query'
import { dealerDetailApi } from './api'

export const useDealerAppointmentDetail = (id: string) =>
    useQuery({
        queryKey: ['dealer-appointment-detail', id],
        queryFn: () => dealerDetailApi.getDealerAppointmentDetail(id),
        enabled: Boolean(id),
    })
