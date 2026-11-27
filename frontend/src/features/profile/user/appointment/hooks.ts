import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { appointmentApi } from './api'

export const useMyAppointments = () =>
    useQuery({
        queryKey: ['my-appointments'],
        queryFn: appointmentApi.getMyAppointments,
    })

export const useAppointmentDetail = (id: number | null) =>
    useQuery({
        queryKey: ['appointment-detail', id],
        queryFn: () => appointmentApi.getAppointmentDetail(id!),
        enabled: id !== null,
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
