package com.lamborghini.repository;

import com.lamborghini.entity.TuyChonCauHinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TuyChonCauHinhRepository extends JpaRepository<TuyChonCauHinh, Integer> {

    //UC004: dùng để lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn

    @Query(value = "SELECT t.*, xt.ma_xe\n" +
            "FROM xe_tuy_chon_cau_hinh xt\n" +
            "LEFT JOIN tuy_chon_cau_hinh t ON xt.ma_tuy_chon = t.ma_tuy_chon\n" +
            "LEFT JOIN xe x ON xt.ma_xe = x.ma_xe\n" +
            "WHERE xt.ma_xe = :maXe \n" +
            "AND t.nhom_tuy_chon = :maNhomTuyChon\n" +
            "ORDER BY t.ten_tuy_chon asc", nativeQuery = true)
    List<TuyChonCauHinh> getDanhSachTuyChonCuaXeTheoMaNhomTuyChon(
            @Param("maXe") Integer maXe,
            @Param("maNhomTuyChon") Integer maNhomTuyChon
            );

    //UC004.2: dùng để lấy các màu tùy chọn của xe theo loại màu
    @Query(value = "SELECT t.*\n" +
            "FROM xe_tuy_chon_cau_hinh xt\n" +
            "LEFT JOIN tuy_chon_cau_hinh t ON xt.ma_tuy_chon = t.ma_tuy_chon\n" +
            "LEFT JOIN xe x ON x.ma_xe = xt.ma_xe\n" +
            "WHERE t.nhom_tuy_chon = 1\n" +
            "AND x.ma_xe = :maXe\n" +
            "AND t.thuoc_tinh_phu = :loaiMau\n" +
            "ORDER BY t.ten_tuy_chon asc",nativeQuery = true)

    // dùng để lấy màu của xe theo loại màu được truền vào
    List<TuyChonCauHinh> getDanhSachMauCuaXeTheoLoaiMau(
            @Param("maXe") Integer maXe,
            @Param("loaiMau") String loaiMau
    );



}
