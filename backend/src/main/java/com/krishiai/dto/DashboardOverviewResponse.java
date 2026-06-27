package com.krishiai.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardOverviewResponse(
        FarmerSummary farmer,
        List<WidgetMetric> metrics,
        WeatherInsightResponse weather,
        CropRecommendationResult cropRecommendation,
        ProfitPredictionResult profitPrediction,
        EcosystemSnapshotResponse ecosystem,
        List<String> alerts,
        VoiceAssistantPanel voiceAssistant
) {
    public record FarmerSummary(String name, String district, BigDecimal totalLandHectares, String preferredLanguage) {}
    public record WidgetMetric(String label, String value, String trend) {}
    public record VoiceAssistantPanel(List<String> supportedLanguages, List<String> suggestedCommands) {}
}
