package com.lamborghini.service;

import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.entity.Xe;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.TuyChonCauHinhRepository;
import com.lamborghini.repository.XeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class XeService {
    private final XeRepository xeRepository;
    private final TuyChonCauHinhRepository tuyChonCauHinhRepository;


    //UC003: getXeTheoId
    public Xe getXeTheoId(Integer maXe) {
        return xeRepository.findById(maXe).orElseThrow(() -> new NotFoundException("Không tìm thấy xe theo id: " + maXe));
    }

    //UC004: getDanhSachTuyChonCuaXeTheoMaNhomTuyChon: lấy danh sách tùy chọn của chiếc xe đang được chọn
    public List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(Integer maXe, Integer maNhomTuyChon) {
        return tuyChonCauHinhRepository.getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(maXe, maNhomTuyChon);
    }



}
