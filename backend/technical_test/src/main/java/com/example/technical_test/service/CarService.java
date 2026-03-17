package com.example.technical_test.service;

import com.example.technical_test.dto.CarRequestDTO;
import com.example.technical_test.dto.CarResponseDTO;
import com.example.technical_test.entity.Car;
import com.example.technical_test.entity.User;
import com.example.technical_test.exceptions.UserNotAuthenticatedException;
import com.example.technical_test.exceptions.UsernameDoestNotExistsException;
import com.example.technical_test.mapper.CarMapper;
import com.example.technical_test.repository.CarRepository;
import com.example.technical_test.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    private final UserRepository userRepository;
    private final CarMapper carMapper;
    private final CarRepository carRepository;

    public CarService(UserRepository userRepository, CarMapper carMapper, CarRepository carRepository ){
        this.carMapper = carMapper;
        this.carRepository=carRepository;
        this.userRepository= userRepository;
    }

    public CarResponseDTO createCar(CarRequestDTO carRequestDTO){
        Car car = carMapper.toEntity(carRequestDTO);
        car.setUser(getAuthenticatedUser());
        Car carSaved = carRepository.save(car);
        return carMapper.toDto(carSaved);
    }

    public List<CarResponseDTO> getAllCars(){
        return carRepository.findAll()
                .stream()
                .map(carMapper::toDto)
                .toList();
    }

    public CarResponseDTO getCarById(Long id){
        return carRepository.findById(id)
                .map(carMapper::toDto)
                .orElse(null);
    }

    public CarResponseDTO getCatByCarPlate(String carPlate){
        return carRepository.findByCarPlate(carPlate)
                .map(carMapper::toDto)
                .orElse(null);
    }

    public CarResponseDTO updateCar(Long id, CarRequestDTO carRequestDTO){
        Car existingCar = carRepository.findById(id).orElse(null);
        if(existingCar != null){
            existingCar.setBrand(carRequestDTO.getBrand());
            existingCar.setCarPlate(carRequestDTO.getCarPlate());
            existingCar.setModel(carRequestDTO.getModel());
            existingCar.setYear(carRequestDTO.getYear());
            existingCar.setColor(carRequestDTO.getColor());
            existingCar.setCarPlate(carRequestDTO.getCarPlate());
            existingCar.setImageUrl(carRequestDTO.getImageUrl());
            Car carSaved = carRepository.save(existingCar);
            return carMapper.toDto(carSaved);
        }

        return null;
    }

    public void deleteCar(Long id){
        carRepository.deleteById(id);
    }

    private User getAuthenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()){
            throw new UserNotAuthenticatedException("User not authenticated");
        }

        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameDoestNotExistsException("Username not foubd"));

    }
}
