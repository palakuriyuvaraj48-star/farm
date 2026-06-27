package com.krishiai.service;

import com.krishiai.dto.CropRecommendationRequest;
import com.krishiai.dto.ProfitPredictionRequest;
import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import com.krishiai.service.impl.AdvisoryServiceImpl;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AdvisoryServiceImplTest {

    private final AdvisoryServiceImpl service = new AdvisoryServiceImpl();

    @Test
    void shouldGenerateCropRecommendations() {
        var result = service.recommendCrops(
                new CropRecommendationRequest(
                        "Nalgonda, Telangana",
                        SoilType.LOAMY,
                        Season.KHARIF,
                        "MEDIUM",
                        BigDecimal.valueOf(75000),
                        BigDecimal.valueOf(2.5)
                )
        );

        assertFalse(result.recommendations().isEmpty());
        assertTrue(result.recommendations().get(0).confidenceScore().doubleValue() > 0.7);
    }

    @Test
    void shouldPredictPositiveProfitForPaddyScenario() {
        var result = service.predictProfit(
                new ProfitPredictionRequest(
                        BigDecimal.valueOf(2.5),
                        "Paddy",
                        BigDecimal.valueOf(52000)
                )
        );

        assertTrue(result.expectedRevenue().compareTo(result.totalCost()) > 0);
        assertTrue(result.expectedProfit().compareTo(BigDecimal.ZERO) > 0);
    }
}
