package com.lamborghini.service;

import com.lamborghini.dto.event.DangKyThanhCongEvent;
import com.lamborghini.dto.event.MaXacThucEmailEvent;
import com.lamborghini.dto.response.EmailXacNhan;
import com.lamborghini.repository.LichHenRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j

public class EmailService {
    private final LichHenRepository lichHenRepository;

    private final JavaMailSender mailSender;
    private static final DateTimeFormatter GIO = DateTimeFormatter.ofPattern("HH:mm 'ngày' dd/MM/yyyy");

    @Value("${spring.mail.username}")
    private String from;




    @Async // chạy ở luồng riêng, khách không phải chờ mail gửi xong
    public void guiXacNhanLichHen(EmailXacNhan d) {
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setFrom(from);
            m.setTo(d.email());
            m.setSubject("[Lamborghini] Đã nhận yêu cầu " + d.maYeuCau());
            m.setText(noiDungXacNhanLichHen(d));
            mailSender.send(m);
            log.info("Đã gửi email xác nhận {}", d.maYeuCau());
        } catch (Exception e) {
            // Không ném lỗi ra ngoài: lịch hẹn đã lưu rồi, chỉ ghi log để kiểm tra
            log.error("Gửi email thất bại cho yêu cầu {}", d.maYeuCau(), e);
        }
    }


    private String noiDungXacNhanLichHen(EmailXacNhan d) {
        String loai = "LAI_THU".equals(d.loaiLichHen()) ? "Đặt lịch lái thử" : "Yêu cầu tư vấn";
        String xe = d.tenXe() == null ? "" : "Xe: " + d.tenXe() + "\n";
        return """
                Xin chào %s,

                Lamborghini đã nhận được yêu cầu của bạn.

                Mã yêu cầu: %s
                Loại yêu cầu: %s
                %sShowroom: %s
                Thời gian hẹn: %s
                Trạng thái: Chờ xác nhận

                Nhân viên tư vấn sẽ liên hệ để xác nhận trong thời gian sớm nhất.
                Vui lòng giữ lại mã yêu cầu.

                Trân trọng,
                Lamborghini
                """.formatted(d.hoTen(), d.maYeuCau(), loai, xe, d.tenShowroom(), GIO.format(d.ngayHen()));
    }
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void guiMaXacThuc(MaXacThucEmailEvent e) {
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setFrom(from);
            m.setTo(e.email());
            m.setSubject("[Lamborghini] Mã xác thực email: " + e.code());
            m.setText(noiDungMaXacThuc(e));
            mailSender.send(m);
        } catch (Exception ex) {
            // Không ném lỗi: dữ liệu đã lưu xong. Cũng không ghi nội dung thư (có mã) vào log.
            log.error("Gửi email thất bại tới {}", e, ex);
        }
    }

    private String noiDungMaXacThuc(MaXacThucEmailEvent e) {
        return
                """
                Mã xác thực email của bạn là: %s
                        
                Mã có hiệu lực trong 10 phút. Không chia sẻ mã này cho bất kỳ ai.
                Nếu không phải bạn yêu cầu, vui lòng bỏ qua email này.
                        
                Trân trọng,
                Lamborghini
                """.formatted(e.code());
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void guiChaoMung(DangKyThanhCongEvent e) {
        try {
            SimpleMailMessage m = new SimpleMailMessage();
            m.setFrom(from);
            m.setTo(e.email());
            m.setSubject("[Lamborghini] Đăng ký tài khoản thành công");
            m.setText(noiDungChaoMung(e));
            mailSender.send(m);
        } catch (Exception ex) {
            // Không ném lỗi: dữ liệu đã lưu xong. Cũng không ghi nội dung thư (có mã) vào log.
            log.error("Gửi email thất bại tới {}", e, ex);
        }
    }
    private String noiDungChaoMung(DangKyThanhCongEvent e) {
        return """
               Xin chào %s,

               Tài khoản của bạn đã được tạo thành công với email %s.
               Bạn có thể đăng nhập để cấu hình xe, đặt lịch lái thử và theo dõi yêu cầu.

               Trân trọng,
               Lamborghini
               """.formatted(e.hoTen(), e.email());
    }
}


