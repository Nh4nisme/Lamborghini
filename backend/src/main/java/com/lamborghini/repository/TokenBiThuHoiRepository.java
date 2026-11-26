package com.lamborghini.repository;

import com.lamborghini.entity.TokenBiThuHoi;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface TokenBiThuHoiRepository extends JpaRepository<TokenBiThuHoi, Integer> {


    // dùng để kiểm tra xem JWT đã bị thu hồi chưa
    boolean existsByMaDinhDanhToken(String jti);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM token_bi_thu_hoi t\n" +
            "WHERE t.thoi_gian_het_han < :now", nativeQuery = true)
    void xoaTokenHetHan(@Param("now")LocalDateTime now);
}
