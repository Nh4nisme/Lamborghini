package com.lamborghini.repository;

import com.lamborghini.entity.TinTuc;
import com.lamborghini.enums.TrangThaiTinTuc;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface TinTucRepository extends JpaRepository<TinTuc, Integer> {
    List<TinTuc> findByTrangThaiOrderByNgayDangDesc(TrangThaiTinTuc trangThai, Pageable pageable);
}
