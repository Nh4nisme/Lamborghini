export interface TuyChon {
    maTuyChon: number
    nhomTuyChon?: number
    maNhomTuyChon?: number
    tenTuyChon: string
    thuocTinhPhu: string | null
    hinhAnh: string | null
    giaCongThem: number
    trangThai?: string
    tenNhomTuyChon?: string
}

export interface XeConfigurator {
    maXe: number
    tenPhienBan: string
    giaKhoiDiem: number
    dongCo: string
    congSuat: number
    tocDoToiDa: number
    hinhAnh: string
    moTa?: string
    trangThai?: string
    giaToc?: number
    tocDoDongCo?: number
    phanKhoi?: number
}

export type PaintType = 'Metallic' | 'Solid' | 'Matt'

export interface SelectedConfig {
    color: TuyChon | null
    wheel: TuyChon | null // maNhomTuyChon = 2
    trim: TuyChon | null  // maNhomTuyChon = 6
}
