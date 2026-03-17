package com.example.technical_test.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "brand", nullable = false )
    private String brand;
    @Column(name = "model", nullable = false )
    private String model;
    @Column(name = "year", nullable = false)
    private int year;
    @Column(name = "color", nullable = false)
    private String color;
    @Column(name = "car_plate", nullable = false, unique = true)
    private String carPlate;
    @Column(name = "image_url")
    private String imageUrl;
    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;
}
