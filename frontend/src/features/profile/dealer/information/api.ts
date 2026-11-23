import { http } from '../../../../api/http'
import type { DealerProfileDTO } from './types'

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

    updateDealerProfile: (payload: DealerProfileDTO) =>
        http<DealerProfileDTO>('/dealer/profile', {
            method: 'PUT',
            body: JSON.stringify(payload),
        }),
}
