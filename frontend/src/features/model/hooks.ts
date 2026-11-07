import { useQuery } from '@tanstack/react-query'
import { modelApi } from './api'

export const useDongXe = () =>
    useQuery({
        queryKey: ['dongxe'],
        queryFn: modelApi.getAllDongXe,
    })
