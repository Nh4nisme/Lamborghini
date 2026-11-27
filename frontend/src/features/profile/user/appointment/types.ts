export type AppointmentStatus =
    | 'DA_XAC_NHAN'
    | 'CHO_XAC_NHAN'
    | 'HOAN_TAT'
    | 'HOAN_THANH'
    | 'DA_HUY'
    | 'HUY'
    | 'TU_CHOI'

export type AppointmentTab = 'UPCOMING' | 'COMPLETED' | 'CANCELLED'

export interface AppointmentDTO {
    maLichHen: number
    maYeuCau: string
    tieuDe: string
    ngayHen: string
    gioBatDau: string
    gioKetThuc: string
    trangThai: AppointmentStatus
    tenShowroom: string
    tenDealer: string
}

export interface Appointment {
    id: number
    code: string
    title: string
    status: AppointmentStatus
    tab: AppointmentTab
    dayLabel: string
    dateLabel: string
    timeLabel: string
    venue: string
    startsAt: string
}

const TAB_BY_STATUS: Record<AppointmentStatus, AppointmentTab> = {
    DA_XAC_NHAN: 'UPCOMING',
    CHO_XAC_NHAN: 'UPCOMING',
    HOAN_TAT: 'COMPLETED',
    HOAN_THANH: 'COMPLETED',
    DA_HUY: 'CANCELLED',
    HUY: 'CANCELLED',
    TU_CHOI: 'CANCELLED',
}

export function adaptAppointment(dto: AppointmentDTO): Appointment {
    const dateStr = dto.ngayHen ? dto.ngayHen.slice(0, 10) : '2026-11-24'
    const [year = '2026', month = '11', day = '24'] = dateStr.split('-')

    return {
        id: dto.maLichHen,
        code: dto.maYeuCau,
        title: dto.tieuDe,
        status: dto.trangThai,
        tab: TAB_BY_STATUS[dto.trangThai] || 'UPCOMING',
        dayLabel: `${day} tháng ${Number(month)}`,
        dateLabel: `${day}/${month}/${year}`,
        timeLabel: `${dto.gioBatDau} – ${dto.gioKetThuc}`,
        venue: `${dto.tenShowroom || 'Lamborghini Showroom'} / ${dto.tenDealer || 'Dealer'}`,
        startsAt: `${dateStr}T${dto.gioBatDau}`,
    }
}
