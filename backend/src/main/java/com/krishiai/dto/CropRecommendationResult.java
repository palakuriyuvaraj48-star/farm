package com.krishiai.dto;

import java.math.BigDecimal;
import java.util.List;

public record CropRecommendationResult(
        List<CropOption> recommendations,
        String explanation,
        String disclaimer
) {
    public record CropOption(
            String cropName,
            BigDecimal confidenceScore,
            BigDecimal expectedYieldQuintalPerHectare,
            String riskLevel,
            BigDecimal profitEstimate,
            List<String> reasons
    ) {}
}
