import type { CarModelData } from './data'

export interface DongXe {
    maDongXe: number
    tenDongXe: string
    danhMuc: string
    moTa: string
    trangThai: string
    noiBat: boolean
    hinhAnh: string
}

// Adapter để merge API data với form mẫu
export function adaptDongXeToCarData(dongXe: DongXe, defaultData: CarModelData): CarModelData {
    return {
        ...defaultData, // Giữ nguyên form mẫu (stats, powertrain, aerodynamics, etc.)
        
        // Override với data từ API
        id: `dongxe-${dongXe.maDongXe}`,
        name: dongXe.tenDongXe.toUpperCase(),
        tagline: dongXe.danhMuc.toUpperCase(),
        proposition: dongXe.danhMuc,
        introduction: dongXe.moTa,
        heroHeadline: dongXe.tenDongXe.toUpperCase(),
        heroImage: dongXe.hinhAnh,
        
        // Update gallery với ảnh từ API
        gallery: [
            {
                ...defaultData.gallery[0],
                title: dongXe.tenDongXe.toUpperCase(),
                subtitle: dongXe.danhMuc,
                image: dongXe.hinhAnh,
            },
            ...defaultData.gallery.slice(1) // Giữ các ảnh mẫu còn lại
        ]
    }
}
