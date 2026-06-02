package com.krishiai.dto;

import lombok.Data;

@Data
public class OTPVerifyRequest {
    private String phoneNumber;
    private String otpCode;
}
