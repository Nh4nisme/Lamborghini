package com.lamborghini.dto.response.login.response;

public record LockedResponse(int status, String message, long retryAfterSeconds) {
}
