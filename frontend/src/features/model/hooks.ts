import { useQuery } from '@tanstack/react-query'
import { modelApi } from './api'

export const useModelDetail = (id: number) =>
    useQuery({
        queryKey: ['model-detail', id],
        queryFn: () => modelApi.getModelDetail(id),
        enabled: !!id && id > 0
    })

export const useDongXe = () =>
    useQuery({
        queryKey: ['dongxe'],
        queryFn: modelApi.getAllDongXe,
    })
