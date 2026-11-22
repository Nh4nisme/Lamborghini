import { http } from '../../../../api/http'
import type { AppointmentDTO } from './types'

export const appointmentApi = {
    getMyAppointments: () => http<AppointmentDTO[]>('/appointment/my'),
}
