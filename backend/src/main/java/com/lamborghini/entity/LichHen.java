package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lamborghini.enums.LoaiLichHen;
import com.lamborghini.enums.TrangThaiLichHen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table( name = "lich_hen")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LichHen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_lich_hen")
    private Integer maLichHen;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_lich_hen")
    private LoaiLichHen loaiLichHen;

    @Column(name = "thoi_gian_hen")
    private LocalDateTime thoiGianHen;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiLichHen trangThaiLichHen;

    @Column(name = "ly_do_tu_choi")
    private String lyDoTuChoi;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Column(name = "ho_ten_lien_he")
    private String hoTenLienHe;

    @Column(name = "sdt_lien_he")
    private String sdtLienHe;

    @Column(name = "email_lien_he")
    private String emailLienHe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "ma_showroom")
    private Showroom showroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "ma_xe")
    private Xe xe;

}

