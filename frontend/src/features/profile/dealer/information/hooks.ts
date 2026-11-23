import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { dealerProfileApi } from './api'
import type { DealerProfileDTO } from './types'

export const useDealerProfile = () =>
    useQuery({
        queryKey: ['dealer-profile'],
        queryFn: dealerProfileApi.getDealerProfile,
    })

export const useUpdateDealerProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: DealerProfileDTO) => dealerProfileApi.updateDealerProfile(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['dealer-profile'], data)
        },
    })
}
