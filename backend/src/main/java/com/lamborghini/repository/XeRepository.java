package com.lamborghini.repository;

import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.Xe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface XeRepository extends JpaRepository<Xe, Integer> {
    Xe findFirstByDongXe_MaDongXe(Integer maDongXe);
}
