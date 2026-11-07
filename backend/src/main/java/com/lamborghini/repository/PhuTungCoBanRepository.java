package com.lamborghini.repository;

import com.lamborghini.entity.PhuTungCoBan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhuTungCoBanRepository extends JpaRepository<PhuTungCoBan, Integer> {
    List<PhuTungCoBan> findByXe_MaXe(Integer maXe);
}
