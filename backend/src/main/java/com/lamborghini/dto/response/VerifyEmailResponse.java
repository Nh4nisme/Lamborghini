package com.lamborghini.dto.response;

public record VerifyEmailResponse(String email, String verifycationToken, int hieuLucPhut, String thongBao) {
}
