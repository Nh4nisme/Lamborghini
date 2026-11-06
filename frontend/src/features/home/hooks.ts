import { useQuery } from '@tanstack/react-query'
import { homeApi } from './api'

export const useHome = () =>
    useQuery({
        queryKey: ['home'],
        queryFn: homeApi.getHome,
    })