package com.lamborghini.service;

import com.lamborghini.dto.response.HomeResponse;
import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.TinTuc;
import com.lamborghini.enums.TrangThaiDongXe;
import com.lamborghini.enums.TrangThaiTinTuc;
import com.lamborghini.repository.DongXeRepository;
import com.lamborghini.repository.TinTucRepository;
import com.lamborghini.repository.XeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {
    private static final int MAX_LIMIT = 12;
    private final XeRepository xeRepository;
    private final DongXeRepository dongXeRepository;
    private final TinTucRepository tinTucRepository;



    //UC001: getDongXeNoibat, getTinTucMoiNhat, getTrangChu

    @Transactional
    public List<DongXe> getDongXeNoiBat(int limit) {
        List<DongXe> listDongXe = dongXeRepository.findByNoiBatTrueAndTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe.HIEN_THI,  PageRequest.of(0, gioiHan(limit)));
        if(listDongXe.isEmpty()) {
            return List.of();
        }
        return listDongXe;
    }

    @Transactional
    public List<TinTuc> getTinTucMoiNhat(int limit) {
        List<TinTuc> listTinTuc = tinTucRepository.findByTrangThaiOrderByNgayDangDesc(TrangThaiTinTuc.HIEN_THI, PageRequest.of(0, gioiHan(limit)));
        if(listTinTuc.isEmpty()) {
            return List.of();
        }
        return listTinTuc;
    }

    public HomeResponse getTrangChu(int soDongXe, int soTinTuc) {
        return new HomeResponse(getDongXeNoiBat(soDongXe), getTinTucMoiNhat(soTinTuc));
    }










    private int gioiHan(int limit) {
        return Math.max(1, Math.min(limit, MAX_LIMIT));
    }

}
