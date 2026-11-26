package com.lamborghini.dto.dangky.request;

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
