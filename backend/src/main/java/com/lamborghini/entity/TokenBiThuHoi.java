package com.lamborghini.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table( name = "token_bi_thu_hoi")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TokenBiThuHoi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_token")
    private Integer maToken;

    @Column(name = "ma_dinh_danh_token")
    private String maDinhDanhToken;

    @Column(name = "thoi_gian_het_han")
    private LocalDateTime thoiGianHetHan;

    @CreationTimestamp
    @Column(name = "ngay_dang_xuat", updatable = false)
    private LocalDateTime ngayDangXuat;



}
