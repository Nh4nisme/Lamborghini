package com.lamborghini.repository;

import com.lamborghini.entity.DongXe;
import com.lamborghini.enums.TrangThaiDongXe;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DongXeRepository extends JpaRepository<DongXe, Integer> {

    // tìm dòng xe có trạng thái hiển thị và nổi bật true sắp xếp theo tên dòng xe
    List<DongXe> findByNoiBatTrueAndTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe trangThai, Pageable pageable);


    // tìm tất cả dòng xe có trạng thái hiển thị sắp xếp theo tên dòng xe
    List<DongXe> findAllByTrangThaiOrderByTenDongXeAsc(TrangThaiDongXe trangThai);

    // search của admin, tìm các dòng xe theo keyword
    @Query(value = "SELECT d.*\n" +
            "FROM dong_xe d\n" +
            "WHERE \n" +
            "LOWER(d.ten_dong_xe) LIKE LOWER(CONCAT('%', :keyword, '%'))\n" +
            "OR LOWER(d.danh_muc) LIKE LOWER(CONCAT('%', :keyword, '%'))\n" +
            "OR LOWER(d.trang_thai) LIKE LOWER(CONCAT('%', :keyword, '%'))", nativeQuery = true)
    List<DongXe> adminSearchDongXe(@Param("keyword") String keyword);

    // tìm tất cả dòng xe có trạng thái hiển thị phục vụ riêng cho chức năng AI Assistant
    List<DongXe> findByTrangThai(TrangThaiDongXe trangThai);
}
