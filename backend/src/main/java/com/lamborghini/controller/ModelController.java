package com.lamborghini.controller;


import com.lamborghini.entity.DongXe;
import com.lamborghini.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
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

}
