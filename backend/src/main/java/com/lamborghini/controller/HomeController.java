package com.lamborghini.controller;

import com.lamborghini.dto.response.HomeResponse;
import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.TinTuc;
import com.lamborghini.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {
    private final HomeService homeService;

    // getDongXeNoiBat: lấy các dòng xe nổi bật theo limit, limit bao nhiêu thì bấy nhiêu dòng
    @GetMapping("/dongxe/{limit}")
    public List<DongXe> getDongXeNoiBat(@PathVariable("limit") int limit) {
        return homeService.getDongXeNoiBat(limit);
    }

    // getTinTucMoiNhat: lấy các tin tức mới nhất từ cơ sở dữ liệu thông qua ngày đăng
    @GetMapping("/tintuc/{limit}")
    public List<TinTuc> getTinTucMoiNhat(@PathVariable("limit") int limit) {
        return homeService.getTinTucMoiNhat(limit);
    }

    // getTrangChu: lấy trang chủ về bao gồm hai thằng getDongXeNoiBat va getTinTucMoiNhat
    @GetMapping
    public HomeResponse getTrangChu(
            @RequestParam(name = "soDongXe", defaultValue = "3") int soDongXe,
            @RequestParam(name = "soTinTuc", defaultValue = "3") int soTinTuc
    ) {
        return homeService.getTrangChu(soDongXe, soTinTuc);
    }


}
