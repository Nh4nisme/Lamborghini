package com.lamborghini.service;

import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.PhuTungCoBan;
import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.entity.Xe;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.PhuTungCoBanRepository;
import com.lamborghini.repository.TuyChonCauHinhRepository;
import com.lamborghini.repository.XeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class XeService {
    private final XeRepository xeRepository;
    private final TuyChonCauHinhRepository tuyChonCauHinhRepository;
    private final PhuTungCoBanRepository phuTungCoBanRepository;


    //UC003: getXeTheoId
    public Xe getXeTheoId(Integer maXe) {
        return xeRepository.findById(maXe).orElseThrow(() -> new NotFoundException("Không tìm thấy xe theo id: " + maXe));
    }

    //UC004: getDanhSachTuyChonCuaXeTheoMaNhomTuyChon: lấy danh sách tùy chọn của chiếc xe đang được chọn
    public List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(Integer maXe, Integer maNhomTuyChon) {
        return tuyChonCauHinhRepository.getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(maXe, maNhomTuyChon);
    }

    // api cho trang model detail của một xe cụ thể
    @Transactional
    public ModelDetailResponse getModelDetailTheoMaXe(Integer maXe) {
        Xe xe = xeRepository.findById(maXe).orElseThrow(() -> new NotFoundException("Không tìm thấy xe theo id: " + maXe));
        List<PhuTungCoBan> danhSachPhuTung = phuTungCoBanRepository.findByXe_MaXe(maXe);
        return new ModelDetailResponse(xe, danhSachPhuTung);
    }


}
