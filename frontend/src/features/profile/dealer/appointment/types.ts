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
    const dateStr = dto.ngayHen ? dto.ngayHen.slice(0, 10) : '2026-11-24'
    const [, month = '11', day = '24'] = dateStr.split('-')
    return `${day}/${month} · ${dto.gioBatDau}`
}
