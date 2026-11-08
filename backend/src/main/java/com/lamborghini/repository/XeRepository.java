package com.lamborghini.repository;

import com.lamborghini.dto.response.ModelDetailResponse;
import com.lamborghini.entity.Xe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface XeRepository extends JpaRepository<Xe, Integer> {
    Xe findFirstByDongXe_MaDongXe(Integer maDongXe);

    // UC007: tìm kiếm xe theo các tiêu chí có thể null gồm dòng xe, tên phiên bản và khoảng giá tiền
    @Query(value = """
        SELECT x.*
        FROM xe x
        JOIN dong_xe d ON d.ma_dong_xe = x.ma_dong_xe
        WHERE (d.ma_dong_xe = :maDongXe)
          AND ( NULLIF(TRIM(:keyword), '') IS NULL
                OR LOWER(x.ten_phien_ban) LIKE CONCAT(LOWER(TRIM(:keyword)), '%')
                OR TRIM(REPLACE(LOWER(x.ten_phien_ban), LOWER(d.ten_dong_xe), ''))
                       LIKE CONCAT('%', LOWER(TRIM(:keyword)), '%') )
          AND (:minPrice IS NULL OR x.gia_khoi_diem >= :minPrice)
          AND (:maxPrice IS NULL OR x.gia_khoi_diem <= :maxPrice)
        ORDER BY x.gia_khoi_diem ASC
        """, nativeQuery = true)
    List<Xe> searchDanhSachXeTheoDongXeAndTenPhienAndKhoangGiaDuocSapXep(@Param("maDongXe") Integer maDongXe,
                      @Param("keyword") String keyword,
                      @Param("minPrice") BigInteger minPrice,
                      @Param("maxPrice") BigInteger maxPrice);
}
