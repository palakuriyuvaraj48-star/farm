package com.krishiai.controller;

import com.krishiai.dto.FarmerRegistrationRequest;
import com.krishiai.dto.FarmerResponse;
import com.krishiai.dto.LandDTO;
import com.krishiai.service.FarmerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/farmers")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @PostMapping("/register")
    public ResponseEntity<FarmerResponse> register(@RequestBody FarmerRegistrationRequest request) {
        FarmerResponse resp = farmerService.registerFarmer(request);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FarmerResponse> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(farmerService.getFarmerById(id));
    }

    @PostMapping("/{id}/lands")
    public ResponseEntity<FarmerResponse> addLand(@PathVariable("id") Long id, @RequestBody LandDTO landDTO) {
        return ResponseEntity.ok(farmerService.addLand(id, landDTO));
    }
}
