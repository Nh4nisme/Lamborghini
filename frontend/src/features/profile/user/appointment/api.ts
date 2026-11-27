import { http } from '../../../../api/http'
import type { AppointmentDTO } from './types'

export const appointmentApi = {
    getMyAppointments: () => http<AppointmentDTO[]>('/appointments/my'),
    cancelAppointment: (id: number) =>
        http(`/appointments/${id}/cancel`, {
            method: 'PUT',
        }),
}
