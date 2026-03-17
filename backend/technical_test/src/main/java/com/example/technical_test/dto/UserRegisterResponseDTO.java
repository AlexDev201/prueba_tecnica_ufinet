package com.example.technical_test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterResponseDTO {
    private long id;
    private String fistName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
}
