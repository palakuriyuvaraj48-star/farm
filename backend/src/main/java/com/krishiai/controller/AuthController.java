package com.krishiai.controller;

import com.krishiai.dto.LoginResponse;
import com.krishiai.dto.OTPRequest;
import com.krishiai.dto.OTPVerifyRequest;
import com.krishiai.service.OTPService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final OTPService otpService;

    public AuthController(OTPService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Void> sendOtp(@RequestBody OTPRequest request) {
        otpService.sendOtp(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@RequestBody OTPVerifyRequest request) {
        LoginResponse resp = otpService.verifyOtp(request);
        return ResponseEntity.ok(resp);
    }
}
