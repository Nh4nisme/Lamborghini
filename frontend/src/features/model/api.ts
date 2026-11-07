import { http } from '../../api/http'
import type { DongXe } from './types'

export const modelApi = {
    getAllDongXe: () => http<DongXe[]>('/model/getAllDongXe'),
    // Future: getDongXeById: (id: number) => http<DongXeDetail>(`/model/getDongXeDetail/${id}`)
}
