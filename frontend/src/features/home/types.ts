export interface DongXe {
    maDongXe: number
    tenDongXe: string
    danhMuc: string
    moTa: string
    trangThai: string
    noiBat: boolean
    hinhAnh?: string
}

export interface TinTuc {
    maTinTuc: number
    tieuDe: string
    noiDung: string
    hinhAnh: string
    loai: string
    ngayDang: string // chuỗi ISO, ví dụ "2026-03-14T08:00:00"
    trangThai: string
}

export interface HomeResponse {
    dongXe: DongXe[]
    tinTuc: TinTuc[]
}