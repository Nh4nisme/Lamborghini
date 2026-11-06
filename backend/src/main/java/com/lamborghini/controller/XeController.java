package com.lamborghini.controller;

import com.lamborghini.entity.Xe;
import com.lamborghini.service.XeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
public class XeController {
    private final XeService xeService;

    // tìm xe theo mã xe cung cấp

    @GetMapping("/{maXe}")
    public Xe getXeTheoId(@PathVariable("maXe") Integer maXe) {
        return xeService.getXeTheoId(maXe);
    }



}
