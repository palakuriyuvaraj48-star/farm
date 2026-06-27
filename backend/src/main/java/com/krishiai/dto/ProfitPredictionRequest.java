package com.krishiai.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record ProfitPredictionRequest(
        @DecimalMin("0.1") BigDecimal landSizeHectares,
        @NotBlank String cropType,
        @DecimalMin("0.0") BigDecimal costOfCultivation
) {
}
