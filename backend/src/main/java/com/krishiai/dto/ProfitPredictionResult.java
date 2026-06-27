package com.krishiai.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProfitPredictionResult(
        BigDecimal totalCost,
        BigDecimal expectedRevenue,
        BigDecimal expectedProfit,
        BigDecimal breakEvenPointQuintals,
        BigDecimal confidenceScore,
        List<String> reasons,
        String disclaimer
) {
}
