import { http } from '../../../../api/http'
import type { ChangePasswordPayload, DealerProfileDTO } from './types'

interface TaiKhoanResponse {
    maTaiKhoan: number
    hoTen: string
    email: string
    sdt: string
    vaiTro: string
    trangThai: string
    ngayTao: string
}

export const dealerProfileApi = {
    getDealerProfile: async () => {
        const response = await http<TaiKhoanResponse>('/taikhoan/dealers/4')
        return {
            maDealer: `DL-${response.maTaiKhoan}`,
            hoTen: response.hoTen,
            email: response.email,
            soDienThoai: response.sdt,
            chucDanh: 'Chuyên viên tư vấn khách hàng',
            showroom: 'Lamborghini Hồ Chí Minh',
            gioiThieuNgan: 'Tư vấn trải nghiệm và cá nhân hóa Lamborghini.',
        } as DealerProfileDTO
    },

    updateDealerProfile: (payload: DealerProfileDTO) => {
        const id = payload.maDealer.replace('DL-', '') || '4'
        return http<TaiKhoanResponse>(`/taikhoan/dealers/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                hoTen: payload.hoTen,
                sdt: payload.soDienThoai,
            }),
        })
    },

    changeDealerPassword: (payload: ChangePasswordPayload) =>
        http('/dealer/profile/password', {
            method: 'PUT',
            body: JSON.stringify(payload),
        }),
}
