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
    const [year, month, day] = dto.ngayHen.split('-')
    return `${day}/${month}/${year} · ${dto.khungGio}`
}

export function formatReceivedDate(dto: DealerAppointmentDetailDTO) {
    const [year, month, day] = dto.ngayTiepNhan.split('-')
    return `${day}.${month}.${year}`
}
