
package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cau_hinh")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CauHinh {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_cau_hinh")
    private Integer maCauHinh;

    @Column(name = "ten_cau_hinh")
    private String tenCauHinh;

    @Column(name = "tong_gia")
    private Long tongGia;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Column(name = "ma_chia_se")
    private String maChiaSe;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "ma_kh")
    private KhachHang khachHang;

    @OneToOne(mappedBy = "cauHinh", fetch = FetchType.LAZY)
    @JsonIgnore
    private ChiTietCauHinh chiTietCauHinh;




}
