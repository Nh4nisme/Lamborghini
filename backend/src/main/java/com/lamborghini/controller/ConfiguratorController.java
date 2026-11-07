package com.lamborghini.controller;

import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.service.ConfiguratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configurator")
@RequiredArgsConstructor

public class ConfiguratorController {
    private final ConfiguratorService configuratorService;

    @GetMapping("/{maXe}/color")
    public List<TuyChonCauHinh> getDanhSachMauCuaXeTheoLoaiMau(
            @PathVariable("maXe") Integer maXe,
            @RequestParam("loaiMau") String loaiMau
    ) {
        return configuratorService.getDanhSachMauCuaXeTheoLoaiMau(maXe, loaiMau);
    }
}
