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

// Adapter để convert từ API response sang format UI cần
export function adaptShowroomToUI(apiShowroom: Showroom) {
    return {
        id: `showroom-${apiShowroom.maShowroom}`,
        code: apiShowroom.maShowroom.toString(),
        name: apiShowroom.tenShowroom,
        city: apiShowroom.khuVuc,
        country: 'Vietnam',
        region: apiShowroom.khuVuc,
        address: apiShowroom.diaChi,
        phone: apiShowroom.soDienThoai,
        email: '', // API không có
        hours: `${apiShowroom.gioMoCua} - ${apiShowroom.gioDongCua}`,
        description: `Official Lamborghini Showroom - ${apiShowroom.khuVuc}`,
        services: 'Showroom · Service · Ad Personam Personalization',
        category: 'showroom' as const,
        lat: 0, // API không có coordinates
        lng: 0,
        mapCoords: { x: 50, y: 50 },
        trangThai: apiShowroom.trangThai,
    }
}
