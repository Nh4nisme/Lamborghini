package com.lamborghini.entity;


import com.lamborghini.enums.TrangThaiTuyChonCauHinh;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table( name = "tuy_chon_cau_hinh")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TuyChonCauHinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tuy_chon")
    private Integer maTuyChon;

    @Column(name = "nhom_tuy_chon")
    private Integer nhomTuyChon;

    @Column(name = "ten_tuy_chon")
    private String tenTuyChon;

    @Column(name = "thuoc_tinh_phu")
    private String thuocTinhPhu;

    @Column(name = "hinh_anh")
    private String hinhAnh;

    @Column(name = "gia_cong_them")
    private BigInteger giaCongThem;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiTuyChonCauHinh trangThai;

    @Column(name = "ten_nhom_tuy_chon")
    private String tenNhomTuyChon;


}
