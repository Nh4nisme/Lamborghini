package com.lamborghini.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FieldValidationExcrption.class)
    public ResponseEntity<Map<String, Object>> handleFieldValidation(
            FieldValidationExcrption ex) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(AccountLockedException.class)
    public ResponseEntity<Map<String, Object>> handleAccountLocked(
            AccountLockedException ex) {

        return ResponseEntity
                .status(HttpStatus.LOCKED)
                .body(Map.of(
                        "message", "Tài khoản của bạn đang bị khóa",
                        "retryAfterSeconds", ex.getRetryAfterSeconds()
                ));
    }
}