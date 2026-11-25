import { http } from '../../../../api/http'
import type { DealerCustomerDTO, KhachHangLichHenResponse } from './types'

export const dealerCustomerApi = {
    getDealerCustomers: async (): Promise<DealerCustomerDTO[]> => {
        const data = await http<KhachHangLichHenResponse[]>('/appointment/dealer/4/customers')
        return data.map((item, index) => ({
            maKhachHang: index + 1,
            maHoSo: '',
            hoTen: item.hoTenLienHe,
            email: item.emailLienHe,
            soDienThoai: item.sdtLienHe,
            dongXeQuanTam: item.tenXe || 'Chưa chọn xe',
            lanGanNhat: item.thoiGianHen,
        }))
    },
}
