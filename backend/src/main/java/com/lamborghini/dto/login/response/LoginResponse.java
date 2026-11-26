package com.lamborghini.dto.login.response;

public record LoginResponse(String accessToken, String tokenType, long hetHanSauGiay, UserInfo nguoiDung, String redirectTo) {
}
