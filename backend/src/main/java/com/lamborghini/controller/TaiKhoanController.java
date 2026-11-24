package com.lamborghini.controller;

import com.lamborghini.dto.request.UpdateProfileRequest;
import com.lamborghini.dto.response.TaiKhoanResponse;
import com.lamborghini.service.TaiKhoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/taikhoan")
@RequiredArgsConstructor
public class TaiKhoanController {

    private final TaiKhoanService taiKhoanService;

    @GetMapping
    public List<TaiKhoanResponse> getDanhSachTaiKhoan() {
        return taiKhoanService.getDanhSachTaiKhoan();
    }

    @GetMapping("/{maTaiKhoan}")
    public TaiKhoanResponse getTaiKhoanTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getTaiKhoanTheoMa(maTaiKhoan);
    }

    @GetMapping("/users")
    public List<TaiKhoanResponse> getDanhSachUser() {
        return taiKhoanService.getDanhSachUser();
    }

    @GetMapping("/users/{maTaiKhoan}")
    public TaiKhoanResponse getUserTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getUserTheoMa(maTaiKhoan);
    }

    @GetMapping("/dealers")
    public List<TaiKhoanResponse> getDanhSachDealer() {
        return taiKhoanService.getDanhSachDealer();
    }

    @GetMapping("/dealers/{maTaiKhoan}")
    public TaiKhoanResponse getDealerTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getDealerTheoMa(maTaiKhoan);
    }

    @PutMapping("/users/{id}")
    public TaiKhoanResponse updateUser(@PathVariable Integer id, @RequestBody UpdateProfileRequest request) {
        return taiKhoanService.updateUser(id, request);
    }

    @PutMapping("/dealers/{id}")
    public TaiKhoanResponse updateDealer(@PathVariable Integer id, @RequestBody UpdateProfileRequest request) {
        return taiKhoanService.updateDealer(id, request);
    }
}
