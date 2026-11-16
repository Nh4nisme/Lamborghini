package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lamborghini.enums.TrangThaiTaiKhoan;
import com.lamborghini.enums.VaiTro;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table( name = "tai_khoan")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tk")
    private Integer maTaiKhoan;

    @Column(name = "ho_ten")
    private String hoTen;

    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    private String sdt;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private TrangThaiTaiKhoan trangThai;

    @Column(name = "sl_nhap_sai")
    private Integer slNhapSai;

    @Column(name = "thoi_gian_mo_khoa")
    private LocalDateTime thoiGianMoKhoa;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @OneToOne(mappedBy = "taiKhoan")
    @JsonIgnore
    private KhachHang khachHang;

}
