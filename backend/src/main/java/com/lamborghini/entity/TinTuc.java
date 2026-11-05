package com.lamborghini.entity;

import com.lamborghini.enums.LoaiTinTuc;
import com.lamborghini.enums.TrangThaiTinTuc;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table( name = "tin_tuc")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TinTuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tin_tuc")
    private Integer maTinTuc;

    @Column(name = "tieu_de")
    private String tieuDe;

    @Column(name = "noi_dung")
    private String noiDung;

    @Column(name = "hinh_anh")
    private String hinhAnh;

    @Enumerated(EnumType.STRING)
    private LoaiTinTuc loai;

    @Column(name = "ngay_dang")
    private LocalDateTime ngayDang;

    @Column(name = "trang_thai")
    @Enumerated(EnumType.STRING)
    private TrangThaiTinTuc trangThai;

    // con @ManyToOneQuanTri


}
