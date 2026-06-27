package com.krishiai.service.impl;

import com.krishiai.dto.*;
import com.krishiai.model.enums.Season;
import com.krishiai.model.enums.SoilType;
import com.krishiai.service.AdvisoryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class AdvisoryServiceImpl implements AdvisoryService {

    @Override
    public DashboardOverviewResponse buildDashboard() {
        CropRecommendationResult cropRecommendation = recommendCrops(
                new CropRecommendationRequest("Nalgonda, Telangana", SoilType.LOAMY, Season.KHARIF, "MEDIUM", BigDecimal.valueOf(75000), BigDecimal.valueOf(2.5))
        );
        ProfitPredictionResult profit = predictProfit(new ProfitPredictionRequest(BigDecimal.valueOf(2.5), "Paddy", BigDecimal.valueOf(52000)));
        return new DashboardOverviewResponse(
                new DashboardOverviewResponse.FarmerSummary("Ravi Kumar", "Nalgonda", BigDecimal.valueOf(4.6), "Telugu"),
                List.of(
                        new DashboardOverviewResponse.WidgetMetric("Expected season profit", "INR 1.36L", "+12%"),
                        new DashboardOverviewResponse.WidgetMetric("Water stress", "Moderate", "Monitor"),
                        new DashboardOverviewResponse.WidgetMetric("Market signal", "Sell in 5-7 days", "Positive")
                ),
                getWeatherInsights(),
                cropRecommendation,
                profit,
                getEcosystemSnapshot(),
                List.of(
                        "Rain expected within 48 hours. Delay irrigation on Plot 2.",
                        "Cotton prices improving in nearby mandi. Recheck on Friday.",
                        "You are likely eligible for PM-KISAN renewal support."
                ),
                new DashboardOverviewResponse.VoiceAssistantPanel(
                        List.of("Telugu", "Hindi", "English"),
                        List.of("Recommend crop", "Check market price", "Explain government scheme")
                )
        );
    }

    @Override
    public CropRecommendationResult recommendCrops(CropRecommendationRequest request) {
        BigDecimal baseBudgetScore = request.budget().compareTo(BigDecimal.valueOf(60000)) >= 0 ? BigDecimal.valueOf(0.88) : BigDecimal.valueOf(0.74);
        boolean wetSeason = request.season() == Season.KHARIF || "HIGH".equalsIgnoreCase(request.waterAvailability());
        var first = new CropRecommendationResult.CropOption(
                wetSeason ? "Paddy" : "Groundnut",
                baseBudgetScore,
                wetSeason ? BigDecimal.valueOf(52) : BigDecimal.valueOf(21),
                wetSeason ? "MEDIUM" : "LOW",
                wetSeason ? BigDecimal.valueOf(96000) : BigDecimal.valueOf(88000),
                List.of(
                        "Matches current season and water profile",
                        "Soil type supports stable germination",
                        "Expected mandi demand is healthy"
                )
        );
        var second = new CropRecommendationResult.CropOption(
                request.soilType() == SoilType.CLAY ? "Cotton" : "Maize",
                BigDecimal.valueOf(0.79),
                BigDecimal.valueOf(34),
                "MEDIUM",
                BigDecimal.valueOf(73000),
                List.of(
                        "Good diversification option",
                        "Balanced input cost against expected returns"
                )
        );
        var third = new CropRecommendationResult.CropOption(
                "Red Gram",
                BigDecimal.valueOf(0.71),
                BigDecimal.valueOf(12),
                "LOW",
                BigDecimal.valueOf(61000),
                List.of(
                        "Lower irrigation dependency",
                        "Useful hedge against weather volatility"
                )
        );
        return new CropRecommendationResult(
                List.of(first, second, third),
                "Recommendations combine season fit, soil compatibility, water availability, and achievable budget for a small-to-medium Indian farm.",
                "Predictions are advisory estimates and should be validated with local agronomy, mandi, and weather conditions before investing."
        );
    }

    @Override
    public ProfitPredictionResult predictProfit(ProfitPredictionRequest request) {
        BigDecimal revenueFactor = switch (request.cropType().toLowerCase()) {
            case "paddy", "rice" -> BigDecimal.valueOf(2.75);
            case "cotton" -> BigDecimal.valueOf(2.45);
            case "maize" -> BigDecimal.valueOf(2.10);
            default -> BigDecimal.valueOf(1.95);
        };
        BigDecimal expectedRevenue = request.costOfCultivation().multiply(revenueFactor);
        BigDecimal profit = expectedRevenue.subtract(request.costOfCultivation());
        BigDecimal breakEven = request.costOfCultivation().divide(BigDecimal.valueOf(2200), 2, RoundingMode.HALF_UP);
        return new ProfitPredictionResult(
                request.costOfCultivation(),
                expectedRevenue,
                profit,
                breakEven,
                BigDecimal.valueOf(0.81),
                List.of(
                        "Revenue uses historical crop return multipliers",
                        "Break-even estimate assumes current mandi range and standard yield recovery",
                        "Labor and irrigation volatility remain moderate"
                ),
                "Financial projections are estimates and must not be treated as guaranteed income or lending advice."
        );
    }

    @Override
    public WeatherInsightResponse getWeatherInsights() {
        return new WeatherInsightResponse(
                new WeatherInsightResponse.CurrentWeather("Partly cloudy", 33, 62, 30),
                List.of(
                        new WeatherInsightResponse.ForecastDay("Day 1", "Humid with light clouds", 27, 34, 25),
                        new WeatherInsightResponse.ForecastDay("Day 2", "Scattered showers", 26, 32, 65),
                        new WeatherInsightResponse.ForecastDay("Day 3", "Moderate rain", 25, 31, 80),
                        new WeatherInsightResponse.ForecastDay("Day 4", "Warm clearing skies", 26, 33, 20)
                ),
                List.of(
                        "Delay broad irrigation before Day 3 rainfall.",
                        "Spray operations are better scheduled tomorrow morning.",
                        "Monitor fungal risk after the wet spell."
                ),
                List.of("Rain alert likely within 48 hours", "Heat stress remains manageable this week")
        );
    }

    @Override
    public IrrigationAdviceResponse getIrrigationAdvice() {
        return new IrrigationAdviceResponse(
                "Irrigate Plot 1 in 2 days for 4.5 hours. Skip Plot 2 until after forecast rain.",
                "LOW",
                List.of(
                        "Use alternate furrow irrigation where possible",
                        "Mulch exposed root zones to reduce moisture loss",
                        "Prefer early morning watering to reduce evaporation"
                ),
                "Conserve water this week and reassess after rainfall."
        );
    }

    @Override
    public DiseaseDetectionResponse detectDisease(MultipartFile file) {
        String disease = file != null && file.getOriginalFilename() != null && file.getOriginalFilename().toLowerCase().contains("leaf")
                ? "Leaf blight"
                : "Possible early-stage fungal infection";
        return new DiseaseDetectionResponse(
                disease,
                BigDecimal.valueOf(0.86),
                "MODERATE",
                List.of("Brown lesions", "Leaf edge drying", "Patchy yellowing"),
                List.of(
                        "Remove visibly affected leaves from the most damaged plants",
                        "Apply a recommended fungicide after local agronomist confirmation",
                        "Avoid overhead irrigation during high humidity windows"
                ),
                "Image-based disease output is not a final diagnosis. Confirm locally before chemical treatment."
        );
    }

    @Override
    public EcosystemSnapshotResponse getEcosystemSnapshot() {
        return new EcosystemSnapshotResponse(
                List.of(
                        new EcosystemSnapshotResponse.MarketCard("Paddy", BigDecimal.valueOf(2180), BigDecimal.valueOf(2260), "WAIT", BigDecimal.valueOf(0.77)),
                        new EcosystemSnapshotResponse.MarketCard("Cotton", BigDecimal.valueOf(6820), BigDecimal.valueOf(6710), "SELL_NOW", BigDecimal.valueOf(0.74))
                ),
                List.of(
                        new EcosystemSnapshotResponse.SchemeCard("PM-KISAN", BigDecimal.valueOf(0.93), "Income support installment", "Complete bank verification"),
                        new EcosystemSnapshotResponse.SchemeCard("PMFBY", BigDecimal.valueOf(0.81), "Crop insurance support", "Check seasonal enrollment window")
                ),
                List.of(
                        new EcosystemSnapshotResponse.CommunityCard("Brown planthopper seen near canal belt", "Pest alert", 18, true),
                        new EcosystemSnapshotResponse.CommunityCard("Low-cost drip setup for 2 acres", "Success story", 11, false)
                ),
                List.of(
                        new EcosystemSnapshotResponse.MarketplaceCard("Hybrid paddy seed", "Seeds", BigDecimal.valueOf(1450), "AgriHub Traders"),
                        new EcosystemSnapshotResponse.MarketplaceCard("Bio-fertilizer pack", "Fertilizers", BigDecimal.valueOf(690), "GreenSoil Co")
                ),
                List.of(
                        new EcosystemSnapshotResponse.WarehouseCard("Nalgonda Rural Storage", "Nalgonda", BigDecimal.valueOf(430), BigDecimal.valueOf(32)),
                        new EcosystemSnapshotResponse.WarehouseCard("Suryapet Crop Depot", "Suryapet", BigDecimal.valueOf(250), BigDecimal.valueOf(28))
                ),
                List.of(
                        new EcosystemSnapshotResponse.LaborCard("Harvest helpers", "Miryalaguda", BigDecimal.valueOf(550), 12),
                        new EcosystemSnapshotResponse.LaborCard("Spray technicians", "Chityal", BigDecimal.valueOf(700), 4)
                ),
                new EcosystemSnapshotResponse.FinanceCard(BigDecimal.valueOf(120000), BigDecimal.valueOf(5450), "MEDIUM", "Borrow below INR 1.2L to keep EMI within seasonal cash flow.")
        );
    }
}
