package com.lamborghini.dto.lichhen.response;

import java.time.LocalDateTime;

public record AppointmentDetailDTO(
        Integer maLichHen,
        String maYeuCau,
        String trangThai,
        LocalDateTime ngayTiepNhan,
        String tenKhachHang,
        String soDienThoai,
        String email,
        String tieuDe,
        LocalDateTime ngayHen,
        String khungGio,
        String showroom,
        String cauHinh,
        String loiNhanKhachHang,
        String ghiChuNoiBo,
        String tenDealer,
        Integer maDealer
) {
}
