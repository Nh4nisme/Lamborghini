import { useQuery } from '@tanstack/react-query'
import {
    getDanhSachMauCuaXeTheoLoaiMau,
    getDanhSachTuyChonCuaXeTheoMaNhom,
    getXeTheoId,
} from './api'
import { FALLBACK_COLORS, FALLBACK_WHEELS, FALLBACK_TIRES } from './constants'

// Hook lấy thông tin xe
export function useXeConfigurator(maXe: number) {
    return useQuery({
        queryKey: ['configurator-car', maXe],
        queryFn: () => getXeTheoId(maXe),
        enabled: !!maXe && maXe > 0,
        placeholderData: {
            maXe,
            tenPhienBan: 'Revuelto',
            giaKhoiDiem: 60000000000,
            dongCo: 'V12 HPEV',
            congSuat: 1015,
            tocDoToiDa: 350,
            hinhAnh: '/Images/homepage/Revuelto.png',
        },
    })
}

// Hook lấy danh sách màu của xe theo loại màu (Metallic, Solid, Matt)
export function useMauCuaXeTheoLoai(maXe: number, loaiMau: string) {
    return useQuery({
        queryKey: ['configurator-colors', maXe, loaiMau],
        queryFn: async () => {
            try {
                const data = await getDanhSachMauCuaXeTheoLoaiMau(maXe, loaiMau)
                return data && data.length > 0 ? data : (FALLBACK_COLORS[loaiMau] ?? [])
            } catch {
                return FALLBACK_COLORS[loaiMau] ?? []
            }
        },
        enabled: !!maXe && maXe > 0 && !!loaiMau,
        placeholderData: FALLBACK_COLORS[loaiMau] ?? [],
    })
}

// Hook lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn (2 = Mâm xe, 6 = Lốp xe)
export function useTuyChonTheoNhom(maXe: number, maNhomTuyChon: number) {
    return useQuery({
        queryKey: ['configurator-options', maXe, maNhomTuyChon],
        queryFn: async () => {
            try {
                const data = await getDanhSachTuyChonCuaXeTheoMaNhom(maXe, maNhomTuyChon)
                if (data && data.length > 0) return data
                if (maNhomTuyChon === 2) return FALLBACK_WHEELS
                if (maNhomTuyChon === 6) return FALLBACK_TIRES
                return []
            } catch {
                if (maNhomTuyChon === 2) return FALLBACK_WHEELS
                if (maNhomTuyChon === 6) return FALLBACK_TIRES
                return []
            }
        },
        enabled: !!maXe && maXe > 0 && !!maNhomTuyChon,
        placeholderData: maNhomTuyChon === 2 ? FALLBACK_WHEELS : (maNhomTuyChon === 6 ? FALLBACK_TIRES : []),
    })
}
