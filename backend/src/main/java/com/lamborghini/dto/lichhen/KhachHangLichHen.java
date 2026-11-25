package com.lamborghini.dto.lichhen;

import java.time.LocalDateTime;

public record KhachHangLichHen(
        String hoTenLienHe,
        String emailLienHe,
        String sdtLienHe,
        String tenXe,
        LocalDateTime thoiGianHen
) {
}
