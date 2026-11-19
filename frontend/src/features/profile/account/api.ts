import { http } from '../../../api/http'
import type { CustomerProfileDTO } from './types'

export const profileApi = {
    getProfile: () => http<CustomerProfileDTO>('/customer/profile'),

    updateProfile: (payload: CustomerProfileDTO) =>
        http<CustomerProfileDTO>('/customer/profile', {
            method: 'PUT',
            body: JSON.stringify(payload),
        }),
}
