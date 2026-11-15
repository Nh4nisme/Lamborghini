export type AppointmentStatus = 'DA_XAC_NHAN' | 'CHO_XAC_NHAN' | 'HOAN_TAT' | 'DA_HUY'

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
    DA_HUY: 'CANCELLED',
}

export function adaptAppointment(dto: AppointmentDTO): Appointment {
    const [year, month, day] = dto.ngayHen.split('-')

    return {
        id: dto.maLichHen,
        code: dto.maYeuCau,
        title: dto.tieuDe,
        status: dto.trangThai,
        tab: TAB_BY_STATUS[dto.trangThai],
        dayLabel: `${day} tháng ${Number(month)}`,
        dateLabel: `${day}/${month}/${year}`,
        timeLabel: `${dto.gioBatDau} – ${dto.gioKetThuc}`,
        venue: `${dto.tenShowroom} / ${dto.tenDealer}`,
        startsAt: `${dto.ngayHen}T${dto.gioBatDau}`,
    }
}
