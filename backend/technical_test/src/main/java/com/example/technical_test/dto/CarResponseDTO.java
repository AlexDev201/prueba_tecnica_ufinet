package com.example.technical_test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor

public class CarResponseDTO {
    private Long id;
    private String brand;
    private String model;
    private int year;
    private String color;
    private String carPlate;
    private String imageUrl;
}
