package com.krishiai.dto;

import java.math.BigDecimal;
import java.util.List;

public record DiseaseDetectionResponse(
        String diseaseName,
        BigDecimal confidenceScore,
        String severity,
        List<String> symptoms,
        List<String> treatments,
        String disclaimer
) {
}
