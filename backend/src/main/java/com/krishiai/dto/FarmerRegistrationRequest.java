package com.krishiai.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FarmerRegistrationRequest {
    private String name;
    private String email;
    private String phoneNumber;
    private String password;
    private BigDecimal defaultLandAreaHectares;
}
