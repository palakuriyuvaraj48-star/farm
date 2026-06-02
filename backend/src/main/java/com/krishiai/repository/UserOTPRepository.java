package com.krishiai.repository;

import com.krishiai.model.UserOTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserOTPRepository extends JpaRepository<UserOTP, Long> {
    Optional<UserOTP> findTopByPhoneNumberAndOtpCodeOrderByCreatedAtDesc(String phoneNumber, String otpCode);
}
