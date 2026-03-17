package com.example.technical_test.mapper;

import com.example.technical_test.dto.UserRegisterRequestDTO;
import com.example.technical_test.dto.UserRegisterResponseDTO;
import com.example.technical_test.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserRegisterResponseDTO toDto(User user) {
        return new UserRegisterResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone()
        );
    }

    public User toEntity(UserRegisterRequestDTO dto){
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword());
        return user;
    }



}
