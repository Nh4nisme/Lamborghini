package com.lamborghini.service;

import com.lamborghini.entity.DongXe;
import com.lamborghini.enums.TrangThaiDongXe;
import com.lamborghini.repository.DongXeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ModelService {

    private final DongXeRepository dongXeRepository;




    @Transactional
    public List<DongXe> getAllDongXe() {
        List<DongXe> listDongXe = dongXeRepository.findAllByTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe.HIEN_THI);
        if(listDongXe.isEmpty()) {
            return List.of();
        }
        return listDongXe;
    }

}
