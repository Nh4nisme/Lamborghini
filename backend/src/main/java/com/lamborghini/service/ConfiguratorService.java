package com.lamborghini.service;

import com.lamborghini.dto.cauhinh.reponse.LuuCauHinhResponse;
import com.lamborghini.dto.cauhinh.request.LuuCauHinhEmailRequest;
import com.lamborghini.dto.cauhinh.request.LuuCauHinhRequest;
import com.lamborghini.dto.event.LuuCauHinhEvent;
import com.lamborghini.dto.global.MessageResponse;
import com.lamborghini.entity.*;
import com.lamborghini.exception.FieldValidationExcrption;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.*;
import com.lamborghini.util.MaChiaSeUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ConfiguratorService {
    private final TuyChonCauHinhRepository tuyChonCauHinhRepository;
    private final XeRepository xeRepository;
    private final CauHinhRepository cauHinhRepository;
    private final TaiKhoanRepository taiKhoanRepository;
    private final ChiTietCauHinhRepository chiTietCauHinhRepository;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher eventPublisher;

    // dùng để lấy màu của xe theo loại màu được truền vào
    public List<TuyChonCauHinh> getDanhSachMauCuaXeTheoLoaiMau(Integer maXe, String loaiMau){
        return tuyChonCauHinhRepository.getDanhSachMauCuaXeTheoLoaiMau(maXe, loaiMau);
    }

    //UC003: getXeTheoId
    public Xe getXeTheoId(Integer maXe) {
        return xeRepository.findById(maXe).orElseThrow(() -> new NotFoundException("Không tìm thấy xe theo id: " + maXe));
    }

    //UC004: getDanhSachTuyChonCuaXeTheoMaNhomTuyChon: lấy danh sách tùy chọn của chiếc xe đang được chọn
    public List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(Integer maXe, Integer maNhomTuyChon) {
        return tuyChonCauHinhRepository.getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(maXe, maNhomTuyChon);
    }

    @Transactional
    //UC014: giúp lưu bản cấu hình xe chính thức gắn kèm theo tài khoản đang login
    public LuuCauHinhResponse luuBanCauHinhXe(LuuCauHinhRequest req, Integer maTK) {

        Xe xe = xeRepository.findByMaXe(req.maXe());

        if(cauHinhRepository.existsByTaiKhoan_MaTaiKhoanAndTenCauHinh(maTK, req.tenCauHinh())) {
            throw new FieldValidationExcrption("tenCauHinh",  "Đã tồn tại tên cấu hình này trong tài khoản của bạn");
        }

        TaiKhoan taiKhoan = taiKhoanRepository.findByMaTaiKhoan(maTK);


        String maChiaSe = taoMaChiaSeKhongTrung();

        CauHinh cauHinh = new CauHinh();


        cauHinh.setTenCauHinh(req.tenCauHinh());
        cauHinh.setTongGia(req.tongGia());
        cauHinh.setMaChiaSe(maChiaSe);
        cauHinh.setTaiKhoan(taiKhoan);


        cauHinhRepository.save(cauHinh);

        ChiTietCauHinh chiTietCauHinh = new ChiTietCauHinh();
        chiTietCauHinh.setCauHinh(cauHinh);
        chiTietCauHinh.setGiaTaiThoiDiemChon(req.tongGia());
        chiTietCauHinh.setXe(xe);

        String jsonMaTuyChon = objectMapper.writeValueAsString(req.danhSachMaTuyChon());

        chiTietCauHinh.setMaTuyChon(jsonMaTuyChon);

        chiTietCauHinhRepository.save(chiTietCauHinh);

        return new LuuCauHinhResponse("Bạn đã lưu cấu hình thành công", maChiaSe);

    }

    //UC014: lấy danh sách cấu hình theo tài khoản đang đăng nhập
    public List<CauHinh> getDanhSachCauHinhTheoMaTaiKhoan(Integer maTK) {
        return cauHinhRepository.getAllByTaiKhoan_MaTaiKhoan(maTK);
    }

    //UC014:dùng cho guest với mục đích lưu bản cấu hình khi chưa đăng nhập bằng cách gửi về email
    @Transactional
    public MessageResponse luuBanCauHinhThongQuaEmail(LuuCauHinhEmailRequest req) {

        eventPublisher.publishEvent(new LuuCauHinhEvent(req.email(), req.ho(), req.ten(), req.maChiaSe()));
        return new MessageResponse( "Mã chia sẻ cấu hình đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.");

    }

    // dùng để tạo mã không trùng cho đối tượng cấu hình
    private String taoMaChiaSeKhongTrung() {
        String maChiaSe;

        do {
            maChiaSe = MaChiaSeUtil.taoMaChiaSe();
        } while (cauHinhRepository.existsByMaChiaSe(maChiaSe));

        return maChiaSe;
    }



}
