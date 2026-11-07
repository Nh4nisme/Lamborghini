package com.lamborghini.controller;

import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.entity.Xe;
import com.lamborghini.service.XeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
@RequiredArgsConstructor
public class XeController {
    private final XeService xeService;

    //UC003: tìm xe theo mã xe cung cấp

    @GetMapping("/{maXe}")
    public Xe getXeTheoId(@PathVariable("maXe") Integer maXe) {
        return xeService.getXeTheoId(maXe);
    }

    //UC004: lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn
    @GetMapping("/{maXe}/options")
    public List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChongetDanhSachTuyChonCuaXeTheoMaNhomTuyChon(
            @PathVariable("maXe") Integer maXe,
            @RequestParam("maNhomTuyChon") Integer maNhomTuyChon
    ) {
        return xeService.getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(maXe, maNhomTuyChon);
    }








}
