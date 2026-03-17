package com.example.technical_test.exceptions;

public class PasswordIncorrectException extends RuntimeException{
    public PasswordIncorrectException(String message){
        super(message);
    }
}
