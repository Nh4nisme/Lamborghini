package com.lamborghini.dto.response;

import com.lamborghini.enums.TrangThaiTaiKhoan;
import com.lamborghini.enums.VaiTro;

import java.time.LocalDateTime;

public record TaiKhoanResponse(
        Integer maTaiKhoan,
        String hoTen,
        String email,
        String sdt,
        VaiTro vaiTro,
        TrangThaiTaiKhoan trangThai,
        LocalDateTime ngayTao
) {
}
