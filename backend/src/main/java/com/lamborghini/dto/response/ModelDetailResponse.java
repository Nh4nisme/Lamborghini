package com.lamborghini.dto.response;



import com.lamborghini.entity.PhuTungCoBan;
import com.lamborghini.entity.Xe;

import java.util.List;

public record ModelDetailResponse(
        Xe xe,
        List<PhuTungCoBan> danhSachPhuTung
) {

}
