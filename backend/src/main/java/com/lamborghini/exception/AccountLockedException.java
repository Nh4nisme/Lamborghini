package com.lamborghini.exception;

import lombok.Getter;

@Getter
public class  AccountLockedException extends RuntimeException {
    private final long retryAfterSeconds;   // còn bao nhiêu giây nữa mới thử lại được

    public AccountLockedException(long retryAfterSeconds) {
        this.retryAfterSeconds = retryAfterSeconds;
    }

}
