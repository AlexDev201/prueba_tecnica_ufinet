package com.example.technical_test.controller;

import com.example.technical_test.dto.CarRequestDTO;
import com.example.technical_test.dto.CarResponseDTO;
import com.example.technical_test.service.CarService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService){
        this.carService = carService;
    }
    @GetMapping()
    public ResponseEntity<List<CarResponseDTO>> getAllCars(){
        List<CarResponseDTO> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getCarById(@PathVariable Long id){
        CarResponseDTO car = carService.getCarById(id);
        if(car == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(car);
        }
    }
    @PostMapping("/create-car")
    public ResponseEntity<CarResponseDTO> createCar(@Valid @RequestBody CarRequestDTO carRequestDTO){
        return ResponseEntity.ok(carService.createCar(carRequestDTO));
    }

    @PutMapping("/update-car/{id}")
    public ResponseEntity<CarResponseDTO> updateCarPut(@PathVariable Long id, @RequestBody CarRequestDTO carRequestDTO){
        return ResponseEntity.ok(carService.updateCar(id,carRequestDTO));
    }
    @PatchMapping("/update-car/{id}")
    public ResponseEntity<CarResponseDTO> updateCar(@PathVariable Long id, @RequestBody CarRequestDTO carRequestDTO ){
        return ResponseEntity.ok(carService.updateCar(id,carRequestDTO));
    }

    @DeleteMapping("/delete-car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
