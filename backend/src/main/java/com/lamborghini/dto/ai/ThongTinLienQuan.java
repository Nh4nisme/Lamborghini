package com.lamborghini.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ThongTinLienQuan {
    private String type; // "dongxe", "xe", "tintuc", "showroom"
    private Integer id;
    private String title;
    private String description;
    private String imageUrl;
}
