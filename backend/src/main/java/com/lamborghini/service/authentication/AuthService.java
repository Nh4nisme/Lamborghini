package com.lamborghini.service.authentication;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.lamborghini.dto.event.DangKyThanhCongEvent;
import com.lamborghini.dto.event.DoiMatKhauEvent;
import com.lamborghini.dto.global.MessageResponse;
import com.lamborghini.dto.profile.request.ChangePasswordRequest;
import com.lamborghini.dto.profile.response.ChangePasswordResponse;
import com.lamborghini.dto.dangky.request.RegisterRequest;
import com.lamborghini.dto.dangky.reponse.RegisterResponse;
import com.lamborghini.dto.login.request.GoogleLoginRequest;
import com.lamborghini.dto.login.request.LoginRequest;
import com.lamborghini.dto.login.response.LoginResponse;
import com.lamborghini.dto.login.response.UserInfo;
import com.lamborghini.entity.KhachHang;
import com.lamborghini.entity.TaiKhoan;
import com.lamborghini.entity.TokenBiThuHoi;
import com.lamborghini.enums.TrangThaiTaiKhoan;
import com.lamborghini.enums.VaiTro;
import com.lamborghini.exception.AccountLockedException;
import com.lamborghini.exception.FieldValidationExcrption;
import com.lamborghini.repository.KhachHangRepository;
import com.lamborghini.repository.TaiKhoanRepository;
import com.lamborghini.repository.TokenBiThuHoiRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneOffset;
import java.util.UUID;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor

public class AuthService {


    private final JwtService jwtService;
    private final TaiKhoanRepository taiKhoanRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final EmailVerificationService emailVerificationService;
    private final TokenBiThuHoiRepository tokenBiThuHoiRepository;

    private String dummyHash;
    private static final int TOI_DA_SAI = 5;
    private static final int KHOA_GIAY = 60;
    @Value("${app.google.client-id}")
    private String googleClientId;

    @PostConstruct
    void khoiTaoDummyHash() {
        this.dummyHash = passwordEncoder.encode("khong-ai-biet-mat-khau-nay");
    }

    @Transactional(noRollbackFor = {FieldValidationExcrption.class, AccountLockedException.class})
    public LoginResponse login(LoginRequest req) {
        String email = req.email().trim().toLowerCase();
        TaiKhoan tk = taiKhoanRepository.findByEmailIgnoreCase(email);

        if (tk == null) {
            // vẫn băm một lần cho tốn thời gian như thật, kẻ xấu không đoán được email có tồn tại qua độ chậm
            passwordEncoder.matches(req.matKhau(), dummyHash);
            throw new FieldValidationExcrption("login", "Sai thông tin đăng nhập");
        }

        LocalDateTime now = LocalDateTime.now();
        // 1) đang khóa 60 giây: từ chối, kể cả khi mật khẩu đúng
        if (tk.getThoiGianMoKhoa() != null && tk.getThoiGianMoKhoa().isAfter(now)) {
            long con = (long) Math.ceil(Duration.between(now, tk.getThoiGianMoKhoa()).toMillis() / 1000.0);
            throw new AccountLockedException(con);
        }

        // 2) sai mật khẩu: +1; đủ 5 thì khóa
        if (!passwordEncoder.matches(req.matKhau(), tk.getMatKhau())) {
            taiKhoanRepository.tangSoLanSai(tk.getMaTaiKhoan());
            if (taiKhoanRepository.khoaTamThoi(tk.getMaTaiKhoan(), now.plusSeconds(KHOA_GIAY), TOI_DA_SAI) > 0) throw new AccountLockedException(60);
            throw new FieldValidationExcrption("login", "Sai thông tin đăng nhập");
        }

        // 3) mật khẩu đúng nhưng tài khoản bị quản trị khóa (UC033)
        if (tk.getTrangThai() == TrangThaiTaiKhoan.BI_KHOA) {
            throw new FieldValidationExcrption("locked",
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
    @Transactional
    public LoginResponse loginWithGoogle(GoogleLoginRequest req) {

        //  khởi tạo bộ xác thực Google Token Verifier
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(googleClientId))
                .build();
        GoogleIdToken idToken;
        try {
            // xác thực token với Google (kiểm tra hạn dùng, chữ ký, clientId)
            idToken = verifier.verify(req.idToken());
        } catch (Exception e) {
            throw new FieldValidationExcrption("google", "Xác thực tài khoản Google thất bại");
        }
        if (idToken == null) {
            throw new FieldValidationExcrption("google", "Token Google không hợp lệ hoặc đã hết hạn");
        }

        // lấy thông tin người dùng từ Payload của Google
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail().trim().toLowerCase();
        String name = (String) payload.get("name");
        if (name == null || name.isBlank()) {
            name = email.split("@")[0]; // fallback nếu tài khoản google không có tên
        }

        // tìm tài khoản trong cơ sở dữ liệu theo email
        TaiKhoan tk = taiKhoanRepository.findByEmailIgnoreCase(email);
        if (tk == null) {
            // nếu người dùng mới -> đăng ký tài khoản mới
            tk = new TaiKhoan();
            tk.setHoTen(name);
            tk.setEmail(email);
            // băm một chuỗi ngẫu nhiên làm mật khẩu để thỏa mãn ràng buộc not null của db
            tk.setMatKhau(passwordEncoder.encode(UUID.randomUUID().toString()));
            tk.setSdt("");
            tk.setVaiTro(VaiTro.CUSTOMER);
            tk.setTrangThai(TrangThaiTaiKhoan.HOAT_DONG);
            tk.setSlNhapSai(0);
            tk.setNgayTao(LocalDateTime.now());
            taiKhoanRepository.saveAndFlush(tk);
            // tạo bản ghi KhachHang liên kết
            KhachHang khachHang = new KhachHang();
            khachHang.setTaiKhoan(tk);
            khachHangRepository.save(khachHang);
        } else {
            // đã có tài khoản -> kiểm tra trạng thái khóa
            if (tk.getTrangThai() == TrangThaiTaiKhoan.BI_KHOA) {
                throw new FieldValidationExcrption("locked",
                        "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
            }

            taiKhoanRepository.datLaiKhiDangNhapDung(tk.getMaTaiKhoan());
        }
        // cấp JWT token
        JwtService.Token token = jwtService.taoToken(tk);
        return new LoginResponse(
                token.value(),
                "Bearer",
                token.hetHanSauGiay(),
                new UserInfo(tk.getMaTaiKhoan(), tk.getHoTen(), tk.getEmail(), tk.getVaiTro().name()),
                redirectTheoVaiTro(tk.getVaiTro())
        );


    }
    // UC đổi mật khẩu cho dealer
    @Transactional(noRollbackFor = {FieldValidationExcrption.class, AccountLockedException.class})
    public ChangePasswordResponse doiatKhauChoDealer(ChangePasswordRequest req, Integer maTK) {

        TaiKhoan tk = taiKhoanRepository.findByMaTaiKhoan(maTK);
        LocalDateTime now = LocalDateTime.now();

        // 1) đang khóa 60 giây: từ chối, kể cả khi mật khẩu đúng
        if (tk.getThoiGianMoKhoa() != null && tk.getThoiGianMoKhoa().isAfter(now)) {
            long con = (long) Math.ceil(Duration.between(now, tk.getThoiGianMoKhoa()).toMillis() / 1000.0);
            throw new AccountLockedException(con);
        }

        // 2) sai mật khẩu: +1; đủ 5 thì khóa
        if (!passwordEncoder.matches(req.matKhauHienTai(), tk.getMatKhau())) {
            taiKhoanRepository.tangSoLanSai(tk.getMaTaiKhoan());
            if (taiKhoanRepository.khoaTamThoi(tk.getMaTaiKhoan(), now.plusSeconds(KHOA_GIAY), TOI_DA_SAI) > 0) throw new AccountLockedException(60);
            throw new FieldValidationExcrption("message", "Mật khẩu hiện tại không khớp");
        }


        if(!req.xacNhanMatKhauMoi().equalsIgnoreCase(req.matKhauMoi())) {
            throw new FieldValidationExcrption("message", "Mật khẩu xác nhận không khớp");
        }

        if(passwordEncoder.matches(req.matKhauMoi(), tk.getMatKhau())) {
            throw new FieldValidationExcrption("message", "Mật khẩu mới phải khác mật khẩu cũ");
        }

        tk.setMatKhau(passwordEncoder.encode(req.matKhauMoi()));
        tk.setSlNhapSai(0);
        tk.setThoiGianMoKhoa(null);
        taiKhoanRepository.save(tk);

        eventPublisher.publishEvent(new DoiMatKhauEvent(tk.getEmail(), tk.getHoTen()));
        return new ChangePasswordResponse("Đổi mật khẩu thành công");

    }

    @Transactional
    public MessageResponse dangXuat(Jwt jwt) {

        // lấy mã định danh từ JWT

        String jti = jwt.getId();

        if(jti == null || jti.isBlank()) {
            throw new FieldValidationExcrption("token", "Token không hợp lệ");
        }

        // không lưu trùng token
        if(tokenBiThuHoiRepository.existsByMaDinhDanhToken(jti)) {
            return new MessageResponse("Mã đã được thu hồi");
        }

        TokenBiThuHoi token = new TokenBiThuHoi();

        token.setMaDinhDanhToken(jti);

        // chuyển instant sang LocalDateTime theo UTC
        token.setThoiGianHetHan(
                LocalDateTime.ofInstant(jwt.getExpiresAt(), ZoneOffset.UTC)
        );

        tokenBiThuHoiRepository.save(token);
        return new MessageResponse("Bạn đã đăng xuất thành công");
    }

}
