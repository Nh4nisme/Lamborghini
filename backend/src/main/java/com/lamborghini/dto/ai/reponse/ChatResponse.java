package com.lamborghini.dto.ai.reponse;

import com.lamborghini.dto.ai.ThongTinLienQuan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ChatResponse {
    private String message;
    private String sessionId;
    private LocalDateTime timestamp;
    private List<ThongTinLienQuan> danhSachThongTin;
}
