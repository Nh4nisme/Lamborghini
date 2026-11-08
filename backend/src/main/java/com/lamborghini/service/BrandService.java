package com.lamborghini.service;

import com.lamborghini.entity.TinTuc;
import com.lamborghini.exception.NotFoundException;
import com.lamborghini.repository.TinTucRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class BrandService {
    private final TinTucRepository tinTucRepository;

    //  UC006: lấy tin tức theo id được truyền vào
    public TinTuc getTinTucTheoId(Integer maTinTuc) {
        return tinTucRepository.findById(maTinTuc).orElseThrow(() -> new NotFoundException("Không tìm thấy tin tức có id là: " + maTinTuc));
    }
}
