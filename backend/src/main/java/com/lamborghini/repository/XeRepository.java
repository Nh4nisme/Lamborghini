package com.lamborghini.repository;

import com.lamborghini.entity.Xe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface XeRepository extends JpaRepository<Xe, Integer> {
    Xe findFirstByDongXe_MaDongXe(Integer maDongXe);

    Xe findByMaXe(Integer maXe);

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
    // admin search tìm tất cả xe theo keyword
    @Query(value = "SELECT x.*\n" +
            "FROM xe x\n" +
            "WHERE\n" +
            "    LOWER(x.ten_phien_ban) LIKE LOWER(CONCAT('%', :keyword, '%'))\n" +
            "    OR CAST(x.gia_khoi_diem AS CHAR) LIKE CONCAT('%', :keyword, '%')\n" +
            "    OR LOWER(x.trang_thai) LIKE LOWER(CONCAT('%', :keyword, '%'));", nativeQuery = true)
    List<Xe> adminSearchXe(@Param("keyword") String keyword);
}
