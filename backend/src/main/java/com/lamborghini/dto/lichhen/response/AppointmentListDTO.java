package com.lamborghini.dto.lichhen.response;

import java.time.LocalDateTime;

public record AppointmentListDTO(
        Integer maLichHen,
        String maYeuCau,
        String tieuDe,
        LocalDateTime ngayHen,
        String gioBatDau,
        String gioKetThuc,
        String trangThai,
        String tenShowroom,
        String tenDealer
) {
}
