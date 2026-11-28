package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "nhan_vien")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nv")
    private Integer maNV;

    @OneToOne
    @JoinColumn(name = "ma_tk")
    @JsonIgnore
    private TaiKhoan taiKhoan;

    @Column(name = "mo_ta_ngan")
    private String moTaNgan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "ma_showroom")
    private Showroom showroom;



}
