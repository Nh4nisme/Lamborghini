import { http } from '../../../../api/http'
import type { DealerCustomerDTO } from './types'

interface DealerCustomerResponse {
    maKhachHang: number
    maHoSo: string
    hoTen: string
    email: string
    soDienThoai: string
    dongXeQuanTam: string
    lanGanNhat: string
}

export const dealerCustomerApi = {
    getDealerCustomers: async (): Promise<DealerCustomerDTO[]> => {
        const data = await http<DealerCustomerResponse[]>('/customer/dealer')
        return data.map((item) => ({
            maKhachHang: item.maKhachHang,
            maHoSo: item.maHoSo || '',
            hoTen: item.hoTen,
            email: item.email,
            soDienThoai: item.soDienThoai,
            dongXeQuanTam: item.dongXeQuanTam || 'Chưa chọn xe',
            lanGanNhat: item.lanGanNhat,
        }))
    },
}
