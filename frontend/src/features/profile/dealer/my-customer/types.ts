export interface DealerCustomerDTO {
    maKhachHang: number
    maHoSo: string
    hoTen: string
    email: string
    soDienThoai: string
    dongXeQuanTam: string
    lanGanNhat: string
}

export function formatCustomerDate(dto: DealerCustomerDTO) {
    const dateStr = dto.lanGanNhat ? dto.lanGanNhat.slice(0, 10) : '2026-11-24'
    const [year = '2026', month = '11', day = '24'] = dateStr.split('-')
    return `${day}/${month}/${year}`
}
