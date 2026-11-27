import { http } from '../../../../api/http'

interface ChangePasswordRequest {
    matKhauHienTai: string
    matKhauMoi: string
    xacNhanMatKhauMoi: string
}

export const securityApi = {
    changePassword: (payload: ChangePasswordRequest) =>
        http('/profile/password', {
            method: 'PUT',
            body: JSON.stringify(payload),
        }),
}
