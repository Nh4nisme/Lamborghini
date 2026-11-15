package com.lamborghini.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table( name = "xac_thuc_email")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class XacThucEmail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_xac_thuc")
    private Integer maXacThuc;

    private String email;

    @Column(name = "ma_otp_hash")
    private String maOTPHash;

    @Column(name = "het_han")
    private LocalDateTime hetHan;

    @Column(name = "so_lan_thu")
    private Integer soLanThu;

    @Column(name = "xac_thuc_luc")
    private LocalDateTime xacThucLuc;

    @Column(name = "token_hash")
    private String tokenHash;

    @Column(name = "da_dung_luc")
    private LocalDateTime daDungLuc;

    @CreationTimestamp
    @Column(name = "ngay_tao", updatable = false)
    private LocalDateTime ngayTao;


}
