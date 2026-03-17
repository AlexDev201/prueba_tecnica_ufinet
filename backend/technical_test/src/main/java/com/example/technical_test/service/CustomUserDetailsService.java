package com.example.technical_test.service;

import com.example.technical_test.entity.User;
import com.example.technical_test.exceptions.UsernameDoestNotExistsException;
import com.example.technical_test.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameDoestNotExistsException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameDoestNotExistsException("User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .build();
    }
}
