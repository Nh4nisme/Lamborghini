import type { CustomerProfileDTO, ProfileTab } from './types'

export const PROFILE_TABS: { value: ProfileTab; label: string }[] = [
    { value: 'PERSONAL', label: 'Thông tin cá nhân' },
    { value: 'SECURITY', label: 'Bảo mật' },
    { value: 'PRIVACY', label: 'Quyền riêng tư' },
]

export const COUNTRY_OPTIONS = ['Việt Nam', 'Singapore', 'Thái Lan']

export const CITY_OPTIONS = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']

// Dữ liệu mẫu theo thiết kế Figma, chỉ dùng khi chạy dev và API chưa sẵn sàng
export const SAMPLE_PROFILE: CustomerProfileDTO = {
    maKhachHang: 1,
    ho: 'Nguyễn',
    ten: 'Minh Anh',
    email: 'minhanh@email.com',
    soDienThoai: '+84 912 345 678',
    quocGia: 'Việt Nam',
    tinhThanhPho: 'Hồ Chí Minh',
    diaChi: 'Quận 1, Hồ Chí Minh',
    nhanThongTinTiepThi: true,
}
