import { http } from '../../api/http'
import type { TuyChon } from './types'

export const getTuyChonTheoXe = (maXe: number): Promise<TuyChon[]> =>
    http<TuyChon[]>(`/api/car/${maXe}/options`);