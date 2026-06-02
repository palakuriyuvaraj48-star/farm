package com.krishiai.service.impl;

import com.krishiai.dto.LoginResponse;
import com.krishiai.dto.OTPVerifyRequest;
import com.krishiai.dto.OTPRequest;
import com.krishiai.model.User;
import com.krishiai.model.UserOTP;
import com.krishiai.repository.UserRepository;
import com.krishiai.repository.UserOTPRepository;
import com.krishiai.service.OTPService;
import com.krishiai.util.OTPUtil;
import com.krishiai.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class OTPServiceImpl implements OTPService {

    private static final Logger log = LoggerFactory.getLogger(OTPServiceImpl.class);

    private final UserRepository userRepository;
    private final UserOTPRepository userOTPRepository;
    private final JwtUtil jwtUtil;

    @Value("${krishiai.otp.ttl.minutes:5}")
    private long otpTtlMinutes;

    public OTPServiceImpl(UserRepository userRepository, UserOTPRepository userOTPRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.userOTPRepository = userOTPRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    @Transactional
    public void sendOtp(OTPRequest request) {
        String phone = request.getPhoneNumber();
        User user = userRepository.findByPhoneNumber(phone).orElseGet(() -> {
            User u = User.builder().phoneNumber(phone).email(phone + "@noemail.local").passwordHash("").build();
            return userRepository.save(u);
        });

        String code = OTPUtil.generateNumericOtp(6);
        UserOTP otp = UserOTP.builder()
                .user(user)
                .phoneNumber(phone)
                .otpCode(code)
                .expiresAt(LocalDateTime.now().plus(otpTtlMinutes, ChronoUnit.MINUTES))
                .isUsed(false)
                .build();
        userOTPRepository.save(otp);

        // TODO: integrate real SMS gateway; for now log the OTP.
        log.info("[STUB SMS] Sending OTP {} to {} (expires in {} minutes)", code, phone, otpTtlMinutes);
    }

    @Override
    @Transactional
    public LoginResponse verifyOtp(OTPVerifyRequest request) {
        String phone = request.getPhoneNumber();
        String code = request.getOtpCode();
        UserOTP otp = userOTPRepository.findTopByPhoneNumberAndOtpCodeOrderByCreatedAtDesc(phone, code)
                .orElseThrow(() -> new IllegalArgumentException("Invalid OTP"));

        if (otp.getIsUsed() || otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP expired or already used");
        }

        otp.setIsUsed(true);
        userOTPRepository.save(otp);

        User user = otp.getUser();
        user.setIsPhoneVerified(true);
        userRepository.save(user);

        String token = jwtUtil.generateToken(String.valueOf(user.getId()), user.getRole().name());
        return LoginResponse.builder().token(token).userId(user.getId()).role(user.getRole().name()).build();
    }
}
