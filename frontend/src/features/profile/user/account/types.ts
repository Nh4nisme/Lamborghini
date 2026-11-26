export type ProfileTab = 'PERSONAL' | 'SECURITY' | 'PRIVACY'

export interface CustomerProfileDTO {
    maKhachHang: number
    ho: string
    ten: string
    email: string
    soDienThoai: string
    nhanThongTinTiepThi: boolean
}
