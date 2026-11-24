package com.lamborghini.repository;

import com.lamborghini.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    // dùng để kiểm tra xem db đã có email này chưa (check tồn tại)
    boolean existsByEmailIgnoreCase(String email);

    // tìm tài khoản theo email
    TaiKhoan findByEmailIgnoreCase(String email);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE tai_khoan t\n" +
            "SET t.sl_nhap_sai = t.sl_nhap_sai + 1\n" +
            "WHERE t.ma_tk = :id\n", nativeQuery = true)
    int tangSoLanSai(@Param("id") Integer id);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE tai_khoan t\n" +
            "SET t.thoi_gian_mo_khoa = :den,\n" +
            "t.sl_nhap_sai = 0\n" +
            "WHERE t.ma_tk = :id\n" +
            "AND t.sl_nhap_sai >= :toiDa\n",nativeQuery = true)
    int khoaTamThoi(@Param("id") Integer id, @Param("den")LocalDateTime den,@Param("toiDa") Integer toiDa);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE tai_khoan t\n" +
            "SET t.sl_nhap_sai = 0,\n" +
            "t.thoi_gian_mo_khoa = null\n" +
            "WHERE t.ma_tk = :id\n" +
            "\n", nativeQuery = true)
    int datLaiKhiDangNhapDung(@Param("id") Integer id);
}
