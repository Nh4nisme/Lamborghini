import type { TuyChon, PaintColor, RimOption, InteriorTrim, CaliperOption, TireOption, PaintFinish } from '../types'

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

/** Caliper colour for rows whose attribute is not a hex (e.g. `Carbon-Ceramic`). */
const DEFAULT_CALIPER_HEX = '#CC1111'

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

/** Finds a `#RRGGBB` colour inside a free-text attribute such as `Metallic #FF6600`. */
function extractHex(value: string | null): string | null {
    const match = (value ?? '').match(/#[0-9a-f]{6}\b/i)
    return match ? match[0].toUpperCase() : null
}

/**
 * Resolves the paint hex. `thuoc_tinh_phu` carries it as `<Finish> #RRGGBB`;
 * older rows without a hex fall back to the known palette by name.
 */
function resolvePaintHex(tenTuyChon: string, thuocTinhPhu: string | null): string {
    const fromAttribute = extractHex(thuocTinhPhu)
    if (fromAttribute) return fromAttribute

    const key = tenTuyChon.toLowerCase().trim()
    for (const [name, hex] of Object.entries(PAINT_HEX_MAP)) {
        if (key.includes(name)) return hex
    }
    return DEFAULT_PAINT_HEX
}

/**
 * Parses thuocTinhPhu (e.g. 'Metallic #FFCC00', 'Solid #111111', 'Matt #F5F5F5')
 * and returns { paintGroup, finish, hex }.
 */
function parsePaintAttribute(thuocTinhPhu: string | null): { paintGroup: string; finish: PaintFinish; hex: string | null } {
    const value = (thuocTinhPhu ?? '').trim()
    const match = value.match(/^(\w+)\s+(#[0-9a-f]{6})\b/i)
    
    if (match) {
        const prefix = match[1].toUpperCase()
        const hex = match[2].toUpperCase()
        let finish: PaintFinish = 'shiny'
        
        if (prefix === 'MATT') {
            finish = 'matt'
        } else if (prefix === 'SOLID' || prefix === 'PEARL') {
            finish = 'pearl'
        }
        
        return { paintGroup: prefix, finish, hex }
    }
    
    const lowerValue = value.toLowerCase()
    let finish: PaintFinish = 'shiny'
    if (lowerValue.includes('matt')) finish = 'matt'
    else if (lowerValue.includes('pearl')) finish = 'pearl'
    
    return { paintGroup: 'METALLIC', finish, hex: extractHex(thuocTinhPhu) }
}

/**
 * Maps backend paint options into 3D-ready paint colours.
 */
export function mapTuyChonToPaintColors(items: TuyChon[]): PaintColor[] {
    return activeOptions(items).map((item) => {
        const { paintGroup, finish, hex: parsedHex } = parsePaintAttribute(item.thuocTinhPhu)
        const material = FINISH_MATERIAL[finish]

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            category: 'sportiva',
            hex: parsedHex ?? resolvePaintHex(item.tenTuyChon, item.thuocTinhPhu),
            finish,
            paintGroup,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
            description: `${item.tenTuyChon} — Lamborghini factory paint option.`,
            roughness: material.roughness,
            metalness: material.metalness,
            clearcoat: material.clearcoat,
        }
    })
}

/** Rim size shown when the attribute does not carry one. */
const DEFAULT_RIM_SIZE = '20" Front / 21" Rear'

/**
 * Rim colours per finish, matched against the finish text in order.
 * Values follow the static RIMS catalogue so API and fallback rims look alike.
 */
const RIM_FINISH_COLORS: Array<{ keyword: string; hex: string; spokeColor: string }> = [
    { keyword: 'diamond', hex: '#C0C2C7', spokeColor: '#1F2024' },
    { keyword: 'bronze', hex: '#967849', spokeColor: '#A68755' },
    { keyword: 'shiny', hex: '#141416', spokeColor: '#1C1D21' },
    { keyword: 'gloss', hex: '#111215', spokeColor: '#17181C' },
]
const DEFAULT_RIM_COLORS = { hex: '#111215', spokeColor: '#17181C' }

/** Capitalises each word: `gloss black` -> `Gloss Black`. */
function toTitleCase(value: string): string {
    return value.replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
}

/**
 * Splits a rim attribute such as `Shiny Black · 20"/21"` into finish and size.
 * A bare finish (`gloss black`) keeps the default size.
 */
function parseRimAttribute(thuocTinhPhu: string | null): { finish: string; size: string } {
    const [finishPart = '', sizePart = ''] = (thuocTinhPhu ?? '').split('·').map((part) => part.trim())
    return {
        finish: finishPart ? toTitleCase(finishPart) : 'Gloss Black',
        size: sizePart || DEFAULT_RIM_SIZE,
    }
}

/**
 * Maps backend wheel options into 3D-ready rim options. The 3D rim shape is
 * picked from the option name in StudioScene; colours come from the finish.
 */
export function mapTuyChonToRims(items: TuyChon[]): RimOption[] {
    return activeOptions(items).map((item) => {
        const { finish, size } = parseRimAttribute(item.thuocTinhPhu)
        const finishKey = finish.toLowerCase()
        const palette = RIM_FINISH_COLORS.find((entry) => finishKey.includes(entry.keyword)) ?? DEFAULT_RIM_COLORS

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            size,
            finish,
            hex: extractHex(item.thuocTinhPhu) ?? palette.hex,
            spokeColor: palette.spokeColor,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
        }
    })
}

/**
 * Maps backend interior options into 3D-ready interior trims.
 */
/**
 * Main cabin colour by keyword in the option name (Italian and Vietnamese colour
 * words). Checked in order; the first match wins.
 */
const INTERIOR_COLOR_KEYWORDS: Array<{ keywords: string[]; hex: string }> = [
    { keywords: ['arancio', 'cam', 'orange'], hex: '#C2561D' },
    { keywords: ['marrone', 'nâu', 'brown', 'elpis'], hex: '#5A3A28' },
    { keywords: ['rosso', 'đỏ', 'red'], hex: '#8E1B1B' },
    { keywords: ['bianco', 'trắng', 'white'], hex: '#D8D4CC' },
    { keywords: ['giallo', 'vàng', 'yellow'], hex: '#C99A1E' },
    { keywords: ['verde', 'xanh lá', 'green'], hex: '#3E5B3C' },
    { keywords: ['blu', 'xanh dương', 'blue'], hex: '#1F3550' },
    { keywords: ['nero', 'đen', 'black'], hex: '#141414' },
]
const DEFAULT_INTERIOR_HEX = '#1A1A1A'

/** Dark colours get a slightly lighter accent; coloured cabins get black accents. */
function interiorAccentFor(primaryHex: string): string {
    const value = parseInt(primaryHex.slice(1), 16)
    const luma = 0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255)
    return luma < 40 ? '#2B2B2B' : '#151515'
}

/**
 * Maps backend interior options into 3D-ready interior trims. The main colour
 * comes from a `#RRGGBB` in `thuoc_tinh_phu` when present, otherwise from the
 * colour word in the option name (e.g. `Alcantara cam` -> orange).
 */
export function mapTuyChonToInteriorTrims(items: TuyChon[]): InteriorTrim[] {
    return activeOptions(items).map((item) => {
        const name = item.tenTuyChon.toLowerCase()
        const isAlcantaraCam = name.includes('alcantara') && name.includes('cam')
        const isDaNeroAde = name.includes('nero') && name.includes('ade')

        const stitchingHex = isAlcantaraCam ? '#ff6600' : isDaNeroAde ? '#ffcc00' : DEFAULT_PAINT_HEX
        const primaryLeatherHex =
            extractHex(item.thuocTinhPhu) ??
            INTERIOR_COLOR_KEYWORDS.find((entry) => entry.keywords.some((word) => name.includes(word)))?.hex ??
            DEFAULT_INTERIOR_HEX

        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            primaryLeatherHex,
            secondaryLeatherHex: interiorAccentFor(primaryLeatherHex),
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
        return {
            id: String(item.maTuyChon),
            name: item.tenTuyChon,
            hex: extractHex(item.thuocTinhPhu) ?? DEFAULT_CALIPER_HEX,
            priceUSD: toUSD(item.giaCongThem),
            priceVND: item.giaCongThem,
        }
    })
}

/**
 * Maps backend tyre options (group 6). The 3D tyre variant is picked from the
 * option name in StudioScene, the same way rims are.
 */
export function mapTuyChonToTires(items: TuyChon[]): TireOption[] {
    return activeOptions(items).map((item) => ({
        id: String(item.maTuyChon),
        name: item.tenTuyChon,
        finish: item.thuocTinhPhu ? toTitleCase(item.thuocTinhPhu) : '',
        priceUSD: toUSD(item.giaCongThem),
        priceVND: item.giaCongThem,
    }))
}
