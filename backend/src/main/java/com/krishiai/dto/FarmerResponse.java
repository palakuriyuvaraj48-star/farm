package com.krishiai.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
public class FarmerResponse {
    private Long farmerId;
    private String name;
    private String phone;
    private String email;
    private Boolean isOrganic;
    private Set<LandDTO> lands;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
