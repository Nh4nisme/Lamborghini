package com.lamborghini.dto.request;

public record RegisterRequest(
        String ho,
        String ten,
        String email,
        String sdt,
        String quocGia,
        String matKhau,
        String xacNhanMatKhau,
        String emailVerificationToken
) {

}
