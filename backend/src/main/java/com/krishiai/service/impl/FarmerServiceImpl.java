package com.krishiai.service.impl;

import com.krishiai.dto.FarmerRegistrationRequest;
import com.krishiai.dto.FarmerResponse;
import com.krishiai.dto.LandDTO;
import com.krishiai.model.Farmer;
import com.krishiai.model.Land;
import com.krishiai.model.User;
import com.krishiai.repository.FarmerRepository;
import com.krishiai.repository.LandRepository;
import com.krishiai.repository.UserRepository;
import com.krishiai.service.FarmerService;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class FarmerServiceImpl implements FarmerService {

    private final FarmerRepository farmerRepository;
    private final UserRepository userRepository;
    private final LandRepository landRepository;
    private final PasswordEncoder passwordEncoder;

    public FarmerServiceImpl(FarmerRepository farmerRepository, UserRepository userRepository, LandRepository landRepository, PasswordEncoder passwordEncoder) {
        this.farmerRepository = farmerRepository;
        this.userRepository = userRepository;
        this.landRepository = landRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public FarmerResponse registerFarmer(FarmerRegistrationRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();
        user = userRepository.save(user);

        Farmer farmer = Farmer.builder()
                .user(user)
                .name(request.getName())
                .phone(request.getPhoneNumber())
                .build();

        if (request.getDefaultLandAreaHectares() != null) {
            Land l = Land.builder().areaHectares(request.getDefaultLandAreaHectares()).farmer(farmer).build();
            farmer.getLands().add(l);
        }

        farmer = farmerRepository.save(farmer);

        return toResponse(farmer);
    }

    @Override
    public FarmerResponse getFarmerById(Long farmerId) {
        Farmer farmer = farmerRepository.findById(farmerId).orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
        return toResponse(farmer);
    }

    @Override
    @Transactional
    public FarmerResponse addLand(Long farmerId, LandDTO landDTO) {
        Farmer farmer = farmerRepository.findById(farmerId).orElseThrow(() -> new IllegalArgumentException("Farmer not found"));
        Land land = Land.builder()
                .farmer(farmer)
                .areaHectares(landDTO.getAreaHectares())
                .soilType(landDTO.getSoilType())
                .soilPh(landDTO.getSoilPh())
                .nitrogen(landDTO.getNitrogen())
                .phosphorus(landDTO.getPhosphorus())
                .potassium(landDTO.getPotassium())
                .waterSource(landDTO.getWaterSource())
                .irrigationType(landDTO.getIrrigationType())
                .season(landDTO.getSeason())
                .build();
        land = landRepository.save(land);
        farmer.getLands().add(land);
        farmerRepository.save(farmer);
        return toResponse(farmerRepository.findById(farmerId).orElseThrow());
    }

    private FarmerResponse toResponse(Farmer f) {
        return FarmerResponse.builder()
                .farmerId(f.getFarmerId())
                .name(f.getName())
                .phone(f.getPhone())
                .email(f.getUser() != null ? f.getUser().getEmail() : null)
                .isOrganic(f.getIsOrganic())
                .lands(f.getLands().stream().map(l -> {
                    com.krishiai.dto.LandDTO dto = new com.krishiai.dto.LandDTO();
                    dto.setLandId(l.getLandId());
                    dto.setAreaHectares(l.getAreaHectares());
                    dto.setSoilType(l.getSoilType());
                    dto.setSoilPh(l.getSoilPh());
                    dto.setNitrogen(l.getNitrogen());
                    dto.setPhosphorus(l.getPhosphorus());
                    dto.setPotassium(l.getPotassium());
                    dto.setWaterSource(l.getWaterSource());
                    dto.setIrrigationType(l.getIrrigationType());
                    dto.setSeason(l.getSeason());
                    return dto;
                }).collect(Collectors.toSet()))
                .createdAt(f.getCreatedAt())
                .updatedAt(f.getUpdatedAt())
                .build();
    }
}
