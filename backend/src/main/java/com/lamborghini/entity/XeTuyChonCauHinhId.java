package com.lamborghini.entity;


import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class XeTuyChonCauHinhId implements Serializable {
    private Integer maXe;
    private Integer maTuyChon;
}
