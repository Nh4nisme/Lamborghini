export type NhomKind = 'swatch' | 'select'

// Khóa = maNhomTuyChon trong CSDL. SỬA cho khớp dữ liệu thật của bạn.
export const NHOM: Record<number, { label: string; kind: NhomKind }> = {
    1: { label: 'Exterior paint', kind: 'swatch' },
    2: { label: 'Wheels', kind: 'select' },
    3: { label: 'Exterior trim', kind: 'select' },
}

export interface Step { key: string; label: string; nhom: number[] }
export const STEPS: Step[] = [
    { key: 'exterior', label: '01 Exterior', nhom: [1, 2, 3] },
    { key: 'interior', label: '02 Interior', nhom: [] },
    { key: 'options', label: '03 Options', nhom: [] },
    { key: 'summary', label: '04 Summary', nhom: [] },
]