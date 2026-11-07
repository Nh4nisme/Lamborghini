import { http } from '../../api/http'
import type { ModelDetailResponse, DongXe } from './types'

export const modelApi = {
    getModelDetail: (id: number) => http<ModelDetailResponse>(`/model/${id}/modeldetail`),
    getAllDongXe: () => http<DongXe[]>('/model/getAllDongXe'),
}
