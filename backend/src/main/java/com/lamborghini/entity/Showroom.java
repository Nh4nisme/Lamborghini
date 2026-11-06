package com.lamborghini.entity;

import com.lamborghini.enums.TrangThaiShowroom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

@Entity
@Table( name = "showroom")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Showroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_showroom")
    private Integer maShowroom;

    @Column(name = "ten_showroom")
    private String tenShowroom;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "khu_vuc")
    private String khuVuc;

    @Column(name = "gio_mo_cua")
    private Time gioMoCua;

    @Column(name = "gio_dong_cua")
    private Time gioDongCua;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiShowroom trangThai;




}
