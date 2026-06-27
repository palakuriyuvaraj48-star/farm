package com.krishiai.dto;

import java.util.List;

public record IrrigationAdviceResponse(
        String schedule,
        String droughtRisk,
        List<String> waterSavingRecommendations,
        String recommendedAction
) {
}
