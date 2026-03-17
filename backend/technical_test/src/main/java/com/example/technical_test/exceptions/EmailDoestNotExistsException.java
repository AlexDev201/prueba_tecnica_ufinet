package com.example.technical_test.exceptions;

public class EmailDoestNotExistsException extends  RuntimeException{
    public EmailDoestNotExistsException(String message){
        super(message);
    }
}
