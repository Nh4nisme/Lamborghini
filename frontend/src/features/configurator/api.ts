import { http } from '../../api/http'
import type { TuyChon, XeConfigurator, SaveConfigRequest, SaveConfigResponse, SendShareEmailRequest, SavedConfigurationDTO, SharedConfigurationDetail } from './types'

function getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('accessToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

// UC004.2: Lấy danh sách màu của xe theo loại màu (@GetMapping("/{maXe}/color"))
export const getDanhSachMauCuaXeTheoLoaiMau = (maXe: number, loaiMau: string): Promise<TuyChon[]> =>
    http<TuyChon[]>(`/configuration/${maXe}/color?loaiMau=${encodeURIComponent(loaiMau)}`)

// UC004: Lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn (@GetMapping("/{maXe}/options"))
export const getDanhSachTuyChonCuaXeTheoMaNhom = (maXe: number, maNhomTuyChon: number): Promise<TuyChon[]> =>
    http<TuyChon[]>(`/configuration/${maXe}/options?maNhomTuyChon=${maNhomTuyChon}`)

// UC003: Lấy thông tin xe theo id (@GetMapping("/{maXe}"))
export const getXeTheoId = (maXe: number): Promise<XeConfigurator> =>
    http<XeConfigurator>(`/configuration/${maXe}`)

export const saveConfiguration = (req: SaveConfigRequest): Promise<SaveConfigResponse> =>
    http<SaveConfigResponse>('/configuration/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(req),
    })

export const sendShareEmail = (req: SendShareEmailRequest): Promise<{ message: string }> =>
    http<{ message: string }>('/configuration/send-share-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
    })

export const getMyConfigurations = (): Promise<SavedConfigurationDTO[]> =>
    http<SavedConfigurationDTO[]>('/configuration/my', {
        headers: getAuthHeader(),
    })

export const getConfigurationByShareCode = (maChiaSe: string): Promise<SharedConfigurationDetail> =>
    http<SharedConfigurationDetail>(`/configuration/share/${encodeURIComponent(maChiaSe.trim())}`)
