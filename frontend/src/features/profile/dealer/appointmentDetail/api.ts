import { http } from '../../../../api/http'
import type { DealerAppointmentDetailDTO } from './types'

export const dealerDetailApi = {
    getDealerAppointmentDetail: (id: string) =>
        http<DealerAppointmentDetailDTO>(`/appointment/dealer/${id}`),
    confirmAppointment: (id: number | string) =>
        http(`/appointment/dealer/${id}/confirm`, { method: 'PUT' }),
    rejectAppointment: (id: number | string, lyDoTuChoi: string) =>
        http(`/appointment/dealer/${id}/reject`, {
            method: 'PUT',
            body: JSON.stringify({ lyDoTuChoi }),
        }),
}
