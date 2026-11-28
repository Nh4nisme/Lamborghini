package com.lamborghini.dto.ai.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    @NotBlank(message = "Tin nhắn không được để trống")
    @Size(max = 500, message = "Tin nhắn tối đa 500 ký tự")

    private String message;

    // Mã phiên để theo dõi cuộc hội thoại
    private String sessionId;

}
