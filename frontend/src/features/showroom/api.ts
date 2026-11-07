import { http } from '../../api/http'
import type { Showroom } from './types'

export const showroomApi = {
    getAllShowroom: () => http<Showroom[]>('/showroom'),
}
