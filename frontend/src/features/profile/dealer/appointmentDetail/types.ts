import type { AppointmentStatus } from '../../user/appointment/types'

export interface DealerAppointmentDetailDTO {
    maLichHen: number
    maYeuCau: string
    trangThai: AppointmentStatus
    ngayTiepNhan: string
    tenKhachHang: string
    soDienThoai: string
    email: string
    tieuDe: string
    ngayHen: string
    khungGio: string
    showroom: string
    cauHinh: string
    loiNhanKhachHang: string
    ghiChuNoiBo: string
    tenDealer: string
    maDealer: string
}

export function formatDetailSchedule(dto: DealerAppointmentDetailDTO) {
    const dateStr = dto.ngayHen ? dto.ngayHen.slice(0, 10) : '2026-11-24'
    const [year = '2026', month = '11', day = '24'] = dateStr.split('-')
    return `${day}/${month}/${year} · ${dto.khungGio}`
}

export function formatReceivedDate(dto: DealerAppointmentDetailDTO) {
    const dateStr = dto.ngayTiepNhan ? dto.ngayTiepNhan.slice(0, 10) : '2026-11-24'
    const [year = '2026', month = '11', day = '24'] = dateStr.split('-')
    return `${day}.${month}.${year}`
}
