package com.lamborghini.service;

import com.lamborghini.entity.TuyChonCauHinh;
import com.lamborghini.repository.TuyChonCauHinhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ConfiguratorService {
    private final TuyChonCauHinhRepository tuyChonCauHinhRepository;

    public List<TuyChonCauHinh> getDanhSachMauCuaXeTheoLoaiMau(Integer maXe, String loaiMau){
        return tuyChonCauHinhRepository.getDanhSachMauCuaXeTheoLoaiMau(maXe, loaiMau);
    }
}
