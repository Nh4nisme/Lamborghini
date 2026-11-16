package com.lamborghini.repository;

import com.lamborghini.entity.XacThucEmail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;

public interface XacThucEmailRepository extends JpaRepository<XacThucEmail, Integer> {

    // trả về email đầu tiên với mã OTP được sắp xếp giảm dần
    XacThucEmail findTopByEmailOrderByMaXacThucDesc(String email);

    // dùng để đếm số bản ghi có email tương ứng và thời gian tạo lớn hơn thời điểm tu truyền vào: giới hạn số lần gửi OTP
    long countByEmailAndNgayTaoAfter(String email, LocalDateTime tu);

    // tìm thông qua token hash
    XacThucEmail findByTokenHash(String tokenHash);


    // nếu có mã mới thì vô hiệu hóa toàn bộ mã cũ
    @Modifying
    @Query(value = "UPDATE xac_thuc_email x\n" +
            "SET x.het_han = :now\n" +
            "WHERE x.email = :email\n" +
            "AND x.xac_thuc_luc IS NULL\n" +
            "AND x.het_han > :now", nativeQuery = true)
    int voHieuHoaMaCu(@Param("email") String email, @Param("now") LocalDateTime now);

    @Modifying
    @Query(value = "UPDATE xac_thuc_email x\n" +
            "SET x.so_lan_thu = x.so_lan_thu + 1\n" +
            "WHERE x.ma_xac_thuc = :id \n" +
            "AND x.so_lan_thu < :toiDa", nativeQuery = true)
    int tieuMotLanThu(@Param("id") Integer id, @Param("toiDa") int toiDa);

    @Modifying
    @Query(value = "UPDATE xac_thuc_email x   \n" +
            "SET x.xac_thuc_luc = :now,\n" +
            "x.token_hash = :hash      \n" +
            "WHERE x.ma_xac_thuc = :id \n" +
            "AND x.xac_thuc_luc IS null", nativeQuery = true)
    int danhDauDaXacThuc(@Param("id") Integer id, @Param("now") LocalDateTime now, @Param("hash") String hash);

    @Modifying
    @Query(value = "UPDATE xac_thuc_email x\n" +
            "SET x.da_dung_luc = :now\n" +
            "WHERE x.ma_xac_thuc = :id\n" +
            "AND x.da_dung_luc IS NULL", nativeQuery = true)
    int danhDauDaDung(@Param("id") Integer id, @Param("now") LocalDateTime now);



}
