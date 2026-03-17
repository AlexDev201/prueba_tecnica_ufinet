package com.example.technical_test.handler;

import com.example.technical_test.exceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameExists(UsernameAlreadyExistsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(409, ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(409).body(error);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleEmailExists(EmailAlreadyExistsException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(409, ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(409).body(error);
    }

    @ExceptionHandler(UsernameDoestNotExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUsernameDoestNotExists(UsernameDoestNotExistsException ex){
        ErrorResponseDTO error = new ErrorResponseDTO(404, ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(404).body(error);
    }

    @ExceptionHandler(UserNotAuthenticatedException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserNotAuthenticatedException(UserNotAuthenticatedException ex){
        ErrorResponseDTO error = new ErrorResponseDTO(403, ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(404).body(error);
    }

    @ExceptionHandler(PasswordIncorrectException.class)
    public ResponseEntity<ErrorResponseDTO> handlePasswordIncorrectException(PasswordIncorrectException ex){
        ErrorResponseDTO error = new ErrorResponseDTO(403, ex.getMessage(), LocalDateTime.now());
        return  ResponseEntity.status(403).body(error);
    }
}