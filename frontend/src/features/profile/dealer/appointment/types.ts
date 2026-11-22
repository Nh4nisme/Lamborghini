import type { AppointmentStatus } from '../../user/appointment/types'

export type DealerStatusFilter = 'ALL' | 'CHO_XAC_NHAN' | 'DA_XAC_NHAN'

export interface DealerAppointmentDTO {
    maLichHen: number
    maYeuCau: string
    tenKhachHang: string
    tieuDe: string
    ngayHen: string
    gioBatDau: string
    trangThai: AppointmentStatus
}

export function formatDealerSchedule(dto: DealerAppointmentDTO) {
    const [, month, day] = dto.ngayHen.split('-')
    return `${day}/${month} · ${dto.gioBatDau}`
}
