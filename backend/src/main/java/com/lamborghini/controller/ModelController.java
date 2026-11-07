package com.lamborghini.controller;


import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.DongXe;
import com.lamborghini.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/model")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;


    // getAllDongXe: lấy tất cả dòng xe có trạng thái hiển thị
    @GetMapping("/getAllDongXe")
    public List<DongXe> getAllDongXe() {
        return modelService.getAllDongXe();
    }

    //api cho trang model detail của một xe cụ thể
    @GetMapping("/{maDongXe}/modeldetail")
    public ModelDetailResponse getModelDetailTheoMaXe(@PathVariable("maDongXe") Integer maDongXe) {
        return modelService.getModelDetailTheoMaDongXe(maDongXe);
    }

}
