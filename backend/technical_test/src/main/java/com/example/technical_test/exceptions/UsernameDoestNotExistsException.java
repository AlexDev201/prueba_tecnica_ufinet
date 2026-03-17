package com.example.technical_test.exceptions;

public class UsernameDoestNotExistsException extends RuntimeException{
    public UsernameDoestNotExistsException(String message){
        super(message);
    }
}
