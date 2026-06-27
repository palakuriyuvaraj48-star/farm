package com.krishiai.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

    private final SecretKey secretKey;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.secretKey = jwtUtil.getSecretKey();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String hdr = request.getHeader("Authorization");
        if (hdr != null && hdr.startsWith("Bearer ")) {
            String token = hdr.substring(7);
            try {
                Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
                String subject = claims.getSubject();
                String role = claims.get("role", String.class);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(subject, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception ex) {
                log.debug("Invalid JWT: {}", ex.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}
