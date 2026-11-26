package com.lamborghini.dto.dangky.reponse;

public record VerifyEmailResponse(String email, String verifycationToken, int hieuLucPhut, String thongBao) {
}
