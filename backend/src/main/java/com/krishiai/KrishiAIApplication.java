package com.krishiai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * KrishiAI - Smart Farmer Decision Support System
 * Main Application Entry Point
 * Version 1.0.0
 */
@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
public class KrishiAIApplication {

    public static void main(String[] args) {
        SpringApplication.run(KrishiAIApplication.class, args);
    }
}
