package com.krishiai.service;

import com.krishiai.dto.LoginResponse;
import com.krishiai.dto.OTPVerifyRequest;
import com.krishiai.dto.OTPRequest;

public interface OTPService {
    void sendOtp(OTPRequest request);
    LoginResponse verifyOtp(OTPVerifyRequest request);
}
