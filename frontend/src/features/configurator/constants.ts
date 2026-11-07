import type { TuyChon } from './types'

export const STEPS = [
    { key: 'exterior', label: '01 EXTERIOR' },
    { key: 'interior', label: '02 INTERIOR' },
    { key: 'options', label: '03 OPTIONS' },
    { key: 'summary', label: '04 SUMMARY' },
]

export const PAINT_CATEGORIES = [
    { key: 'Metallic', label: 'METALLIC' },
    { key: 'Solid', label: 'SOLID' },
    { key: 'Matt', label: 'MATT' },
] as const

// Color mapping for swatches
const COLOR_MAP: Record<string, string> = {
    'arancio borealis': '#e05a1b',
    'arancio': '#e05a1b',
    'verde mantis': '#5f8d52',
    'verde': '#4f8542',
    'nero noctis': '#1f2022',
    'nero': '#1f2022',
    'bianco monocerus': '#f2eee3',
    'bianco': '#f5f4ef',
    'giallo auge': '#e2a32c',
    'giallo inti': '#e8a938',
    'giallo': '#e2a32c',
    'blu eleos': '#3b758a',
    'blu astraeus': '#2b5876',
    'blu': '#3b758a',
    'rosso mars': '#8c2d38',
    'rosso bia': '#9e2a2b',
    'rosso': '#8c2d38',
    'grigio nimbus': '#a6aba8',
    'grigio titans': '#787b7a',
    'grigio': '#a6aba8',
    'viola pasifae': '#5e2750',
    'viola': '#5e2750',
}

export function getColorHex(tenTuyChon?: string, thuocTinhPhu?: string | null): string {
    if (thuocTinhPhu && (thuocTinhPhu.startsWith('#') || thuocTinhPhu.startsWith('rgb'))) {
        return thuocTinhPhu
    }
    if (!tenTuyChon) return '#d4af37'
    const lower = tenTuyChon.toLowerCase().trim()
    for (const [name, hex] of Object.entries(COLOR_MAP)) {
        if (lower.includes(name)) return hex
    }
    return '#8a8a8a'
}

export const formatVND = (value: number | bigint | undefined | null) => {
    if (!value) return '0 ₫'
    const num = typeof value === 'bigint' ? Number(value) : value
    return num.toLocaleString('vi-VN') + ' ₫'
}

// Fallback options in case API is offline or returns empty during local dev
export const FALLBACK_COLORS: Record<string, TuyChon[]> = {
    Metallic: [
        { maTuyChon: 3, nhomTuyChon: 1, tenTuyChon: 'Arancio Borealis', thuocTinhPhu: 'Metallic', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 180000000 },
        { maTuyChon: 2, nhomTuyChon: 1, tenTuyChon: 'Verde Mantis', thuocTinhPhu: 'Metallic', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 150000000 },
        { maTuyChon: 20, nhomTuyChon: 1, tenTuyChon: 'Giallo Inti', thuocTinhPhu: 'Metallic', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 160000000 },
        { maTuyChon: 21, nhomTuyChon: 1, tenTuyChon: 'Blu Eleos', thuocTinhPhu: 'Metallic', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 170000000 },
    ],
    Solid: [
        { maTuyChon: 4, nhomTuyChon: 1, tenTuyChon: 'Nero Noctis', thuocTinhPhu: 'Solid', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 0 },
        { maTuyChon: 22, nhomTuyChon: 1, tenTuyChon: 'Rosso Mars', thuocTinhPhu: 'Solid', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 0 },
    ],
    Matt: [
        { maTuyChon: 5, nhomTuyChon: 1, tenTuyChon: 'Bianco Monocerus', thuocTinhPhu: 'Matt', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 0 },
        { maTuyChon: 23, nhomTuyChon: 1, tenTuyChon: 'Grigio Titans', thuocTinhPhu: 'Matt', hinhAnh: '/Images/homepage/Revuelto.png', giaCongThem: 120000000 },
    ],
}

export const FALLBACK_WHEELS: TuyChon[] = [
    { maTuyChon: 6, nhomTuyChon: 2, tenTuyChon: 'Multi-spoke', thuocTinhPhu: 'gloss black', hinhAnh: null, giaCongThem: 0, tenNhomTuyChon: 'Mâm xe' },
    { maTuyChon: 7, nhomTuyChon: 2, tenTuyChon: 'Mul-spoke', thuocTinhPhu: 'gloss black', hinhAnh: null, giaCongThem: 35000000, tenNhomTuyChon: 'Mâm xe' },
    { maTuyChon: 8, nhomTuyChon: 2, tenTuyChon: 'Three-spoke', thuocTinhPhu: 'gloss black', hinhAnh: null, giaCongThem: 22000000, tenNhomTuyChon: 'Mâm xe' },
]

export const FALLBACK_TIRES: TuyChon[] = [
    { maTuyChon: 16, nhomTuyChon: 6, tenTuyChon: 'Bridgestone Potenza Sport', thuocTinhPhu: 'gloss black', hinhAnh: null, giaCongThem: 0, tenNhomTuyChon: 'Lốp xe' },
    { maTuyChon: 17, nhomTuyChon: 6, tenTuyChon: 'Pirelli P Zero', thuocTinhPhu: 'gloss black', hinhAnh: null, giaCongThem: 0, tenNhomTuyChon: 'Lốp xe' },
]
