import type { AppointmentDTO, AppointmentTab } from './types'

export const APPOINTMENT_TABS: { value: AppointmentTab; label: string; heading: string }[] = [
    { value: 'UPCOMING', label: 'Sắp tới', heading: 'Tất cả lịch hẹn sắp tới' },
    { value: 'COMPLETED', label: 'Đã hoàn tất', heading: 'Lịch hẹn đã hoàn tất' },
    { value: 'CANCELLED', label: 'Đã hủy', heading: 'Lịch hẹn đã hủy' },
]

// Dữ liệu mẫu theo thiết kế Figma, chỉ dùng khi chạy dev và API chưa sẵn sàng
export const SAMPLE_APPOINTMENTS: AppointmentDTO[] = [
    {
        maLichHen: 1124,
        maYeuCau: 'LH-1124',
        tieuDe: 'Trải nghiệm Revuelto',
        ngayHen: '2026-11-22',
        gioBatDau: '14:00',
        gioKetThuc: '15:00',
        trangThai: 'CHO_XAC_NHAN',
        tenShowroom: 'Lamborghini Hồ Chí Minh',
        tenDealer: 'Trần Hoàng Nam',
    },
    {
        maLichHen: 1120,
        maYeuCau: 'LH-1120',
        tieuDe: 'Tư vấn cấu hình Revuelto',
        ngayHen: '2026-11-20',
        gioBatDau: '09:00',
        gioKetThuc: '10:00',
        trangThai: 'DA_XAC_NHAN',
        tenShowroom: 'Lamborghini Hồ Chí Minh',
        tenDealer: 'Trần Hoàng Nam',
    },
    {
        maLichHen: 1098,
        maYeuCau: 'LH-1098',
        tieuDe: 'Lái thử Urus',
        ngayHen: '2026-10-05',
        gioBatDau: '10:00',
        gioKetThuc: '11:30',
        trangThai: 'HOAN_TAT',
        tenShowroom: 'Lamborghini Hồ Chí Minh',
        tenDealer: 'Trần Hoàng Nam',
    },
    {
        maLichHen: 1107,
        maYeuCau: 'LH-1107',
        tieuDe: 'Tư vấn Ad Personam',
        ngayHen: '2026-10-18',
        gioBatDau: '15:00',
        gioKetThuc: '16:00',
        trangThai: 'DA_HUY',
        tenShowroom: 'Lamborghini Hồ Chí Minh',
        tenDealer: 'Trần Hoàng Nam',
    },
]
