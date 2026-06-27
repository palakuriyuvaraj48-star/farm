package com.krishiai.dto;

import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CropRecommendationRequest(
        @NotBlank String location,
        @NotNull SoilType soilType,
        @NotNull Season season,
        @NotBlank String waterAvailability,
        @DecimalMin("0.0") BigDecimal budget,
        @DecimalMin("0.1") BigDecimal landAreaHectares
) {
}
