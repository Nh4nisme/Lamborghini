import { http } from '../../../../api/http'
import type { CustomerProfileDTO } from './types'

interface TaiKhoanResponse {
    maTaiKhoan: number
    hoTen: string
    email: string
    sdt: string
    vaiTro: string
    trangThai: string
    ngayTao: string
}

function getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    return token ? { Authorization: `Bearer ${token}` } : {}
}

function getLoggedInUserId(): number | null {
    if (typeof window === 'undefined') return null
    try {
        const rawUser = localStorage.getItem('user')
        if (rawUser) {
            const parsed = JSON.parse(rawUser) as { maTK?: number; maTaiKhoan?: number }
            const id = parsed.maTK ?? parsed.maTaiKhoan
            if (typeof id === 'number' && Number.isFinite(id)) return id
        }
        const token = localStorage.getItem('accessToken')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1])) as { sub?: string }
            const subId = payload.sub ? parseInt(payload.sub, 10) : NaN
            if (Number.isFinite(subId)) return subId
        }
    } catch {
        // Bỏ qua nếu JSON/JWT không hợp lệ
    }
    return null
}

export const profileApi = {
    getProfile: async () => {
        const userId = getLoggedInUserId()
        if (!userId) {
            throw new Error('Vui lòng đăng nhập để xem thông tin cá nhân')
        }
        const response = await http<TaiKhoanResponse>(`/profile?id=${userId}`, {
            headers: getAuthHeaders(),
        })
        const [ho, ...tenParts] = response.hoTen.split(' ')
        return {
            maKhachHang: response.maTaiKhoan,
            ho: ho || '',
            ten: tenParts.join(' ') || '',
            email: response.email,
            soDienThoai: response.sdt,
            nhanThongTinTiepThi: false,
        } as CustomerProfileDTO
    },

    updateProfile: (payload: CustomerProfileDTO) =>
        http<TaiKhoanResponse>(`/profile?id=${payload.maKhachHang}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                hoTen: `${payload.ho} ${payload.ten}`.trim(),
                sdt: payload.soDienThoai,
            }),
        }),
}
