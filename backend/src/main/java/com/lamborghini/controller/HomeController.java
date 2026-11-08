package com.lamborghini.controller;

import com.lamborghini.dto.response.HomeResponse;
import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.TinTuc;
import com.lamborghini.entity.Xe;
import com.lamborghini.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
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

    // UC007: tìm kiếm xe theo các tiêu chí có thể null gồm dòng xe, tên phiên bản và khoảng giá tiền
    @GetMapping("/search")
    public List<Xe> searchDanhSachXeTheoDongXeAndTenPhienAndKhoangGiaDuocSapXep(
            @RequestParam(name = "maDongXe") Integer maDongXe,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "minPrice", required = false)BigInteger minPrice,
            @RequestParam(name = "maxPrice", required = false) BigInteger maxPrice
            ) {
        return homeService.searchDanhSachXeTheoDongXeAndTenPhienAndKhoangGiaDuocSapXep(maDongXe, keyword, minPrice, maxPrice);
    }


}
