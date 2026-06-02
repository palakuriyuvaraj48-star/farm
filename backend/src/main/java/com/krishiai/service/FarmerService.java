package com.krishiai.service;

import com.krishiai.dto.FarmerRegistrationRequest;
import com.krishiai.dto.FarmerResponse;
import com.krishiai.dto.LandDTO;

public interface FarmerService {
    FarmerResponse registerFarmer(FarmerRegistrationRequest request);
    FarmerResponse getFarmerById(Long farmerId);
    FarmerResponse addLand(Long farmerId, LandDTO landDTO);
}
