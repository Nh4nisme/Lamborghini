package com.lamborghini.controller;

import com.lamborghini.dto.request.UpdateProfileRequest;
import com.lamborghini.dto.response.TaiKhoanResponse;
import com.lamborghini.service.TaiKhoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProfileController {

    private final TaiKhoanService taiKhoanService;

    @GetMapping("/profile")
    public TaiKhoanResponse getProfile(@RequestParam(required = false, defaultValue = "10") Integer id) {
        return taiKhoanService.getUserTheoMa(id);
    }

    @PutMapping("/profile")
    public TaiKhoanResponse updateProfile(
            @RequestParam(required = false, defaultValue = "10") Integer id,
            @RequestBody UpdateProfileRequest request
    ) {
        return taiKhoanService.updateUser(id, request);
    }

    @GetMapping("/taikhoan")
    public List<TaiKhoanResponse> getDanhSachTaiKhoan() {
        return taiKhoanService.getDanhSachTaiKhoan();
    }

    @GetMapping("/taikhoan/{maTaiKhoan}")
    public TaiKhoanResponse getTaiKhoanTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getTaiKhoanTheoMa(maTaiKhoan);
    }

    @GetMapping("/taikhoan/users")
    public List<TaiKhoanResponse> getDanhSachUser() {
        return taiKhoanService.getDanhSachUser();
    }

    @GetMapping("/taikhoan/users/{maTaiKhoan}")
    public TaiKhoanResponse getUserTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getUserTheoMa(maTaiKhoan);
    }

    @GetMapping("/taikhoan/dealers")
    public List<TaiKhoanResponse> getDanhSachDealer() {
        return taiKhoanService.getDanhSachDealer();
    }

    @GetMapping("/taikhoan/dealers/{maTaiKhoan}")
    public TaiKhoanResponse getDealerTheoMa(@PathVariable Integer maTaiKhoan) {
        return taiKhoanService.getDealerTheoMa(maTaiKhoan);
    }

    @PutMapping("/taikhoan/users/{id}")
    public TaiKhoanResponse updateUser(@PathVariable Integer id, @RequestBody UpdateProfileRequest request) {
        return taiKhoanService.updateUser(id, request);
    }

    @PutMapping("/taikhoan/dealers/{id}")
    public TaiKhoanResponse updateDealer(@PathVariable Integer id, @RequestBody UpdateProfileRequest request) {
        return taiKhoanService.updateDealer(id, request);
    }
}
