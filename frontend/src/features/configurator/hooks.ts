import { useQuery } from '@tanstack/react-query'
import {
    getDanhSachMauCuaXeTheoLoaiMau,
    getDanhSachTuyChonCuaXeTheoMaNhom,
    getXeTheoId,
    getConfigurationByShareCode,
} from './api'
import { FALLBACK_COLORS } from './constants'

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

export function useTuyChonTheoNhom(maXe: number, maNhomTuyChon: number) {
    return useQuery({
        queryKey: ['configurator-options', maXe, maNhomTuyChon],
        queryFn: async () => {
            const data = await getDanhSachTuyChonCuaXeTheoMaNhom(maXe, maNhomTuyChon)
            return data && data.length > 0 ? data : []
        },
        enabled: !!maXe && maXe > 0 && !!maNhomTuyChon,
    })
}

export function useSharedConfiguration(maChiaSe: string | null) {
    return useQuery({
        queryKey: ['shared-configuration', maChiaSe],
        queryFn: () => getConfigurationByShareCode(maChiaSe!),
        enabled: !!maChiaSe && maChiaSe.trim().length > 0,
        retry: false,
    })
}
