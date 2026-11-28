package com.lamborghini.dto.cauhinh.reponse;

import java.util.List;

public record ChiTietChiaSeResponse(
    Integer maCauHinh,
    String tenCauHinh,
    Long tongGia,
    String maChiaSe,
    Integer maXe,
    List<Integer> danhSachMaTuyChon
) {}
