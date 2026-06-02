package com.krishiai.util;

import java.security.SecureRandom;

public final class OTPUtil {
    private static final SecureRandom random = new SecureRandom();

    public static String generateNumericOtp(int length) {
        if (length <= 0) return "";
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
