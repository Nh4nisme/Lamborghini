package com.lamborghini.dto.profile.request;

public record ChangePasswordRequest(
        String matKhauHienTai,
        String matKhauMoi,
        String xacNhanMatKhauMoi
) {
}
