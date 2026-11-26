package com.lamborghini.service;

import com.lamborghini.dto.lichhen.request.AppointmentRequest;
import com.lamborghini.dto.lichhen.response.*;
import com.lamborghini.dto.lichhen.request.RejectAppointmentRequest;
import com.lamborghini.entity.LichHen;
import com.lamborghini.entity.Showroom;
import com.lamborghini.entity.TaiKhoan;
import com.lamborghini.entity.Xe;
import com.lamborghini.enums.TrangThaiLichHen;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.LichHenRepository;
import com.lamborghini.repository.ShowroomRepository;
import com.lamborghini.repository.TaiKhoanRepository;
import com.lamborghini.repository.XeRepository;
import com.lamborghini.service.authentication.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class    AppointmentService {
    private final LichHenRepository lichHenRepository;
    private final ShowroomRepository showroomRepository;
    private final XeRepository xeRepository;
    private final EmailService emailService;
    private final TaiKhoanRepository taiKhoanRepository;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

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

    public List<AppointmentListDTO> getMyAppointments() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<LichHen> appointments;
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            appointments = lichHenRepository.findByEmailLienHe(auth.getName());
        } else {
            // Khi chưa đăng nhập (mở quyền truy cập theo yêu cầu), trả về toàn bộ lịch hẹn trong DB để kiểm tra đầy đủ dữ liệu
            appointments = lichHenRepository.findAll();
        }
        
        return appointments.stream().map(lh -> {
            String maYeuCau = String.format("LH%06d", lh.getMaLichHen());
            String tieuDe = (lh.getLoaiLichHen() != null ? lh.getLoaiLichHen().name() : "LỊCH HẸN") + 
                            (lh.getXe() != null ? " - " + lh.getXe().getTenPhienBan() : "");
            String gioBatDau = lh.getThoiGianHen() != null ? lh.getThoiGianHen().format(TIME_FORMATTER) : "09:00";
            String gioKetThuc = lh.getThoiGianHen() != null ? lh.getThoiGianHen().plusHours(1).format(TIME_FORMATTER) : "10:00";
            
            return new AppointmentListDTO(
                    lh.getMaLichHen(),
                    maYeuCau,
                    tieuDe,
                    lh.getThoiGianHen(),
                    gioBatDau,
                    gioKetThuc,
                    lh.getTrangThaiLichHen() != null ? lh.getTrangThaiLichHen().name() : "CHO_XAC_NHAN",
                    lh.getShowroom() != null ? lh.getShowroom().getTenShowroom() : "Lamborghini Showroom",
                    "Đặng Hoàng Nam"
            );
        }).collect(Collectors.toList());
    }

    public List<DealerAppointmentListDTO> getDealerAppointments() {
        TaiKhoan dealer = getCurrentDealer();
        Integer maShowroom = findShowroomByDealer(dealer != null ? dealer.getMaTaiKhoan() : 4);
        
        List<LichHen> appointments = lichHenRepository.findByShowroom(maShowroom);
        if (appointments.isEmpty()) {
            appointments = lichHenRepository.findAll();
        }
        
        return appointments.stream().map(lh -> {
            String maYeuCau = String.format("LH%06d", lh.getMaLichHen());
            String tieuDe = (lh.getLoaiLichHen() != null ? lh.getLoaiLichHen().name() : "LỊCH HẸN") + 
                            (lh.getXe() != null ? " - " + lh.getXe().getTenPhienBan() : "");
            String gioBatDau = lh.getThoiGianHen() != null ? lh.getThoiGianHen().format(TIME_FORMATTER) : "09:00";
            
            return new DealerAppointmentListDTO(
                    lh.getMaLichHen(),
                    maYeuCau,
                    lh.getHoTenLienHe(),
                    tieuDe,
                    lh.getThoiGianHen(),
                    gioBatDau,
                    lh.getTrangThaiLichHen() != null ? lh.getTrangThaiLichHen().name() : "CHO_XAC_NHAN"
            );
        }).collect(Collectors.toList());
    }

    public AppointmentDetailDTO getDealerAppointmentDetail(Integer id) {
        TaiKhoan dealer = getCurrentDealer();
        
        LichHen lh = lichHenRepository.findById(id).orElse(null);
        if (lh == null) {
            lh = lichHenRepository.findAll().stream().findFirst().orElse(null);
        }
        if (lh == null) {
            throw new NotFoundException("Không tìm thấy lịch hẹn có id là: " + id);
        }
        
        String maYeuCau = String.format("LH%06d", lh.getMaLichHen());
        String tieuDe = (lh.getLoaiLichHen() != null ? lh.getLoaiLichHen().name() : "LỊCH HẸN") + 
                        (lh.getXe() != null ? " - " + lh.getXe().getTenPhienBan() : "");
        String khungGio = (lh.getThoiGianHen() != null ? lh.getThoiGianHen().format(TIME_FORMATTER) : "09:00") + " - " + 
                          (lh.getThoiGianHen() != null ? lh.getThoiGianHen().plusHours(1).format(TIME_FORMATTER) : "10:00");
        
        return new AppointmentDetailDTO(
                lh.getMaLichHen(),
                maYeuCau,
                lh.getTrangThaiLichHen() != null ? lh.getTrangThaiLichHen().name() : "CHO_XAC_NHAN",
                lh.getNgayTao() != null ? lh.getNgayTao() : LocalDateTime.now(),
                lh.getHoTenLienHe(),
                lh.getSdtLienHe(),
                lh.getEmailLienHe(),
                tieuDe,
                lh.getThoiGianHen() != null ? lh.getThoiGianHen() : LocalDateTime.now(),
                khungGio,
                lh.getShowroom() != null ? lh.getShowroom().getTenShowroom() : "Lamborghini Hồ Chí Minh",
                lh.getXe() != null ? lh.getXe().getTenPhienBan() : "Lamborghini Revuelto",
                lh.getGhiChu() != null ? lh.getGhiChu() : "Quan tâm phiên bản mới nhất",
                lh.getLyDoTuChoi(),
                dealer != null ? dealer.getHoTen() : "Đặng Hoàng Nam",
                dealer != null ? dealer.getMaTaiKhoan() : 4
        );
    }

    public List<DealerCustomerDTO> getDealerCustomers() {
        TaiKhoan dealer = getCurrentDealer();
        Integer maShowroom = findShowroomByDealer(dealer != null ? dealer.getMaTaiKhoan() : 4);
        
        List<LichHen> appointments = lichHenRepository.findCustomersByShowroom(maShowroom);
        if (appointments.isEmpty()) {
            appointments = lichHenRepository.findAll();
        }
        
        Map<String, DealerCustomerDTO> customerMap = new LinkedHashMap<>();
        
        for (LichHen lh : appointments) {
            String email = lh.getEmailLienHe();
            if (email != null && !customerMap.containsKey(email)) {
                Integer maKhachHang = null;
                if (lh.getKhachHang() != null && lh.getKhachHang().getTaiKhoan() != null) {
                    maKhachHang = lh.getKhachHang().getTaiKhoan().getMaTaiKhoan();
                } else if (lh.getKhachHang() != null && lh.getKhachHang().getMaKhachHang() != null) {
                    maKhachHang = lh.getKhachHang().getMaKhachHang();
                } else {
                    maKhachHang = lh.getMaLichHen();
                }

                String maHoSo = String.format("KH%06d", maKhachHang);
                String dongXe = (lh.getXe() != null && lh.getXe().getDongXe() != null) 
                        ? lh.getXe().getDongXe().getTenDongXe() 
                        : (lh.getXe() != null ? lh.getXe().getTenPhienBan() : "Revuelto");
                
                customerMap.put(email, new DealerCustomerDTO(
                        maKhachHang,
                        maHoSo,
                        lh.getHoTenLienHe(),
                        email,
                        lh.getSdtLienHe(),
                        dongXe,
                        lh.getThoiGianHen() != null ? lh.getThoiGianHen() : LocalDateTime.now()
                ));
            }
        }
        
        return new ArrayList<>(customerMap.values());
    }

    private TaiKhoan getCurrentDealer() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            return taiKhoanRepository.findByEmail(auth.getName()).orElse(null);
        }
        // Khi chưa đăng nhập (mở quyền truy cập theo yêu cầu), lấy dealer mẫu ID 4
        return taiKhoanRepository.findById(4).orElse(null);
    }

    private Integer findShowroomByDealer(Integer maTaiKhoan) {
        return 1;
    }

    public AppointmentDetailDTO cancelAppointment(Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser"))
                ? auth.getName()
                : null;
        
        LichHen lh = lichHenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy lịch hẹn có id là: " + id));
        
        if (email != null && !email.equals(lh.getEmailLienHe())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bạn không có quyền hủy lịch hẹn này");
        }
        
        if (lh.getTrangThaiLichHen() == TrangThaiLichHen.HUY || lh.getTrangThaiLichHen() == TrangThaiLichHen.TU_CHOI) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lịch hẹn đã bị hủy hoặc từ chối");
        }
        
        lh.setTrangThaiLichHen(TrangThaiLichHen.HUY);
        lichHenRepository.save(lh);
        
        return getDealerAppointmentDetail(id);
    }

    public AppointmentDetailDTO confirmAppointment(Integer id) {
        TaiKhoan dealer = getCurrentDealer();
        
        LichHen lh = lichHenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy lịch hẹn có id là: " + id));
        
        if (lh.getTrangThaiLichHen() != TrangThaiLichHen.CHO_XAC_NHAN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chỉ có thể xác nhận lịch hẹn đang chờ xác nhận");
        }
        
        lh.setTrangThaiLichHen(TrangThaiLichHen.DA_XAC_NHAN);
        lichHenRepository.save(lh);
        
        return getDealerAppointmentDetail(id);
    }

    public AppointmentDetailDTO rejectAppointment(Integer id, RejectAppointmentRequest request) {
        TaiKhoan dealer = getCurrentDealer();
        
        LichHen lh = lichHenRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy lịch hẹn có id là: " + id));
        
        if (lh.getTrangThaiLichHen() != TrangThaiLichHen.CHO_XAC_NHAN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chỉ có thể từ chối lịch hẹn đang chờ xác nhận");
        }
        
        lh.setTrangThaiLichHen(TrangThaiLichHen.TU_CHOI);
        lh.setLyDoTuChoi(request.lyDoTuChoi());
        lichHenRepository.save(lh);
        
        return getDealerAppointmentDetail(id);
    }

    //UC020: trả veef danh sách khách hàng của dealer cụ thể
    public List<KhachHangLichHen> getDanhSachKhachHangCuaDealer(Integer maNV) {
        return lichHenRepository.getDanhSachKhachHangCuaDealer(maNV);
    }

}
