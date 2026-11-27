import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { appointmentApi } from './api'

export const useMyAppointments = () =>
    useQuery({
        queryKey: ['my-appointments'],
        queryFn: appointmentApi.getMyAppointments,
    })

export const useCancelAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: appointmentApi.cancelAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-appointments'] })
        },
    })
}
