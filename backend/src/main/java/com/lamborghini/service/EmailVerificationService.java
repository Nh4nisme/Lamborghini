package com.lamborghini.service;



import com.lamborghini.dto.event.MaXacThucEmailEvent;
import com.lamborghini.dto.response.MessageResponse;
import com.lamborghini.dto.response.VerifyEmailResponse;
import com.lamborghini.exception.FieldValidationExcrption;
import com.lamborghini.repository.TaiKhoanRepository;
import com.lamborghini.repository.XacThucEmailRepository;
import com.lamborghini.util.TokenUtil;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import com.lamborghini.entity.XacThucEmail;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class EmailVerificationService {

    private static final SecureRandom RAMDOM = new SecureRandom();
    private static final int TOI_DA_LAN_THU = 5;
    private static final int TOI_DA_GUI_MOI_GIO = 5;
    private static final int HIEU_LUC_MA_PHUT = 10;
    private static final int HIEU_LUC_CHUNG_NHAN_PHUT = 30;

    private final XacThucEmailRepository xacThucEmailRepository;
    private final TaiKhoanRepository taiKhoanRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher applicationEventPublisher;

    private String chuanHoaEmail(String email) {
        return email.trim().toLowerCase();
    }

    @Transactional
    public MessageResponse guiMaXacThuc(String emailRaw) {
        String email = chuanHoaEmail(emailRaw);

        if(taiKhoanRepository.existsByEmailIgnoreCase(email)) {
            throw new FieldValidationExcrption("email", "Email đã được sử dụng");
        }

        LocalDateTime now = LocalDateTime.now();

        XacThucEmail  xacThucEmail = xacThucEmailRepository.findTopByEmailOrderByMaXacThucDesc(email);
        if(xacThucEmail != null) {
            boolean vuaGui = xacThucEmail.getNgayTao().isAfter(now.minusSeconds(60)); // có email nào tạo trong 60s gần đây không


            if (vuaGui) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Vui lòng đợi 60 giây trước khi gửi lại mã");
            }
        }

        if (xacThucEmailRepository.countByEmailAndNgayTaoAfter(email, now.minusHours(1)) >= TOI_DA_GUI_MOI_GIO) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Bạn đã yêu cầu quá nhiều mã. Vui lòng thử lại sau.");
        }

        xacThucEmailRepository.voHieuHoaMaCu(email, now); //vô hiệu hóa mã cũ trước khi gửi

        String code = String.format("%06d", RAMDOM.nextInt(1_000_000));

        XacThucEmail x = new XacThucEmail();
        x.setEmail(email);
        x.setMaOTPHash(passwordEncoder.encode(code));
        x.setHetHan(now.plusMinutes(HIEU_LUC_MA_PHUT));
        x.setSoLanThu(0);
        x.setNgayTao(now);

        xacThucEmailRepository.save(x);

        applicationEventPublisher.publishEvent(new MaXacThucEmailEvent(email, code));
        return new MessageResponse("Đã gửi mã xác thực tới " + email + ". Mã có hiệu lực " + HIEU_LUC_MA_PHUT + " phút.");

    }

    @Transactional(noRollbackFor = FieldValidationExcrption.class)
    public VerifyEmailResponse xacNhanMa(String emailRaw, String code) {
        String email = chuanHoaEmail(emailRaw);

        XacThucEmail x = xacThucEmailRepository.findTopByEmailOrderByMaXacThucDesc(email);

        LocalDateTime now = LocalDateTime.now();

        if(x.getXacThucLuc() != null) {
            throw new FieldValidationExcrption("code", "Mã này đã được sử dụng. Hãy gửi lại mã mới nếu cần");
        }

        if(x.getHetHan().isBefore(now)) {
            throw new FieldValidationExcrption("code", "Mã đã hết hạn. Vui lòng gửi lại mã mới");
        }

        if(xacThucEmailRepository.tieuMotLanThu(x.getMaXacThuc(), TOI_DA_LAN_THU) == 0) {
            throw new FieldValidationExcrption("code", "Mã đã nhập sai quá nhiều lần. Vui lòng gửi lại mã mới");
        }
        if(!passwordEncoder.matches(code.trim(), x.getMaOTPHash())) {
            throw new FieldValidationExcrption("code", "Mã xác thực không đúng");
        }

        String token = TokenUtil.taoToken();
        if(xacThucEmailRepository.danhDauDaXacThuc(x.getMaXacThuc(), now, TokenUtil.hamBam(token)) == 0) {
            throw new FieldValidationExcrption("code", "Mã này đã được sử dụng");
        }
        return new VerifyEmailResponse(email, token, HIEU_LUC_CHUNG_NHAN_PHUT, "Xác thực email thành công");
    }

    public void tieuThuChungNhan(String email, String token) {

        final String chuaXacThuc = "Vui lòng xác thực email trước khi đăng ký";

        if(token == null || token.isBlank()) {
            throw new FieldValidationExcrption("email", chuaXacThuc);
        }

        XacThucEmail x = xacThucEmailRepository.findByTokenHash(TokenUtil.hamBam(token.trim()));
        if(!x.getEmail().equalsIgnoreCase(email)) {
            throw new FieldValidationExcrption("email", chuaXacThuc);
        }
        LocalDateTime now = LocalDateTime.now();

        if (x.getXacThucLuc().plusMinutes(HIEU_LUC_CHUNG_NHAN_PHUT).isBefore(now)) {
            throw new FieldValidationExcrption("email", "Xác thực email đã hết hạn. Vui lòng xác thực lại");
        }

        if (xacThucEmailRepository.danhDauDaDung(x.getMaXacThuc(), now) == 0) {
            throw new FieldValidationExcrption("email", "Chứng nhận đã được sử dụng. Vui lòng xác thực lại email");
        }

    }

}
