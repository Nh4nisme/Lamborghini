package com.lamborghini.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "khach_hang")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_kh")
    private Integer maKhachHang;

    @OneToOne
    @JoinColumn(name = "ma_tk")
    @JsonIgnore
    private TaiKhoan taiKhoan;

    // con dia chi voi ngay sinh


}
