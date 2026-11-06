package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lamborghini.enums.TrangThaiXe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.util.List;

@Entity
@Table( name = "xe")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Xe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_xe")
    private Integer maXe;

    @Column(name = "ten_phien_ban")
    private String tenPhienBan;

    @Column(name = "gia_khoi_diem")
    private BigInteger giaKhoiDiem;

    @Column(name = "dong_co")
    private String dongCo;

    @Column(name = "cong_suat")
    private Integer congSuat;

    @Column(name = "toc_do_toi_da")
    private Integer tocDoToiDa;

    @Column(name = "hinh_anh")
    private String hinhAnh;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private TrangThaiXe trangThai;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_dong_xe")
    private DongXe dongXe;

    @OneToMany(mappedBy = "xe")
    @JsonIgnore
    private List<XeTuyChonCauHinh> danhSachTuyChon;

}
