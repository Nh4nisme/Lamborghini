package com.lamborghini.dto.lichhen.request;

import com.lamborghini.enums.LoaiLichHen;

import java.time.LocalDateTime;

public record AppointmentRequest(
        LoaiLichHen loaiLichHen,
        String hoTenLienHe,
        String sdtLienHe,
        String emailLienHe,
        Integer maShowroom,
        Integer maXe,
        LocalDateTime thoiGianHen,
        String ghiChu
        ) {
}
