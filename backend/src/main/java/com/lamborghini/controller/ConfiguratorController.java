package com.lamborghini.controller;

import com.lamborghini.dto.cauhinh.reponse.ChiTietChiaSeResponse;
import com.lamborghini.dto.cauhinh.reponse.LuuCauHinhResponse;
import com.lamborghini.dto.cauhinh.request.LuuCauHinhEmailRequest;
import com.lamborghini.dto.cauhinh.request.LuuCauHinhRequest;
import com.lamborghini.dto.global.MessageResponse;
import com.lamborghini.entity.CauHinh;
import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.entity.Xe;
import com.lamborghini.service.ConfiguratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configuration")
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

    //UC014: lưu bản cấu hình chính thức cho người sử dụng chức năng
    @PostMapping("/save")
    public LuuCauHinhResponse luuBanCauHinhXe(
            @RequestBody LuuCauHinhRequest req,
            @AuthenticationPrincipal Jwt jwt
            ) {
        Integer maTK = null;

        if (jwt != null) {
            maTK = Integer.valueOf(jwt.getSubject());

        }
        return configuratorService.luuBanCauHinhXe(req, maTK);
    }

    //UC014: lấy danh sách cấu hình theo tài khoản đang đăng nhập
    @GetMapping("/my")
    public List<CauHinh> getDanhSachCauHinhTheoMaTaiKhoan(@AuthenticationPrincipal Jwt jwt) {
        Integer maTK = Integer.valueOf(jwt.getSubject());
        return configuratorService.getDanhSachCauHinhTheoMaTaiKhoan(maTK);
    }

    @PostMapping("/send-share-email")
    public MessageResponse luuBanCauHinhThongQuaEmail(@RequestBody LuuCauHinhEmailRequest req) {
        return configuratorService.luuBanCauHinhThongQuaEmail(req);
    }
    // Nhập mã chia sẻ: Sơn thêm
    @GetMapping("/share/{maChiaSe}")
    public ChiTietChiaSeResponse getCauHinhTheoMaChiaSe(@PathVariable("maChiaSe") String maChiaSe) {
        return configuratorService.getCauHinhTheoMaChiaSe(maChiaSe);
    }

}
