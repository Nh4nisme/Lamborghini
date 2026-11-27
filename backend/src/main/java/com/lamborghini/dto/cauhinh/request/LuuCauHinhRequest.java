package com.lamborghini.dto.cauhinh.request;

import java.time.LocalDateTime;
import java.util.List;

public record LuuCauHinhRequest(
        Integer maXe,
        String tenCauHinh,
        Long tongGia,
        List<Integer> danhSachMaTuyChon
) {

}
