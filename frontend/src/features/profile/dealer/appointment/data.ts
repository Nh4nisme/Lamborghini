import type { DealerAppointmentDTO, DealerStatusFilter } from './types'

export const DEALER_STATUS_OPTIONS: { value: DealerStatusFilter; label: string }[] = [
    { value: 'ALL', label: 'Tất cả trạng thái' },
    { value: 'CHO_XAC_NHAN', label: 'Chờ xác nhận' },
    { value: 'DA_XAC_NHAN', label: 'Đã xác nhận' },
]

// Dữ liệu mẫu theo thiết kế Figma, chỉ dùng khi chạy dev và API chưa sẵn sàng
export const SAMPLE_DEALER_APPOINTMENTS: DealerAppointmentDTO[] = [
    {
        maLichHen: 1124,
        maYeuCau: 'LH-1124',
        tenKhachHang: 'Nguyễn Minh Anh',
        tieuDe: 'Revuelto · Trải nghiệm',
        ngayHen: '2026-11-22',
        gioBatDau: '14:00',
        trangThai: 'CHO_XAC_NHAN',
    },
    {
        maLichHen: 1125,
        maYeuCau: 'LH-1125',
        tenKhachHang: 'Trần Quốc Bảo',
        tieuDe: 'Urus SE · Tư vấn',
        ngayHen: '2026-11-23',
        gioBatDau: '10:00',
        trangThai: 'CHO_XAC_NHAN',
    },
    {
        maLichHen: 1126,
        maYeuCau: 'LH-1126',
        tenKhachHang: 'Lê Thảo Vy',
        tieuDe: 'Revuelto · Trải nghiệm',
        ngayHen: '2026-11-24',
        gioBatDau: '09:00',
        trangThai: 'CHO_XAC_NHAN',
    },
    {
        maLichHen: 1120,
        maYeuCau: 'LH-1120',
        tenKhachHang: 'Nguyễn Minh Anh',
        tieuDe: 'Revuelto · Tư vấn',
        ngayHen: '2026-11-20',
        gioBatDau: '09:00',
        trangThai: 'DA_XAC_NHAN',
    },
    {
        maLichHen: 1118,
        maYeuCau: 'LH-1118',
        tenKhachHang: 'Võ Khánh Linh',
        tieuDe: 'Revuelto · Trải nghiệm',
        ngayHen: '2026-11-18',
        gioBatDau: '15:00',
        trangThai: 'DA_XAC_NHAN',
    },
]
