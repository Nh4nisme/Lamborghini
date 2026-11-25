import { http } from '../../../../api/http'
import type { CustomerProfileDTO } from './types'

interface TaiKhoanResponse {
    maTaiKhoan: number
    hoTen: string
    email: string
    sdt: string
    vaiTro: string
    trangThai: string
    ngayTao: string
}

export const profileApi = {
    getProfile: async () => {
        const response = await http<TaiKhoanResponse>('/profile')
        const [ho, ...tenParts] = response.hoTen.split(' ')
        return {
            maKhachHang: response.maTaiKhoan,
            ho: ho || '',
            ten: tenParts.join(' ') || '',
            email: response.email,
            soDienThoai: response.sdt,
            quocGia: 'Việt Nam',
            tinhThanhPho: 'Hồ Chí Minh',
            diaChi: 'Quận 1, Hồ Chí Minh',
            nhanThongTinTiepThi: false,
        } as CustomerProfileDTO
    },

    updateProfile: (payload: CustomerProfileDTO) =>
        http<TaiKhoanResponse>(`/profile?id=${payload.maKhachHang}`, {
            method: 'PUT',
            body: JSON.stringify({
                hoTen: `${payload.ho} ${payload.ten}`.trim(),
                sdt: payload.soDienThoai,
            }),
        }),
}
