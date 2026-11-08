package com.lamborghini.dto.response;

import java.time.LocalDateTime;

public record EmailXacNhan(String email, String hoTen, String maYeuCau, String loaiLichHen, String tenShowroom, String tenXe, LocalDateTime ngayHen) {
}
