package com.example.technical_test.service;

import com.example.technical_test.config.JwtService;
import com.example.technical_test.dto.LoginRequestDTO;
import com.example.technical_test.dto.LoginResponseDTO;
import com.example.technical_test.dto.UserRegisterRequestDTO;
import com.example.technical_test.dto.UserRegisterResponseDTO;
import com.example.technical_test.entity.User;
import com.example.technical_test.exceptions.EmailAlreadyExistsException;
import com.example.technical_test.exceptions.PasswordIncorrectException;
import com.example.technical_test.exceptions.UsernameAlreadyExistsException;
import com.example.technical_test.exceptions.UsernameDoestNotExistsException;
import com.example.technical_test.mapper.UserMapper;
import com.example.technical_test.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      UserMapper userMapper,
                      AuthenticationManager authenticationManager,
                      JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public UserRegisterResponseDTO userRegister(UserRegisterRequestDTO userRegisterRequestDTO){
        if(userRepository.existsByUsername(userRegisterRequestDTO.getUsername())){
            throw new UsernameAlreadyExistsException(
                    "Username already exists  " + userRegisterRequestDTO.getUsername()
            );
        }
        if (userRepository.existsByEmail(userRegisterRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException(
                    "Email '" + userRegisterRequestDTO.getEmail() + "' is already taken");
        }

        User user = userMapper.toEntity(userRegisterRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User userSaved = userRepository.save(user);
        return userMapper.toDto(userSaved);
    }

    public LoginResponseDTO userLogin(LoginRequestDTO loginRequestDTO){
        if(!userRepository.existsByUsername(loginRequestDTO.getUsername())){
            throw new UsernameDoestNotExistsException(
                    "Usernname" + loginRequestDTO.getUsername() + "does not exists"
            );
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getUsername(),
                            loginRequestDTO.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new PasswordIncorrectException("Incorrect password");
        }

        User user = userRepository.findByUsername(loginRequestDTO.getUsername())
                .orElseThrow(() -> new UsernameDoestNotExistsException(
                        "Username '" + loginRequestDTO.getUsername() + "' does not exits"));

        String token = jwtService.generateToken(user);

        return new LoginResponseDTO(token, userMapper.toDto(user));
    }
    }

