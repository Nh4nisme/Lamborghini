import type { CarModelData } from './data'
import { getModelFolder } from './data'

// Response từ API /model/getAllDongXe (for navbar listing)
export interface DongXe {
    maDongXe: number
    tenDongXe: string
    danhMuc: string
    moTa: string
    trangThai: string
    noiBat: boolean
    hinhAnh: string
}

// Response từ API /model/{id}/modeldetail
export interface XeDetail {
    maXe: number
    tenPhienBan: string
    giaKhoiDiem: number
    dongCo: string
    congSuat: number
    tocDoToiDa: number
    hinhAnh: string
    moTa: string
    trangThai: string
    giaToc: number  // x10 = seconds (25 = 2.5s)
    tocDoDongCo: number
    phanKhoi: number
}

export interface PhuTung {
    maPhuTung: number
    tenPhuTung: string
    moTa: string
}

export interface ModelDetailResponse {
    xe: XeDetail
    danhSachPhuTung: PhuTung[]
}

// Adapter function
export function adaptModelDetailToCarData(response: ModelDetailResponse, defaultData: CarModelData): CarModelData {
    const { xe, danhSachPhuTung } = response
    
    // Helper: Tìm phụ tùng theo tên
    const findPhuTung = (names: string[]) => {
        return danhSachPhuTung.find(pt => 
            names.some(name => pt.tenPhuTung.toLowerCase().includes(name.toLowerCase()))
        )
    }
    
    // Tìm các sections từ danhSachPhuTung
    const powertrain = findPhuTung(['Powertrain', 'Động cơ'])
    const exterior = findPhuTung(['Exterior', 'Ngoại thất'])
    const interior = findPhuTung(['Interior', 'Nội thất'])
    const engineSound = findPhuTung(['Engine Sound', 'Âm thanh'])

    // 2 Technology Cards của phần 01 / POWERTRAIN:
    // Là 2 phụ tùng còn lại trong danhSachPhuTung (loại trừ Powertrain, Exterior, Interior, Engine Sound)
    const techCardsPhuTung = danhSachPhuTung.filter(pt => 
        pt !== powertrain && pt !== exterior && pt !== interior && pt !== engineSound
    )

    const card1 = techCardsPhuTung[0]
    const card2 = techCardsPhuTung[1]
    
    const folder = getModelFolder(xe.tenPhienBan)

    return {
        ...defaultData, // Giữ nguyên form mẫu
        
        // Override với data từ API
        id: `xe-${xe.maXe}`,
        name: xe.tenPhienBan.toUpperCase(),
        tagline: xe.dongCo.toUpperCase(),
        proposition: xe.dongCo,
        introduction: xe.moTa,
        heroHeadline: xe.tenPhienBan.toUpperCase(),
        heroImage: `/Images/model-detail/${folder}/exterior.webp`,
        
        // Stats từ API
        stats: {
            combinedPower: { 
                value: xe.congSuat.toString(), 
                unit: 'CV',
                label: 'Combined Power'
            },
            acceleration: { 
                value: (xe.giaToc / 10).toFixed(1), 
                unit: 's',
                label: '0-100 km/h'
            },
            topSpeed: { 
                value: xe.tocDoToiDa.toString(), 
                unit: 'km/h',
                label: 'Top Speed'
            },
            engineSpeed: { 
                value: xe.tocDoDongCo.toString(), 
                unit: 'rpm',
                label: 'Max RPM'
            }
        },
        
        // Powertrain section
        powertrain: {
            headline: powertrain?.tenPhuTung || 'PURE PERFORMANCE',
            story: powertrain?.moTa || defaultData.powertrain.story,
            image: `/Images/model-detail/${folder}/exterior.webp`,
            displacement: xe.phanKhoi.toLocaleString() + ' cm³',
            turbos: xe.dongCo.includes('twin-turbo') ? 'Twin-Turbo' : 'Naturally Aspirated',
            electricMotors: xe.dongCo.includes('mô-tơ điện') || xe.dongCo.includes('PHEV') ? '3 Electric Motors' : '-',
            transmission: xe.dongCo
        },
        
        // Engineering sections (2 Technology Cards thuộc 01 / POWERTRAIN)
        engineering: {
            ldvi: {
                title: card1?.tenPhuTung || 'TECHNOLOGY',
                headline: card1?.tenPhuTung || 'INTEGRATED VEHICLE DYNAMICS',
                description: card1?.moTa || defaultData.engineering.ldvi.description
            },
            spaceframe: {
                title: card2?.tenPhuTung || 'STRUCTURE',
                headline: card2?.tenPhuTung || 'CHASSIS & SPACEFRAME',
                description: card2?.moTa || defaultData.engineering.spaceframe.description
            },
            technologyCards: techCardsPhuTung.map((pt, idx) => ({
                title: pt.tenPhuTung,
                description: pt.moTa,
                tag: idx === 0 ? '02 / TECHNOLOGY' : '03 / STRUCTURE'
            }))
        },
        
        // Aerodynamics section
        aerodynamics: {
            ...defaultData.aerodynamics,
            headline: exterior?.tenPhuTung || 'AERODYNAMIC EXCELLENCE',
            story: exterior?.moTa || defaultData.aerodynamics.story,
            image: `/Images/model-detail/${folder}/exterior.webp`
        },
        
        // Sound Study section
        soundStudy: {
            ...defaultData.soundStudy,
            title: engineSound?.tenPhuTung || 'ENGINE SOUND',
            description: engineSound?.moTa || defaultData.soundStudy.description,
            image: `/Images/model-detail/${folder}/exterior.webp`
        },
        
        // Interior section
        interior: {
            ...defaultData.interior,
            headline: interior?.tenPhuTung || 'THE DRIVER. AT THE CENTER.',
            story: interior?.moTa || defaultData.interior.story,
            image: `/Images/model-detail/${folder}/interior.webp`
        },
        
        // Gallery - update images
        gallery: [
            {
                ...defaultData.gallery[0],
                title: xe.tenPhienBan.toUpperCase(),
                subtitle: xe.dongCo,
                image: `/Images/model-detail/${folder}/exterior.webp`
            },
            {
                ...defaultData.gallery[1],
                image: `/Images/model-detail/${folder}/interior.webp`
            },
            {
                ...defaultData.gallery[2],
                image: `/Images/model-detail/${folder}/powertrain.mp4`
            },
            ...(defaultData.gallery.slice(3) || [])
        ],
        
        rearImage: `/Images/model-detail/${folder}/exterior.webp`,
        
        // Technical Specifications - CÓ GÌ LẤY NẤY
        specifications: [
            {
                parameter: 'Powertrain',
                value: xe.dongCo,
                unit: '—',
                context: 'Hybrid electric powertrain',
                category: 'engine' as const
            },
            {
                parameter: 'Combined power',
                value: xe.congSuat.toString(),
                unit: 'CV / kW',
                context: 'Maximum combined output',
                category: 'performance' as const
            },
            {
                parameter: 'Acceleration',
                value: (xe.giaToc / 10).toFixed(1),
                unit: 's',
                context: '0-100 km/h',
                category: 'performance' as const
            },
            {
                parameter: 'Top speed',
                value: xe.tocDoToiDa.toString(),
                unit: 'km/h',
                context: 'Manufacturer reference',
                category: 'performance' as const
            },
            {
                parameter: 'Displacement',
                value: xe.phanKhoi.toLocaleString(),
                unit: 'cm³',
                context: xe.dongCo,
                category: 'engine' as const
            },
            {
                parameter: 'Engine speed',
                value: xe.tocDoDongCo.toLocaleString(),
                unit: 'rpm',
                context: 'Maximum engine speed',
                category: 'engine' as const
            }
        ],
        
        // Ad Personam - giữ nguyên default
        adPersonam: defaultData.adPersonam
    }
}
