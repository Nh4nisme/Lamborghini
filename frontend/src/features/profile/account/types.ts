export type ProfileTab = 'PERSONAL' | 'SECURITY' | 'PRIVACY'

export interface CustomerProfileDTO {
    maKhachHang: number
    ho: string
    ten: string
    email: string
    soDienThoai: string
    quocGia: string
    tinhThanhPho: string
    diaChi: string
    nhanThongTinTiepThi: boolean
}
