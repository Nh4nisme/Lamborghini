import { http } from '../../../../api/http'
import type { DealerProfileDTO } from './types'

export const dealerProfileApi = {
    getDealerProfile: () => http<DealerProfileDTO>('/dealer/profile'),

    updateDealerProfile: (payload: DealerProfileDTO) =>
        http<DealerProfileDTO>('/dealer/profile', {
            method: 'PUT',
            body: JSON.stringify(payload),
        }),
}
