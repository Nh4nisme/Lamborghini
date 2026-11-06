package com.lamborghini.dto.response;

import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.TinTuc;

import java.util.List;

public record HomeResponse(
        List<DongXe> dongXe,
        List<TinTuc> tinTuc
) {

}
