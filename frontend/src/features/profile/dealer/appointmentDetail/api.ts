import { http } from '../../../../api/http'
import type { DealerAppointmentDetailDTO } from './types'

export const dealerDetailApi = {
    getDealerAppointmentDetail: (id: string) =>
        http<DealerAppointmentDetailDTO>(`/appointment/dealer/${id}`),
}
