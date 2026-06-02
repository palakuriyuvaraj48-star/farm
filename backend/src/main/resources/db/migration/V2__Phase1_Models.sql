-- KrishiAI Database Schema - Phase 1 Models
-- PostgreSQL 14+
-- Version: 2.0.0
-- Purpose: Create Phase 1 tables for farmer profiles, land management, crops, recommendations, and weather

-- =====================================================
-- FARMER PROFILE TABLE
-- =====================================================

CREATE TABLE farmer (
    farmer_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    experience_years INTEGER CHECK (experience_years >= 0),
    address VARCHAR(500),
    lat DECIMAL(10, 8),
    long DECIMAL(11, 8),
    profile_pic_url VARCHAR(500),
    is_organic BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_farmer_user_id ON farmer(user_id);
CREATE INDEX idx_farmer_location ON farmer(lat, long);

-- =====================================================
-- LAND/FIELD TABLE
-- =====================================================

CREATE TABLE land (
    land_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    area_hectares DECIMAL(10, 3) NOT NULL CHECK (area_hectares > 0),
    soil_type VARCHAR(100),
    soil_ph DECIMAL(4, 2) CHECK (soil_ph >= 0 AND soil_ph <= 14),
    nitrogen DECIMAL(10, 2),
    phosphorus DECIMAL(10, 2),
    potassium DECIMAL(10, 2),
    water_source VARCHAR(100),
    irrigation_type VARCHAR(100),
    season VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT soil_type_check CHECK (soil_type IN ('ALLUVIAL', 'BLACK', 'RED', 'LATERITE', 'CLAYEY', 'LOAMY', 'SANDY')),
    CONSTRAINT season_check CHECK (season IN ('KHARIF', 'RABI', 'SUMMER', 'ZAID'))
);

CREATE INDEX idx_land_farmer_id ON land(farmer_id);
CREATE INDEX idx_land_season ON land(season);

-- =====================================================
-- CROP MASTER DATA TABLE
-- =====================================================

CREATE TABLE crop (
    crop_id SERIAL PRIMARY KEY,
    crop_name VARCHAR(255) UNIQUE NOT NULL,
    cultivation_days INTEGER CHECK (cultivation_days > 0),
    water_required_mm INTEGER,
    soil_ph_min DECIMAL(4, 2) CHECK (soil_ph_min >= 0 AND soil_ph_min <= 14),
    soil_ph_max DECIMAL(4, 2) CHECK (soil_ph_max >= 0 AND soil_ph_max <= 14),
    nitrogen_req_kg DECIMAL(10, 2),
    season VARCHAR(50),
    profit_estimate DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT season_check CHECK (season IN ('KHARIF', 'RABI', 'SUMMER', 'ZAID', 'PERENNIAL')),
    CONSTRAINT crop_ph_range_check CHECK (soil_ph_min <= soil_ph_max)
);

CREATE INDEX idx_crop_name ON crop(crop_name);
CREATE INDEX idx_crop_season ON crop(season);

-- =====================================================
-- CROP HISTORY TABLE
-- =====================================================

CREATE TABLE crop_history (
    history_id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL REFERENCES land(land_id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crop(crop_id) ON DELETE RESTRICT,
    year INTEGER NOT NULL,
    actual_yield_kg DECIMAL(15, 2),
    actual_cost DECIMAL(15, 2),
    actual_revenue DECIMAL(15, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crop_history_land_id ON crop_history(land_id);
CREATE INDEX idx_crop_history_crop_id ON crop_history(crop_id);
CREATE INDEX idx_crop_history_year ON crop_history(year);
CREATE INDEX idx_crop_history_land_year ON crop_history(land_id, year);

-- =====================================================
-- CROP RECOMMENDATION TABLE
-- =====================================================

CREATE TABLE crop_recommendation (
    recommendation_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    land_id INTEGER NOT NULL REFERENCES land(land_id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crop(crop_id) ON DELETE RESTRICT,
    rank INTEGER CHECK (rank > 0),
    confidence_score DECIMAL(3, 2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    expected_yield DECIMAL(15, 2),
    risk_level VARCHAR(50),
    profit_estimate DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT risk_level_check CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH'))
);

CREATE INDEX idx_crop_recommendation_farmer_id ON crop_recommendation(farmer_id);
CREATE INDEX idx_crop_recommendation_land_id ON crop_recommendation(land_id);
CREATE INDEX idx_crop_recommendation_farmer_created ON crop_recommendation(farmer_id, created_at DESC);

-- =====================================================
-- PROFIT PREDICTION TABLE
-- =====================================================

CREATE TABLE profit_prediction (
    prediction_id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL REFERENCES land(land_id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crop(crop_id) ON DELETE RESTRICT,
    cost_seeds DECIMAL(15, 2),
    cost_fertilizer DECIMAL(15, 2),
    cost_labor DECIMAL(15, 2),
    cost_irrigation DECIMAL(15, 2),
    expected_yield DECIMAL(15, 2),
    expected_revenue DECIMAL(15, 2),
    expected_profit DECIMAL(15, 2),
    roi_percentage DECIMAL(5, 2),
    risk_assessment VARCHAR(255),
    confidence_score DECIMAL(3, 2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profit_prediction_land_id ON profit_prediction(land_id);
CREATE INDEX idx_profit_prediction_crop_id ON profit_prediction(crop_id);
CREATE INDEX idx_profit_prediction_created_at ON profit_prediction(created_at DESC);

-- =====================================================
-- WEATHER TABLE
-- =====================================================

CREATE TABLE weather (
    weather_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    temperature DECIMAL(5, 2),
    humidity DECIMAL(5, 2) CHECK (humidity >= 0 AND humidity <= 100),
    rainfall_mm DECIMAL(10, 2),
    wind_speed DECIMAL(5, 2),
    condition VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_weather_farmer_id ON weather(farmer_id);
CREATE INDEX idx_weather_created_at ON weather(created_at DESC);
CREATE INDEX idx_weather_farmer_created ON weather(farmer_id, created_at DESC);

-- =====================================================
-- WEATHER FORECAST TABLE
-- =====================================================

CREATE TABLE weather_forecast (
    forecast_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    forecast_date DATE NOT NULL,
    temperature_min DECIMAL(5, 2),
    temperature_max DECIMAL(5, 2),
    rainfall_probability DECIMAL(5, 2) CHECK (rainfall_probability >= 0 AND rainfall_probability <= 100),
    wind_speed DECIMAL(5, 2),
    condition VARCHAR(100),
    alert_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_weather_forecast_farmer_id ON weather_forecast(farmer_id);
CREATE INDEX idx_weather_forecast_date ON weather_forecast(forecast_date);

-- =====================================================
-- ALERT TABLE
-- =====================================================

CREATE TABLE alert (
    alert_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(farmer_id) ON DELETE CASCADE,
    alert_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT severity_check CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))
);

CREATE INDEX idx_alert_farmer_id ON alert(farmer_id);
CREATE INDEX idx_alert_created_at ON alert(created_at DESC);
CREATE INDEX idx_alert_farmer_created ON alert(farmer_id, created_at DESC);

-- =====================================================
-- MIGRATION INFO
-- =====================================================
-- Migration Version: V2__Phase1_Models.sql
-- Created Tables: 9
-- - farmer: Farmer profiles and contact information
-- - land: Land/field information with soil properties
-- - crop: Crop master data with cultivation requirements
-- - crop_history: Historical farming records
-- - crop_recommendation: AI-generated recommendations
-- - profit_prediction: Financial predictions
-- - weather: Current weather data
-- - weather_forecast: Weather forecasts
-- - alert: Farmer notifications and alerts
-- All tables include proper indexes for performance and referential integrity constraints
