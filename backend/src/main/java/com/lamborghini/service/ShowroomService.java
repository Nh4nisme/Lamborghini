package com.lamborghini.service;

import com.lamborghini.entity.Showroom;
import com.lamborghini.enums.TrangThaiShowroom;
import com.lamborghini.repository.ShowroomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ShowroomService {

    private final ShowroomRepository showroomRepository;


    //UC005: getAllShowroom: lấy toàn bộ showroom có trạng thái hoạt động
    @Transactional
    public List<Showroom> getAllShowroom() {
        List<Showroom> listShowroom = showroomRepository.findAllByTrangThaiOrderByKhuVucAsc(TrangThaiShowroom.HOAT_DONG);
        if(listShowroom.isEmpty()) {
            return List.of();
        }
        return listShowroom;
    }


}
