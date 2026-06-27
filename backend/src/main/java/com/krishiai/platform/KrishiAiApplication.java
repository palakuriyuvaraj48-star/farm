package com.krishiai.platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KrishiAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(KrishiAiApplication.class, args);
    }
}
