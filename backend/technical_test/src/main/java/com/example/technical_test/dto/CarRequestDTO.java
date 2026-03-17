package com.example.technical_test.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CarRequestDTO {
    @NotBlank(message =  "Brand is required")
    private String brand;
    @NotBlank(message =  "Model is required")
    private String model;
    @NotNull
    private int year;
    @NotBlank(message = "Color is required")
    private String color;
    @NotBlank(message =  "Car plate is required")
    @Pattern(regexp = "^[A-Z]{3}[0-9]{3}$", message = "Car plate muest be in the fommat ABC123")
    private String carPlate;
    @NotBlank(message = "image url is required")
    private String imageUrl;
}
