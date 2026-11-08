package com.lamborghini.service;

import com.lamborghini.dto.response.EmailXacNhan;
import com.lamborghini.repository.LichHenRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

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
            m.setText(noiDung(d));
            mailSender.send(m);
            log.info("Đã gửi email xác nhận {}", d.maYeuCau());
        } catch (Exception e) {
            // Không ném lỗi ra ngoài: lịch hẹn đã lưu rồi, chỉ ghi log để kiểm tra
            log.error("Gửi email thất bại cho yêu cầu {}", d.maYeuCau(), e);
        }
    }

    private String noiDung(EmailXacNhan d) {
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
}


