package com.lamborghini.dto.response;

import java.time.LocalDateTime;

public record DealerAppointmentListDTO(
        Integer maLichHen,
        String maYeuCau,
        String tenKhachHang,
        String tieuDe,
        LocalDateTime ngayHen,
        String gioBatDau,
        String trangThai
) {
}
