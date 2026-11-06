import { http } from '../../api/http'
import type { HomeResponse } from './types'

export const homeApi = {
    getHome: () => http<HomeResponse>('/home'),
}