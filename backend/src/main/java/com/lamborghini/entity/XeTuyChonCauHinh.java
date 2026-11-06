package com.lamborghini.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "xe_tuy_chon_cau_hinh")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class XeTuyChonCauHinh {
    @EmbeddedId
    private XeTuyChonCauHinhId xeTuyChonCauHinhId;

    @ManyToOne
    @MapsId("maXe")
    @JoinColumn(name = "ma_xe")
    private Xe xe;

    @ManyToOne
    @MapsId("maTuyChon")
    @JoinColumn(name = "ma_tuy_chon")
    private TuyChonCauHinh tuyChonCauHinh;


}
