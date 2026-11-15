import type { ShowroomStudy } from './data'

export interface Showroom {
    maShowroom: number
    tenShowroom: string
    diaChi: string
    khuVuc: string
    gioMoCua: string
    gioDongCua: string
    soDienThoai: string
    trangThai: string
}

interface LocationDefinition {
    id: string
    city: string
    region: string
    lat: number
    lng: number
    mapCoords: { x: number; y: number }
    // Tier 1: Tên chính xác của tỉnh/thành phố (ưu tiên cao nhất)
    cityKeywords: string[]
    // Tier 2: Tên quận/huyện đặc trưng duy nhất (ưu tiên nhì)
    districtKeywords: string[]
    // Tier 3: Tên khu vực miền (fallback khi không có tên tỉnh hay quận)
    regionKeywords: string[]
}

/**
 * Danh mục chuẩn vị trí các tỉnh thành phố tại Việt Nam
 * Phân chia độ ưu tiên: Tỉnh/Thành phố -> Quận/Huyện đặc trưng -> Miền
 * Tuyệt đối không dùng tên đường (như Nguyễn Văn Linh, Trần Hưng Đạo) vì nhiều tỉnh thành đều có trùng tên đường.
 */
const VIETNAM_LOCATION_CATALOG: LocationDefinition[] = [
    {
        id: 'danang',
        city: 'Đà Nẵng',
        region: 'Miền Trung',
        lat: 16.0610,
        lng: 108.2140,
        mapCoords: { x: 62, y: 48 },
        cityKeywords: ['đà nẵng', 'da nang', 'danang', 'tp đà nẵng', 'tp. đà nẵng', 'tp.đà nẵng'],
        districtKeywords: ['hải châu', 'hai chau', 'sơn trà', 'son tra', 'ngũ hành sơn', 'ngu hanh son', 'thanh khê', 'thanh khe', 'liên chiểu', 'cẩm lệ', 'hòa vang'],
        regionKeywords: ['miền trung', 'trung bộ'],
    },
    {
        id: 'hanoi',
        city: 'Hà Nội',
        region: 'Miền Bắc',
        lat: 21.0185,
        lng: 105.7825,
        mapCoords: { x: 50, y: 18 },
        cityKeywords: ['hà nội', 'ha noi', 'hanoi', 'thủ đô', 'tp hà nội', 'tp. hà nội', 'tp.hà nội'],
        districtKeywords: ['nam từ liêm', 'bắc từ liêm', 'mễ trì', 'hoàn kiếm', 'ba đình', 'tây hồ', 'cầu giấy', 'đống đa', 'hai bà trưng', 'thanh xuân', 'hà đông'],
        regionKeywords: ['miền bắc', 'bắc bộ'],
    },
    {
        id: 'hcm',
        city: 'TP. Hồ Chí Minh',
        region: 'Miền Nam',
        lat: 10.7325,
        lng: 106.7190,
        mapCoords: { x: 48, y: 82 },
        cityKeywords: ['hồ chí minh', 'ho chi minh', 'tp.hcm', 'tp hcm', 'tphcm', 'tp. hcm', 'sài gòn', 'saigon'],
        districtKeywords: ['quận 7', 'quan 7', 'tân phong', 'quận 1', 'quan 1', 'thủ đức', 'bình thạnh', 'tân bình', 'phú nhuận', 'quận 2', 'quận 3'],
        regionKeywords: ['miền nam', 'nam bộ'],
    },
    {
        id: 'haiphong',
        city: 'Hải Phòng',
        region: 'Miền Bắc',
        lat: 20.8449,
        lng: 106.6881,
        mapCoords: { x: 55, y: 22 },
        cityKeywords: ['hải phòng', 'hai phong'],
        districtKeywords: ['lê chân', 'ngô quyền', 'hồng bàng', 'hải an', 'đồ sơn'],
        regionKeywords: [],
    },
    {
        id: 'cantho',
        city: 'Cần Thơ',
        region: 'Miền Nam',
        lat: 10.0452,
        lng: 105.7469,
        mapCoords: { x: 42, y: 88 },
        cityKeywords: ['cần thơ', 'can tho'],
        districtKeywords: ['ninh kiều', 'cái răng', 'bình thủy', 'ô môn'],
        regionKeywords: ['tây nam bộ', 'đồng bằng sông cửu long'],
    },
    {
        id: 'quangninh',
        city: 'Quảng Ninh',
        region: 'Miền Bắc',
        lat: 20.9500,
        lng: 107.0733,
        mapCoords: { x: 58, y: 19 },
        cityKeywords: ['quảng ninh', 'quang ninh', 'hạ long', 'ha long'],
        districtKeywords: ['bãi cháy', 'hòn gai', 'cẩm phả', 'uông bí'],
        regionKeywords: [],
    },
    {
        id: 'nhatrang',
        city: 'Nha Trang',
        region: 'Miền Trung',
        lat: 12.2388,
        lng: 109.1967,
        mapCoords: { x: 70, y: 72 },
        cityKeywords: ['nha trang', 'khánh hòa', 'khanh hoa'],
        districtKeywords: ['vĩnh hải', 'cam ranh'],
        regionKeywords: ['nam trung bộ'],
    },
    {
        id: 'binhduong',
        city: 'Bình Dương',
        region: 'Miền Nam',
        lat: 10.9804,
        lng: 106.6519,
        mapCoords: { x: 47, y: 80 },
        cityKeywords: ['bình dương', 'binh duong', 'thủ dầu một', 'thu dau mot'],
        districtKeywords: ['dĩ an', 'thuận an', 'bến cát'],
        regionKeywords: [],
    },
    {
        id: 'dongnai',
        city: 'Đồng Nai',
        region: 'Miền Nam',
        lat: 10.9574,
        lng: 106.8427,
        mapCoords: { x: 50, y: 81 },
        cityKeywords: ['đồng nai', 'dong nai', 'biên hòa', 'bien hoa'],
        districtKeywords: ['long thành', 'nhơn trạch'],
        regionKeywords: ['đông nam bộ'],
    },
    {
        id: 'vungtau',
        city: 'Vũng Tàu',
        region: 'Miền Nam',
        lat: 10.3460,
        lng: 107.0843,
        mapCoords: { x: 52, y: 85 },
        cityKeywords: ['vũng tàu', 'vung tau', 'bà rịa', 'ba ria'],
        districtKeywords: ['côn đảo'],
        regionKeywords: [],
    },
    {
        id: 'hue',
        city: 'Huế',
        region: 'Miền Trung',
        lat: 16.4637,
        lng: 107.5909,
        mapCoords: { x: 60, y: 45 },
        cityKeywords: ['thừa thiên huế', 'huế', 'hue'],
        districtKeywords: ['hương thủy', 'hương trà'],
        regionKeywords: [],
    },
    {
        id: 'dalat',
        city: 'Đà Lạt',
        region: 'Tây Nguyên',
        lat: 11.9404,
        lng: 108.4583,
        mapCoords: { x: 63, y: 74 },
        cityKeywords: ['đà lạt', 'da lat', 'lâm đồng', 'lam dong'],
        districtKeywords: ['bảo lộc'],
        regionKeywords: ['tây nguyên'],
    },
]

/**
 * Phân tích địa chỉ, tên showroom và khu vực để xác định tọa độ GPS và tên thành phố.
 * Thuật toán ưu tiên 3 cấp:
 * Cấp 1: Trùng tên Tỉnh / Thành phố trực tiếp trong địa chỉ hoặc tên showroom.
 * Cấp 2: Trùng tên Quận / Huyện đặc trưng (ví dụ: Hải Châu -> Đà Nẵng).
 * Cấp 3: Trùng tên Khu vực miền nếu địa chỉ không chứa tên tỉnh hoặc quận.
 */
export function resolveShowroomLocation(apiShowroom: Showroom) {
    const rawSearch = `${apiShowroom.diaChi || ''} ${apiShowroom.tenShowroom || ''} ${apiShowroom.khuVuc || ''}`.toLowerCase()

    // CẤP 1: Ưu tiên cao nhất - Khớp trực tiếp tên Thành phố / Tỉnh
    for (const loc of VIETNAM_LOCATION_CATALOG) {
        for (const kw of loc.cityKeywords) {
            if (rawSearch.includes(kw)) {
                return applyLocationWithOffset(loc, apiShowroom)
            }
        }
    }

    // CẤP 2: Khớp tên Quận / Huyện đặc trưng duy nhất
    for (const loc of VIETNAM_LOCATION_CATALOG) {
        for (const kw of loc.districtKeywords) {
            if (rawSearch.includes(kw)) {
                return applyLocationWithOffset(loc, apiShowroom)
            }
        }
    }

    // CẤP 3: Khớp theo tên miền / khu vực
    for (const loc of VIETNAM_LOCATION_CATALOG) {
        for (const kw of loc.regionKeywords) {
            if (rawSearch.includes(kw)) {
                return applyLocationWithOffset(loc, apiShowroom)
            }
        }
    }

    // Mặc định trung tâm Việt Nam (Đà Nẵng / Miền Trung) nếu hoàn toàn không nhận diện được
    const idNum = Number(apiShowroom.maShowroom) || 1
    return {
        lat: Number((16.0610 + ((idNum % 5) - 2) * 0.01).toFixed(6)),
        lng: Number((108.2140 + ((idNum % 5) - 2) * 0.01).toFixed(6)),
        city: apiShowroom.khuVuc || 'Đà Nẵng',
        region: apiShowroom.khuVuc || 'Miền Trung',
        mapCoords: { x: 62, y: 48 },
    }
}

function applyLocationWithOffset(loc: LocationDefinition, apiShowroom: Showroom) {
    // Thêm độ lệch vi mô theo maShowroom để các showroom cùng thành phố không bị ghim trùng tọa độ hoàn toàn
    const idOffset = Number(apiShowroom.maShowroom) || 0
    const jitterLat = ((idOffset * 17) % 7 - 3) * 0.0015
    const jitterLng = ((idOffset * 31) % 7 - 3) * 0.0015

    return {
        lat: Number((loc.lat + jitterLat).toFixed(6)),
        lng: Number((loc.lng + jitterLng).toFixed(6)),
        city: loc.city,
        region: loc.region || apiShowroom.khuVuc,
        mapCoords: loc.mapCoords,
    }
}

/**
 * Adapter chuyển đổi từ API Showroom sang ShowroomStudy dùng cho toàn bộ UI
 */
export function adaptShowroomToUI(apiShowroom: Showroom): ShowroomStudy {
    const loc = resolveShowroomLocation(apiShowroom)
    const codeStr = apiShowroom.maShowroom ? String(apiShowroom.maShowroom).padStart(3, '0') : '001'

    return {
        id: `showroom-${apiShowroom.maShowroom}`,
        code: `VN-${codeStr}`,
        name: apiShowroom.tenShowroom,
        city: loc.city,
        country: 'Vietnam',
        region: loc.region,
        address: apiShowroom.diaChi,
        phone: apiShowroom.soDienThoai || '',
        email: `concierge.${loc.city.toLowerCase().replace(/[^a-z0-9]/g, '')}@lamborghini.vn`,
        hours: `${apiShowroom.gioMoCua || '08:30'} - ${apiShowroom.gioDongCua || '18:00'}`,
        description: `Official Automobili Lamborghini Showroom & Aftersales Centre - ${loc.city}, Vietnam.`,
        services: 'Showroom · Ad Personam Studio · Official Service & Genuine Parts',
        category: 'showroom' as const,
        lat: loc.lat,
        lng: loc.lng,
        mapCoords: loc.mapCoords,
        officialUrl: 'https://www.lamborghini.com/en-en/dealerships',
        trangThai: apiShowroom.trangThai,
    }
}
