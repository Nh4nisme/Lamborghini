import { http } from '../../../../api/http'
import type { DealerAppointmentDTO } from './types'

export const dealerApi = {
    getDealerAppointments: () => http<DealerAppointmentDTO[]>('/appointment/dealer'),
}
