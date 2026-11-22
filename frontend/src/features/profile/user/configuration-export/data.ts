import type { ExportConfiguration, ExportFormatOption } from './types'

export const EXPORT_FORMAT_OPTIONS: ExportFormatOption[] = [
    { value: 'PDF_FULL', label: 'PDF · Cấu hình đầy đủ' },
]

// Dữ liệu mẫu theo thiết kế Figma
export const SAMPLE_EXPORT_CONFIGURATION: ExportConfiguration = {
    tenDongXe: 'Revuelto',
    maCauHinh: 'RV-261115',
    ngayLuu: '15.11.2026',
    cauHinhTomTat: ['Arancio Borealis · Nero Ade', 'Mâm đa chấu đen bóng · Gói Carbon'],
    hinhAnh: '/Images/models/Revuelto.png',
    linkChiaSe: 'lamborghini.vn/c/RV-261115',
}
