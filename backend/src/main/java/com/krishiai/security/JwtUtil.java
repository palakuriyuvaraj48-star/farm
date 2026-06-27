package com.krishiai.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    private final long expirationMs;

    public JwtUtil(@Value("${jwt.secret:krishiai-development-jwt-secret-key-2026-please-change}") String secret,
                   @Value("${jwt.expiration:86400000}") long expirationMs) {
        byte[] keyBytes = secret.getBytes();
        if (keyBytes.length < 32) {
            keyBytes = String.format("%-32s", secret).getBytes();
        }
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = expirationMs;
    }

    public SecretKey getSecretKey() {
        return secretKey;
    }

    public String generateToken(String subject, String role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(secretKey)
                .compact();
    }
}
