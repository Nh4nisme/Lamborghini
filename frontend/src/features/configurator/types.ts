export interface TuyChon {
    maTuyChon: number
    maNhomTuyChon: number
    tenTuyChon: string
    thuocTinhPhu: string | null
    hinhAnh: string
    giaCongThem: number
}
export type Selected = Record<number, TuyChon>   // khóa = maNhomTuyChon