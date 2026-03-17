package com.example.technical_test.exceptions;

public class UserNotAuthenticatedException extends RuntimeException {
    public UserNotAuthenticatedException(String message){
        super(message);
    }
}
