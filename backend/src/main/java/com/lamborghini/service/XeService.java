package com.lamborghini.service;

import com.lamborghini.entity.Xe;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.XeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class XeService {
    private final XeRepository xeRepository;

    public Xe getXeTheoId(Integer maXe) {
        return xeRepository.findById(maXe).orElseThrow(() -> new NotFoundException("Không tìm thấy xe theo id: " + maXe));
    }



}
