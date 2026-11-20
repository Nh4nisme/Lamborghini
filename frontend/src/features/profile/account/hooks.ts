import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileApi } from './api'
import type { CustomerProfileDTO } from './types'

export const useProfile = () =>
    useQuery({
        queryKey: ['profile'],
        queryFn: profileApi.getProfile,
    })

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CustomerProfileDTO) => profileApi.updateProfile(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['profile'], data)
        },
    })
}
