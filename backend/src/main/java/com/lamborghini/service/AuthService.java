package com.lamborghini.service;

import com.lamborghini.dto.event.DangKyThanhCongEvent;
import com.lamborghini.dto.request.RegisterRequest;
import com.lamborghini.dto.response.RegisterResponse;
import com.lamborghini.entity.KhachHang;
import com.lamborghini.entity.TaiKhoan;
import com.lamborghini.enums.TrangThaiTaiKhoan;
import com.lamborghini.enums.VaiTro;
import com.lamborghini.exception.FieldValidationExcrption;
import com.lamborghini.repository.KhachHangRepository;
import com.lamborghini.repository.TaiKhoanRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final EmailVerificationService emailVerificationService;

    @Transactional // tạo tài khoản + khách hàng + tiêu thụ chứng nhận: hoặc cả ba cùng thành công, hoặc không gì cả
    public RegisterResponse register(RegisterRequest req) {


        if(!req.xacNhanMatKhau().equalsIgnoreCase(req.matKhau())) {
            throw new FieldValidationExcrption("xacNhanMatKhau", "Mật khẩu xác nhận không khớp");
        }

        String email = req.email().trim().toLowerCase();

        if(taiKhoanRepository.existsByEmailIgnoreCase(email)) {
            throw new FieldValidationExcrption("email", "Email đã được sử dụng");
        }

        // chưa xác thực / token sai / hết hạn / đã dùng → lỗi ở ô email
        emailVerificationService.tieuThuChungNhan(email, req.emailVerificationToken());

        TaiKhoan tk = new TaiKhoan();
        tk.setHoTen(req.ho().trim() + " " + req.ten().trim());
        tk.setEmail(email);
        tk.setSdt(req.sdt().trim());
        tk.setMatKhau(passwordEncoder.encode(req.matKhau()));
        tk.setVaiTro(VaiTro.CUSTOMER);
        tk.setTrangThai(TrangThaiTaiKhoan.HOAT_DONG);
        tk.setSlNhapSai(0);
        tk.setNgayTao(LocalDateTime.now());
        try {
            taiKhoanRepository.saveAndFlush(tk);                // insert ngay để bắt lỗi trùng
        } catch (DataIntegrityViolationException e) {
            // hai người đăng ký cùng email cùng lúc: ràng buộc unique của db chặn lại
            throw new FieldValidationExcrption("email", "Email đã được sử dụng");
        }

        KhachHang khachHang = new KhachHang();

        khachHang.setTaiKhoan(tk);
        khachHangRepository.save(khachHang);

        eventPublisher.publishEvent(new DangKyThanhCongEvent(email, tk.getHoTen()));
        return new RegisterResponse(tk.getMaTaiKhoan(), email, tk.getHoTen(), "Đăng ký thành công. Vui lòng đăng nhập.");





    }

}
