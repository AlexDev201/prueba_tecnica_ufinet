package com.example.technical_test.mapper;

import com.example.technical_test.dto.CarRequestDTO;
import com.example.technical_test.dto.CarResponseDTO;
import com.example.technical_test.entity.Car;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {
    public CarResponseDTO toDto(Car car){
        return new CarResponseDTO(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getColor(),
                car.getCarPlate(),
                car.getImageUrl()
        );
    }

    public Car toEntity(CarRequestDTO carRequestDTO){
        Car car = new Car();
        car.setBrand(carRequestDTO.getBrand());
        car.setModel(carRequestDTO.getModel());
        car.setYear(carRequestDTO.getYear());
        car.setColor(carRequestDTO.getColor());
        car.setCarPlate(carRequestDTO.getCarPlate());
        car.setImageUrl(carRequestDTO.getImageUrl());
        return car;
    }

}
