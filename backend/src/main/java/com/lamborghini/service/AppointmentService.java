package com.lamborghini.service;

import com.lamborghini.dto.response.AppointmentRequest;
import com.lamborghini.dto.response.AppointmentResponse;
import com.lamborghini.dto.response.EmailXacNhan;
import com.lamborghini.entity.LichHen;
import com.lamborghini.entity.Showroom;
import com.lamborghini.entity.Xe;
import com.lamborghini.enums.TrangThaiLichHen;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.LichHenRepository;
import com.lamborghini.repository.ShowroomRepository;
import com.lamborghini.repository.XeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final LichHenRepository lichHenRepository;
    private final ShowroomRepository showroomRepository;
    private final XeRepository xeRepository;
    private final EmailService emailService;

    // UC008: đặt lịch lái thử hoặc tư vấn có gửi mail


    public AppointmentResponse datLich(AppointmentRequest request) {


        Showroom showroom = showroomRepository.findById(request.maShowroom()).orElseThrow(() -> new NotFoundException("Không tìm thấy showroom có id là: " + request.maShowroom()));

        Xe xe = xeRepository.findById(request.maXe()).orElseThrow(() -> new NotFoundException("Không tìm thấy xe có id là: " + request.maXe()));
        String tenXe = xe.getTenPhienBan();


        String email = request.emailLienHe().trim();

        LichHen lh = new LichHen();
        lh.setLoaiLichHen(request.loaiLichHen());
        lh.setThoiGianHen(request.thoiGianHen());
        lh.setGhiChu(request.ghiChu());
        lh.setTrangThaiLichHen(TrangThaiLichHen.CHO_XAC_NHAN);
        lh.setNgayTao(LocalDateTime.now());
        lh.setHoTenLienHe(request.hoTenLienHe().trim());
        lh.setSdtLienHe(request.sdtLienHe().trim());
        lh.setEmailLienHe(email);
        lh.setShowroom(showroom);
        lh.setXe(xe);
        lichHenRepository.save(lh);

        String maYeuCau = String.format("LH%06d", lh.getMaLichHen());

        emailService.guiXacNhanLichHen(new EmailXacNhan(email, lh.getHoTenLienHe(), maYeuCau, request.loaiLichHen().name(), showroom.getTenShowroom(), tenXe, request.thoiGianHen()));
        return new AppointmentResponse(lh.getMaLichHen(), maYeuCau, TrangThaiLichHen.CHO_XAC_NHAN.name(),
                "Chúng tôi đã nhận yêu cầu và gửi email xác nhận tới " + email);


    }

}
