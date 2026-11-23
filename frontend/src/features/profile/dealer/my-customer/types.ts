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
    const [year, month, day] = dto.lanGanNhat.split('-')
    return `${day}/${month}/${year}`
}
