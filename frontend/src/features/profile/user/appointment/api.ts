import { http } from '../../../../api/http'
import type { AppointmentDTO } from './types'

export interface AppointmentDetailDTO {
    maLichHen: number
    maYeuCau: string
    trangThai: string
    ngayTiepNhan: string | null
    tenKhachHang: string | null
    soDienThoai: string | null
    email: string | null
    tieuDe: string
    ngayHen: string
    khungGio: string
    showroom: string
    cauHinh: string | null
    loiNhanKhachHang: string | null
    ghiChuNoiBo: string | null
    tenDealer: string | null
    maDealer: number | null
}

function getStoredUserEmail(): string | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem('user')
        if (!raw) return null
        const parsed = JSON.parse(raw) as { email?: string }
        return parsed.email?.trim() || null
    } catch {
        return null
    }
}

export const appointmentApi = {
    getMyAppointments: () => {
        const email = getStoredUserEmail()
        if (!email) {
            return Promise.resolve([])
        }
        return http<AppointmentDTO[]>(`/appointments/my?email=${encodeURIComponent(email)}`)
    },
    getAppointmentDetail: (id: number) => http<AppointmentDetailDTO>(`/appointments/${id}`),
    cancelAppointment: (id: number) =>
        http(`/appointments/${id}/cancel`, {
            method: 'PUT',
        }),
}
