package com.lamborghini.repository;

import com.lamborghini.dto.lichhen.response.KhachHangLichHen;
import com.lamborghini.entity.LichHen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LichHenRepository extends JpaRepository<LichHen, Integer> {
    
    @Query("SELECT lh FROM LichHen lh WHERE lh.emailLienHe = :email ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findByEmailLienHe(@Param("email") String email);
    
    @Query("SELECT lh FROM LichHen lh JOIN FETCH lh.showroom JOIN FETCH lh.xe WHERE lh.showroom.maShowroom = :maShowroom ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findByShowroom(@Param("maShowroom") Integer maShowroom);
    
    @Query("SELECT lh FROM LichHen lh JOIN FETCH lh.showroom JOIN FETCH lh.xe WHERE lh.maLichHen = :id")
    LichHen findByIdWithDetails(@Param("id") Integer id);
    
    @Query("SELECT DISTINCT lh FROM LichHen lh LEFT JOIN FETCH lh.khachHang kh LEFT JOIN FETCH kh.taiKhoan LEFT JOIN FETCH lh.xe x LEFT JOIN FETCH x.dongXe WHERE lh.showroom.maShowroom = :maShowroom ORDER BY lh.thoiGianHen DESC")
    List<LichHen> findCustomersByShowroom(@Param("maShowroom") Integer maShowroom);

    // cau truy van nang cao: lien he huu tien
    @Query(value = "SELECT\n" +
            "    ds.ho_ten_lien_he,\n" +
            "    ds.email_lien_he,\n" +
            "    ds.sdt_lien_he,\n" +
            "    x.ten_phien_ban AS tenXe,\n" +
            "    ds.thoi_gian_hen\n" +
            "FROM (\n" +
            "    SELECT\n" +
            "        lh.*,\n" +
            "        ROW_NUMBER() OVER (\n" +
            "            PARTITION BY\n" +
            "                lh.ma_kh,\n" +
            "                CASE\n" +
            "                    WHEN lh.ma_kh IS NULL THEN lh.ma_lich_hen\n" +
            "                    ELSE 0\n" +
            "                END\n" +
            "            ORDER BY\n" +
            "                CASE\n" +
            "                    WHEN lh.thoi_gian_hen >= NOW() THEN 0\n" +
            "                    ELSE 1\n" +
            "                END ASC,\n" +
            "\n" +
            "                CASE\n" +
            "                    WHEN lh.thoi_gian_hen >= NOW()\n" +
            "                    THEN lh.thoi_gian_hen\n" +
            "                END ASC,\n" +
            "\n" +
            "                CASE\n" +
            "                    WHEN lh.thoi_gian_hen < NOW()\n" +
            "                    THEN lh.thoi_gian_hen\n" +
            "                END DESC,\n" +
            "\n" +
            "                lh.ma_lich_hen DESC\n" +
            "        ) AS rn\n" +
            "    FROM lich_hen lh\n" +
            "    WHERE lh.ma_nv = :maNV\n" +
            ") AS ds\n" +
            "LEFT JOIN xe x ON ds.ma_xe = x.ma_xe\n" +
            "WHERE ds.rn = 1\n" +
            "ORDER BY ds.thoi_gian_hen ASC;", nativeQuery = true)
    List<KhachHangLichHen> getDanhSachKhachHangCuaDealer(@Param("maNV") Integer maNV);
}
