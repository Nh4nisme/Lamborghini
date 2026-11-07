package com.lamborghini.service;

import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.DongXe;
import com.lamborghini.entity.PhuTungCoBan;
import com.lamborghini.entity.Xe;
import com.lamborghini.enums.TrangThaiDongXe;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.DongXeRepository;
import com.lamborghini.repository.PhuTungCoBanRepository;
import com.lamborghini.repository.XeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ModelService {

    private final DongXeRepository dongXeRepository;
    private final XeRepository xeRepository;
    private final PhuTungCoBanRepository phuTungCoBanRepository;




    @Transactional
    public List<DongXe> getAllDongXe() {
        List<DongXe> listDongXe = dongXeRepository.findAllByTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe.HIEN_THI);
        if(listDongXe.isEmpty()) {
            return List.of();
        }
        return listDongXe;
    }

    // api cho trang model detail của một xe cụ thể
    @Transactional
    public ModelDetailResponse getModelDetailTheoMaDongXe(Integer maDongXe) {
        Xe xe = xeRepository.findFirstByDongXe_MaDongXe(maDongXe);
        List<PhuTungCoBan> danhSachPhuTung = phuTungCoBanRepository.findByXe_MaXe(maDongXe);
        return new ModelDetailResponse(xe, danhSachPhuTung);
    }

}
