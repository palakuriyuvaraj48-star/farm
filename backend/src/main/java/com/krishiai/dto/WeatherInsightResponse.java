package com.krishiai.dto;

import java.util.List;

public record WeatherInsightResponse(
        CurrentWeather current,
        List<ForecastDay> forecast,
        List<String> recommendations,
        List<String> alerts
) {
    public record CurrentWeather(String condition, int temperatureCelsius, int humidity, int rainChancePercent) {}
    public record ForecastDay(String day, String summary, int minTemp, int maxTemp, int rainChancePercent) {}
}
