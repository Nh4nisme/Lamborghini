package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table( name = "khach_hang")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_kh")
    private Integer maKhachHang;

    @OneToOne
    @JoinColumn(name = "ma_tk")
    @JsonIgnore
    private TaiKhoan taiKhoan;

    @OneToMany(mappedBy = "khachHang")
    @JsonIgnore
    private List<CauHinh> danhSachCauHinh;


    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "ngay_sinh")
    private LocalDateTime ngaySinh;

}
