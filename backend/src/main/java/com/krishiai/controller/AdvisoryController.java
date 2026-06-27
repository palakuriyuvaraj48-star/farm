package com.krishiai.controller;

import com.krishiai.dto.*;
import com.krishiai.service.AdvisoryService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class AdvisoryController {

    private final AdvisoryService advisoryService;

    public AdvisoryController(AdvisoryService advisoryService) {
        this.advisoryService = advisoryService;
    }

    @GetMapping("/dashboard/overview")
    public ApiResponse<DashboardOverviewResponse> getDashboardOverview() {
        return ApiResponse.ok("Dashboard overview generated", advisoryService.buildDashboard());
    }

    @PostMapping("/advisory/crop-recommendation")
    public ApiResponse<CropRecommendationResult> recommendCrop(@Valid @RequestBody CropRecommendationRequest request) {
        return ApiResponse.ok("Crop recommendation ready", advisoryService.recommendCrops(request));
    }

    @PostMapping("/advisory/profit-prediction")
    public ApiResponse<ProfitPredictionResult> predictProfit(@Valid @RequestBody ProfitPredictionRequest request) {
        return ApiResponse.ok("Profit prediction ready", advisoryService.predictProfit(request));
    }

    @GetMapping("/advisory/weather")
    public ApiResponse<WeatherInsightResponse> weather() {
        return ApiResponse.ok("Weather insights ready", advisoryService.getWeatherInsights());
    }

    @GetMapping("/advisory/irrigation")
    public ApiResponse<IrrigationAdviceResponse> irrigation() {
        return ApiResponse.ok("Irrigation advisory ready", advisoryService.getIrrigationAdvice());
    }

    @PostMapping(value = "/advisory/disease-detection", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<DiseaseDetectionResponse> detectDisease(@RequestPart("file") MultipartFile file) {
        return ApiResponse.ok("Disease detection complete", advisoryService.detectDisease(file));
    }
}
