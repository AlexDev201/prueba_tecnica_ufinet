package com.example.technical_test.repository;

import com.example.technical_test.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional <Car> findByCarPlate(String carPlate);
    boolean existsByCarPlate(String plate);

}
