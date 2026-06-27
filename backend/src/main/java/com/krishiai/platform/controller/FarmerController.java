package com.krishiai.platform.controller;

import com.krishiai.platform.entity.Farmer;
import com.krishiai.platform.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farmers")
@CrossOrigin(origins = "*") // For development purposes
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @GetMapping
    public List<Farmer> getAllFarmers() {
        return farmerRepository.findAll();
    }

    @PostMapping
    public Farmer registerFarmer(@RequestBody Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Farmer> getFarmerById(@PathVariable UUID id) {
        return farmerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
