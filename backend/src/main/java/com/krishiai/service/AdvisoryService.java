package com.krishiai.service;

import com.krishiai.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface AdvisoryService {
    DashboardOverviewResponse buildDashboard();
    CropRecommendationResult recommendCrops(CropRecommendationRequest request);
    ProfitPredictionResult predictProfit(ProfitPredictionRequest request);
    WeatherInsightResponse getWeatherInsights();
    IrrigationAdviceResponse getIrrigationAdvice();
    DiseaseDetectionResponse detectDisease(MultipartFile file);
    EcosystemSnapshotResponse getEcosystemSnapshot();
}
