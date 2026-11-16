package com.lamborghini.exception;

public class FieldValidationExcrption extends RuntimeException{
    private final String field;
    public FieldValidationExcrption(String field, String message) {
        super(message);
        this.field = field;
    }
}
