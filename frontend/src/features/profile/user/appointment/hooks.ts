import { useQuery } from '@tanstack/react-query'
import { appointmentApi } from './api'

export const useMyAppointments = () =>
    useQuery({
        queryKey: ['my-appointments'],
        queryFn: appointmentApi.getMyAppointments,
    })
