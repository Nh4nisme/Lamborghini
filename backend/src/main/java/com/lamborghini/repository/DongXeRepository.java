package com.lamborghini.repository;

import com.lamborghini.entity.DongXe;
import com.lamborghini.enums.TrangThaiDongXe;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface DongXeRepository extends JpaRepository<DongXe, Integer> {

    // tìm dòng xe có trạng thái hiển thị và nổi bật true sắp xếp theo tên dòng xe
    List<DongXe> findByNoiBatTrueAndTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe trangThai, Pageable pageable);


    // tìm tất cả dòng xe có trạng thái hiển thị sắp xếp theo tên dòng xe
    List<DongXe> findAllByTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe trangThai);
}
