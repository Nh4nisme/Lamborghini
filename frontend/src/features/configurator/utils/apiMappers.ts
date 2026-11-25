import type { TuyChon, PaintColor, RimOption, InteriorTrim, CaliperOption, PaintFinish } from '../types'

/** Ratio used to convert the VND surcharge into an approximate USD price. */
const VND_PER_USD = 25000

/** Factory paint colours known by name, with their Lamborghini hex values. */
const PAINT_HEX_MAP: Record<string, string> = {
    'arancio borealis': '#ff6600',
    'bianco monocerus': '#f5f5f5',
    'giallo inti': '#ffcc00',
    'nero noctis': '#111111',
    'verde mantis': '#32cd32',
}

/** Fallback hex used when the option name is not part of the known palette. */
const DEFAULT_PAINT_HEX = '#d8a016'

/** PBR parameters applied per paint finish. */
const FINISH_MATERIAL: Record<PaintFinish, { roughness: number; metalness: number; clearcoat: number }> = {
    shiny: { roughness: 0.15, metalness: 0.65, clearcoat: 1 },
    matt: { roughness: 0.85, metalness: 0.1, clearcoat: 0.1 },
    pearl: { roughness: 0.25, metalness: 0.5, clearcoat: 0.9 },
}

/** Keeps only options that are still available in the catalogue. */
function activeOptions(items: TuyChon[]): TuyChon[] {
    return items.filter((item) => item.trangThai !== 'AN')
}

/** Converts the VND surcharge into an approximate USD amount. */
function toUSD(giaCongThem: number): number {
    return Math.round(giaCongThem / VND_PER_USD)
}

/** Resolves the paint hex from the option name, case-insensitively. */
function resolvePaintHex(tenTuyChon: string): string {
    const key = tenTuyChon.toLowerCase().trim()
    for (const [name, hex] of Object.entries(PAINT_HEX_MAP)) {
        if (key.includes(name)) return hex
    }
    return DEFAULT_PAINT_HEX
}

/** Derives the paint finish from the supplementary attribute. */
function resolveFinish(thuocTinhPhu: string | null): PaintFinish {
    const value = (thuocTinhPhu ?? '').toLowerCase()
    if (value.includes('matt')) return 'matt'
    if (value.includes('pearl')) return 'pearl'
    return 'shiny'
}

/**
 * Maps backend paint options into 3D-ready paint colours.
 */
export function mapTuyChonToPaintColors(items: TuyChon[]): PaintColor[] {
    return activeOptions(items).map((item) => {
        const finish = resolveFinish(item.thuocTinhPhu)
        const material = FINISH_MATERIAL[finish]

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            category: 'sportiva',
            hex: resolvePaintHex(item.tenTuyChon),
            finish,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
            description: `${item.tenTuyChon} — Lamborghini factory paint option.`,
            roughness: material.roughness,
            metalness: material.metalness,
            clearcoat: material.clearcoat,
        }
    })
}

/**
 * Maps backend wheel options into 3D-ready rim options.
 */
export function mapTuyChonToRims(items: TuyChon[]): RimOption[] {
    return activeOptions(items).map((item) => ({
        id: String(item.maTuyChon),
        name: item.tenTuyChon,
        size: '21/22 inch',
        finish: item.thuocTinhPhu || 'Gloss Black',
        hex: '#1a1b1f',
        spokeColor: '#33363d',
        priceUSD: toUSD(item.giaCongThem),
        priceVND: item.giaCongThem,
    }))
}

/**
 * Maps backend interior options into 3D-ready interior trims.
 */
export function mapTuyChonToInteriorTrims(items: TuyChon[]): InteriorTrim[] {
    return activeOptions(items).map((item) => {
        const name = item.tenTuyChon.toLowerCase()
        const isAlcantaraCam = name.includes('alcantara') && name.includes('cam')
        const isDaNeroAde = name.includes('nero') && name.includes('ade')

        const stitchingHex = isAlcantaraCam ? '#ff6600' : isDaNeroAde ? '#ffcc00' : DEFAULT_PAINT_HEX
        const primaryLeatherHex = isDaNeroAde ? '#121212' : '#151515'

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            primaryLeatherHex,
            secondaryLeatherHex: '#222222',
            stitchingHex,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
            description: `${item.tenTuyChon} — Lamborghini factory interior trim.`,
        }
    })
}

/**
 * Maps backend brake options into 3D-ready caliper options.
 */
export function mapTuyChonToCalipers(items: TuyChon[]): CaliperOption[] {
    return activeOptions(items).map((item) => {
        const attribute = item.thuocTinhPhu ?? ''
        const hex = attribute.startsWith('#') ? attribute : '#cc1111'

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            hex,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
        }
    })
}
