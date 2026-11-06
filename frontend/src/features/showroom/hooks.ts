import { useQuery } from '@tanstack/react-query'
import { showroomApi } from './api'

export const useShowroom = () =>
    useQuery({
        queryKey: ['showroom'],
        queryFn: showroomApi.getAllShowroom,
    })
