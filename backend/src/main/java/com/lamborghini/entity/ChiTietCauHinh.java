package com.lamborghini.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "chi_tiet_cau_hinh")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ChiTietCauHinh {

    @Id
    @Column(name = "ma_cau_hinh")
    private Integer maCauHinh;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "ma_cau_hinh")
    private CauHinh cauHinh;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_xe", nullable = false)
    private Xe xe;

    @Column(name = "ma_tuy_chon", nullable = false)
    private String maTuyChon;

    @Column(name = "gia_tai_thoi_diem_chon")
    private Long giaTaiThoiDiemChon;



}
