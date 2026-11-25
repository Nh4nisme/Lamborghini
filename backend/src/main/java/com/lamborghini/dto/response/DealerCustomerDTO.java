package com.lamborghini.dto.response;

import java.time.LocalDateTime;

public record DealerCustomerDTO(
        Integer maKhachHang,
        String maHoSo,
        String hoTen,
        String email,
        String soDienThoai,
        String dongXeQuanTam,
        LocalDateTime lanGanNhat
) {
}
