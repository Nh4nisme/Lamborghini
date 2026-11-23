import type { DealerInformationTab, DealerProfileDTO } from './types'

export const DEALER_INFORMATION_TABS: { value: DealerInformationTab; label: string }[] = [
    { value: 'PERSONAL', label: 'Thông tin cá nhân' },
    { value: 'SECURITY', label: 'Bảo mật' },
    { value: 'SHOWROOM', label: 'Showroom' },
]

// Dữ liệu mẫu theo thiết kế Figma, chỉ dùng khi chạy dev và API chưa sẵn sàng
export const SAMPLE_DEALER_PROFILE: DealerProfileDTO = {
    maDealer: 'DL-001',
    hoTen: 'Trần Hoàng Nam',
    email: 'nam.tran@dealer.example',
    soDienThoai: '+84 903 111 222',
    chucDanh: 'Chuyên viên tư vấn khách hàng',
    showroom: 'Lamborghini Hồ Chí Minh',
    gioiThieuNgan: 'Tư vấn trải nghiệm và cá nhân hóa Lamborghini.',
}
