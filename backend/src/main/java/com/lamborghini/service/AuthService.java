package com.lamborghini.service;

import com.lamborghini.dto.event.DangKyThanhCongEvent;
import com.lamborghini.dto.request.RegisterRequest;
import com.lamborghini.dto.response.RegisterResponse;
import com.lamborghini.dto.response.login.request.LoginRequest;
import com.lamborghini.dto.response.login.response.LoginResponse;
import com.lamborghini.dto.response.login.response.UserInfo;
import com.lamborghini.entity.KhachHang;
import com.lamborghini.entity.TaiKhoan;
import com.lamborghini.enums.TrangThaiTaiKhoan;
import com.lamborghini.enums.VaiTro;
import com.lamborghini.exception.FieldValidationExcrption;
import com.lamborghini.repository.KhachHangRepository;
import com.lamborghini.repository.TaiKhoanRepository;
import com.lamborghini.service.login.JwtService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import javax.security.auth.login.AccountLockedException;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class AuthService {


    private final JwtService jwtService;
    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final EmailVerificationService emailVerificationService;

    private String dummyHash;
    private static final int TOI_DA_SAI = 5;
    private static final int KHOA_GIAY = 60;
    private static final String SAI_THONG_TIN = "Email hoặc mật khẩu không đúng";

    @PostConstruct
    void khoiTaoDummyHash() {
        this.dummyHash = passwordEncoder.encode("khong-ai-biet-mat-khau-nay");
    }

    @Transactional(noRollbackFor = {ResponseStatusException.class, AccountLockedException.class})
    public LoginResponse login(LoginRequest req) {
        String email = req.email().trim().toLowerCase();
        TaiKhoan tk = taiKhoanRepository.findByEmailIgnoreCase(email);

        if (tk == null) {
            // vẫn băm một lần cho tốn thời gian như thật, kẻ xấu không đoán được email có tồn tại qua độ chậm
            passwordEncoder.matches(req.matKhau(), dummyHash);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, SAI_THONG_TIN);
        }

        LocalDateTime now = LocalDateTime.now();
        // 1) đang khóa 60 giây: từ chối, kể cả khi mật khẩu đúng
        if (tk.getThoiGianMoKhoa() != null && tk.getThoiGianMoKhoa().isAfter(now)) {
            long con = (long) Math.ceil(Duration.between(now, tk.getThoiGianMoKhoa()).toMillis() / 1000.0);
            throw new FieldValidationExcrption("login", "Tài khoản của bạn đang bị khóa, vui lòng đợi 60 giây để đăng nhập lại");
        }

        // 2) sai mật khẩu: +1; đủ 5 thì khóa
        if (!passwordEncoder.matches(req.matKhau(), tk.getMatKhau())) {
            taiKhoanRepository.tangSoLanSai(tk.getMaTaiKhoan());
            if (taiKhoanRepository.khoaTamThoi(tk.getMaTaiKhoan(), now.plusSeconds(KHOA_GIAY), TOI_DA_SAI) > 0) {
                throw new FieldValidationExcrption("login", "Bạn đã đăng nhập sai quá nhiều, tài khoản bị khóa 60 giây");
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, SAI_THONG_TIN);
        }

        // 3) mật khẩu đúng nhưng tài khoản bị quản trị khóa (UC033)
        if (tk.getTrangThai() == TrangThaiTaiKhoan.BI_KHOA) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên");
        }

        // 4) thành công: xóa đếm sai, cấp token
        taiKhoanRepository.datLaiKhiDangNhapDung(tk.getMaTaiKhoan());
        JwtService.Token token = jwtService.taoToken(tk);
        return new LoginResponse(token.value(), "Bearer", token.hetHanSauGiay(),
                new UserInfo(tk.getMaTaiKhoan(), tk.getHoTen(), tk.getEmail(), tk.getVaiTro().name()),
                redirectTheoVaiTro(tk.getVaiTro()));
    }

    private String redirectTheoVaiTro(VaiTro v) {
        return switch (v) {
            case ADMIN -> "/admin";
            case DEALER -> "/dealer";
            case CUSTOMER -> "/";
        };
    }

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
