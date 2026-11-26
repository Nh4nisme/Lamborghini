package com.lamborghini.dto.login.response;

public record LockedResponse(int status, String message, long retryAfterSeconds) {
}
