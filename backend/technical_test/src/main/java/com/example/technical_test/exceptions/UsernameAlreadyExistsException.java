package com.example.technical_test.exceptions;


public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String message){
        super(message);
    }
}
