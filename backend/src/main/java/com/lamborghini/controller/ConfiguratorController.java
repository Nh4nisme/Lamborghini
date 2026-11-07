package com.lamborghini.controller;

import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.entity.Xe;
import com.lamborghini.service.ConfiguratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configurator")
@RequiredArgsConstructor

public class ConfiguratorController {
    private final ConfiguratorService configuratorService;

    // dùng để lấy màu của xe theo loại màu được truền vào
    @GetMapping("/{maXe}/color")
    public List<TuyChonCauHinh> getDanhSachMauCuaXeTheoLoaiMau(
            @PathVariable("maXe") Integer maXe,
            @RequestParam("loaiMau") String loaiMau
    ) {
        return configuratorService.getDanhSachMauCuaXeTheoLoaiMau(maXe, loaiMau);
    }

    //UC003: tìm xe theo mã xe cung cấp

    @GetMapping("/{maXe}")
    public Xe getXeTheoId(@PathVariable("maXe") Integer maXe) {
        return configuratorService.getXeTheoId(maXe);
    }

    //UC004: lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn
    @GetMapping("/{maXe}/options")
    public List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChongetDanhSachTuyChonCuaXeTheoMaNhomTuyChon(
            @PathVariable("maXe") Integer maXe,
            @RequestParam("maNhomTuyChon") Integer maNhomTuyChon
    ) {
        return configuratorService.getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(maXe, maNhomTuyChon);
    }
}
