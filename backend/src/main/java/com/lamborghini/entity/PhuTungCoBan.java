package com.lamborghini.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "phu_tung_co_ban")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PhuTungCoBan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_phu_tung")
    private Integer maPhuTung;

    @Column(name = "ten_phu_tung")
    String tenPhuTung;

    @Column(name = "mo_ta")
    String moTa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_xe")
    private Xe xe;
}
