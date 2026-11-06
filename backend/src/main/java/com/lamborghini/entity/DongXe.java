package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lamborghini.enums.TrangThaiDongXe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table( name = "dong_xe")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DongXe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_dong_xe")
    private Integer maDongXe;

    @Column(name = "ten_dong_xe")
    private String tenDongXe;

    @Column(name = "danh_muc")
    private String danhMuc;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private TrangThaiDongXe trangThai;

    @Column(name = "noi_bat")
    private boolean noiBat;


    @OneToMany(mappedBy = "dongXe")
    @JsonIgnore
    private List<Xe> danhSachXe;
}
