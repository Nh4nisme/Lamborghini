import type {
    CarConfiguration,
    PaintColor,
    RimOption,
    InteriorTrim,
    CaliperOption,
    TireOption,
} from '../types'
import {
    PAINT_COLORS,
    RIMS,
    CALIPERS,
    INTERIOR_TRIMS,
} from '../data/lamborghiniData'

/** Maps a database car ID (`ma_xe`) to its 3D GLB studio model. */
export function getModelForCarId(id: number): { url: string; name: string } {
    switch (id) {
        case 1: // Revuelto
            return {
                url: '/models/lamborghini_revuelto-v1.glb',
                name: 'Lamborghini Revuelto (3D Studio)',
            }
        case 2: // Temerario
            return {
                url: '/models/lamborghini_sc18_draco.glb',
                name: 'Lamborghini Temerario (3D Studio)',
            }
        case 3: // Huracan
            return {
                url: '/models/2019_lamborghini_huracan-v3.glb',
                name: 'Lamborghini Huracan (3D Studio)',
            }
        case 4: // Urus
            return {
                url: '/models/2023_lamborghini_urus_performante-v2.glb',
                name: 'Lamborghini Urus (3D Studio)',
            }
        default:
            return {
                url: '/models/lamborghini_revuelto-v1.glb',
                name: 'Lamborghini Revuelto (3D Studio)',
            }
    }
}

/** Creates the baseline CarConfiguration for a given car ID. */
export function createDefaultConfig(carId: number): CarConfiguration {
    const modelData = getModelForCarId(carId)
    return {
        model: 'Revuelto HPEV',
        exteriorColor: PAINT_COLORS[0],
        rim: RIMS[0],
        caliper: CALIPERS[0],
        tire: null,
        carbonLower: 'body',
        carbonUpper: 'body',
        exhaust: 'matt_black',
        spoilerPosition: 'retracted',
        doorsOpen: false,
        lightsOn: true,
        engineStarted: false,
        interiorTrim: INTERIOR_TRIMS[0],
        contrastStitchingHex: '#ffcc00',
        carbonInterior: false,
        environment: 'envstudionewnight',
        currency: 'VND',
        language: 'VIE',
        loungeMode: false,
        activeTab: 'colors',
        viewMode: 'exterior',
        customModelUrl: modelData.url,
        customModelName: modelData.name,
    }
}

export interface ConfigOptionPools {
    paints: PaintColor[]
    rims: RimOption[]
    interiors: InteriorTrim[]
    calipers: CaliperOption[]
    tires: TireOption[]
}

/**
 * Applies a list of database `maTuyChon` IDs (from an imported share code)
 * onto a base `CarConfiguration`, matching each ID against the loaded option pools.
 */
export function applySharedOptionsToConfig(
    base: CarConfiguration,
    optionIds: number[],
    pools: ConfigOptionPools
): CarConfiguration {
    if (!optionIds || optionIds.length === 0) return base

    const idSet = new Set(optionIds.map((id) => String(id)))
    const next = { ...base }

    const matchedPaint = pools.paints.find((p) => idSet.has(p.id))
    if (matchedPaint) next.exteriorColor = matchedPaint

    const matchedRim = pools.rims.find((r) => idSet.has(r.id))
    if (matchedRim) next.rim = matchedRim

    const matchedInterior = pools.interiors.find((t) => idSet.has(t.id))
    if (matchedInterior) next.interiorTrim = matchedInterior

    const matchedCaliper = pools.calipers.find((c) => idSet.has(c.id))
    if (matchedCaliper) next.caliper = matchedCaliper

    const matchedTire = pools.tires.find((t) => idSet.has(t.id))
    if (matchedTire) {
        next.tire = matchedTire
    } else if (pools.tires.length === 0) {
        next.tire = null
    }

    return next
}
