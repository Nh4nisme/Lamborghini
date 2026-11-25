/**
 * Catalog 3D models Lamborghini trong `frontend/public/models`.
 *
 * Mỗi xe ánh xạ tới một file `.glb` duy nhất, dùng cho 3D Studio của configurator.
 * Ánh xạ cố định theo `carId` (maXe của backend): 1 = Revuelto, 2 = Temerario,
 * 3 = Huracan, 4 = Urus.
 */

export type CarModelSlug = 'revuelto' | 'temerario' | 'huracan' | 'urus';

export interface Car3DModel {
    /** maXe của backend (1..4) */
    carId: number;
    /** slug chuẩn dùng để tra cứu */
    slug: CarModelSlug;
    /** tên xe ngắn, ví dụ 'Revuelto' */
    name: string;
    /** tên hiển thị đầy đủ, ví dụ 'Lamborghini Revuelto' */
    displayName: string;
    /** tên file trong `public/models` */
    fileName: string;
    /** đường dẫn phục vụ tĩnh của file `.glb` */
    modelUrl: string;
}

interface ModelSeed {
    carId: number;
    slug: CarModelSlug;
    name: string;
    displayName: string;
    fileName: string;
    /** các tên khác được chấp nhận khi tra cứu bằng tên/slug */
    aliases: string[];
}

const MODEL_SEEDS: ModelSeed[] = [
    {
        carId: 1,
        slug: 'revuelto',
        name: 'Revuelto',
        displayName: 'Lamborghini Revuelto',
        fileName: 'revuelto_30tm-v8.glb',
        aliases: ['revuelto', 'lamborghini revuelto', 'revuelto hpev'],
    },
    {
        carId: 2,
        slug: 'temerario',
        name: 'Temerario',
        displayName: 'Lamborghini Temerario',
        fileName: 'lamborghini_sc18_draco.glb',
        aliases: ['temerario', 'lamborghini temerario', 'sc18', 'sc18 draco', 'draco'],
    },
    {
        carId: 3,
        slug: 'huracan',
        name: 'Huracan',
        displayName: 'Lamborghini Huracan',
        fileName: 'huracan_eagletm-v1.glb',
        aliases: ['huracan', 'huracan st', 'huracan sto', 'huracan performante', 'lamborghini huracan', 'eagletm'],
    },
    {
        carId: 4,
        slug: 'urus',
        name: 'Urus',
        displayName: 'Lamborghini Urus',
        fileName: 'urus_absoluttm-v5.glb',
        aliases: ['urus', 'urus se', 'lamborghini urus', 'absolut'],
    },
];

/** Ánh xạ slug -> model 3D */
export const MODEL_CATALOG: Record<CarModelSlug, Car3DModel> = MODEL_SEEDS.reduce(
    (acc, seed) => {
        acc[seed.slug] = {
            carId: seed.carId,
            slug: seed.slug,
            name: seed.name,
            displayName: seed.displayName,
            fileName: seed.fileName,
            modelUrl: `/models/${seed.fileName}`,
        };
        return acc;
    },
    {} as Record<CarModelSlug, Car3DModel>
);

/** Model dùng khi không tra cứu được: Revuelto */
export const DEFAULT_MODEL_SLUG: CarModelSlug = 'revuelto';

export const DEFAULT_CAR_MODEL: Car3DModel = MODEL_CATALOG[DEFAULT_MODEL_SLUG];

/** Danh sách tất cả model 3D, sắp xếp theo carId */
export function listCarModels(): Car3DModel[] {
    return Object.values(MODEL_CATALOG).sort((a, b) => a.carId - b.carId);
}

/**
 * Chuẩn hóa chuỗi tra cứu: bỏ dấu, lowercase, gộp khoảng trắng.
 * 'Lamborghini Huracán' -> 'lamborghini huracan'
 */
function normalizeKey(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

/** Tra cứu chặt theo carId (1..4), trả về undefined nếu id không hợp lệ */
export function findCarModelById(carId: number): Car3DModel | undefined {
    return listCarModels().find((model) => model.carId === carId);
}

/** Tra cứu chặt theo slug, trả về undefined nếu không khớp */
export function findCarModelBySlug(slug: string): Car3DModel | undefined {
    const key = normalizeKey(slug);
    return listCarModels().find((model) => model.slug === key);
}

/**
 * Tra cứu chặt theo tên/slug (không phân biệt hoa thường và dấu).
 * Hỗ trợ cả tên đầy đủ, slug, tên file `.glb` và các biến thể (Urús SE, SC18 Draco...).
 */
export function findCarModelByName(name: string): Car3DModel | undefined {
    const key = normalizeKey(name);
    if (!key) return undefined;

    const models = listCarModels();

    for (const model of models) {
        const seed = MODEL_SEEDS.find((item) => item.slug === model.slug);
        if (!seed) continue;

        const candidates = [model.slug, model.name, model.displayName, ...seed.aliases];
        if (candidates.some((candidate) => normalizeKey(candidate) === key)) {
            return model;
        }
    }

    // Khớp một phần: tên file `.glb` hoặc tên xe kèm hậu tố
    for (const model of models) {
        const seed = MODEL_SEEDS.find((item) => item.slug === model.slug);
        if (!seed) continue;

        const candidates = [model.fileName, ...seed.aliases];
        if (candidates.some((candidate) => key.includes(normalizeKey(candidate)))) {
            return model;
        }
    }

    return undefined;
}

/**
 * Tra cứu model 3D theo carId hoặc slug/tên.
 * Không tìm thấy thì trả về Revuelto (fallback).
 */
export function getCarModel(input?: number | string | null): Car3DModel {
    if (typeof input === 'number' && Number.isFinite(input)) {
        return findCarModelById(input) ?? DEFAULT_CAR_MODEL;
    }

    if (typeof input === 'string') {
        const trimmed = input.trim();
        if (!trimmed) return DEFAULT_CAR_MODEL;

        const asId = Number(trimmed);
        if (Number.isInteger(asId) && String(asId) === trimmed) {
            return findCarModelById(asId) ?? DEFAULT_CAR_MODEL;
        }

        return findCarModelBySlug(trimmed) ?? findCarModelByName(trimmed) ?? DEFAULT_CAR_MODEL;
    }

    return DEFAULT_CAR_MODEL;
}

/** Lấy đường dẫn file `.glb` theo carId hoặc slug/tên (fallback Revuelto) */
export function getCarModelUrl(input?: number | string | null): string {
    return getCarModel(input).modelUrl;
}
