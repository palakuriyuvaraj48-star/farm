-- KrishiAI Database Schema
-- PostgreSQL 14+
-- Version: 1.0.0

-- =====================================================
-- AUTHENTICATION & USER MANAGEMENT
-- =====================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'FARMER',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (role IN ('FARMER', 'ADMIN', 'SUPPORT', 'SELLER'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role);

CREATE TABLE user_otp (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    otp_code VARCHAR(6) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT otp_check CHECK (LENGTH(otp_code) = 6)
);

CREATE INDEX idx_user_otp_user_id ON user_otp(user_id);
CREATE INDEX idx_user_otp_phone ON user_otp(phone_number);

CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(500) UNIQUE NOT NULL,
    token_type VARCHAR(50) DEFAULT 'ACCESS',
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX idx_user_tokens_token ON user_tokens(token);

-- =====================================================
-- FARMER PROFILE & LAND INFORMATION
-- =====================================================

CREATE TABLE farmer (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    profile_image_url VARCHAR(500),
    bio TEXT,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    taluka VARCHAR(100),
    village VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    farming_experience_years INTEGER,
    annual_income DECIMAL(15, 2),
    is_organic_farmer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_farmer_user_id ON farmer(user_id);
CREATE INDEX idx_farmer_location ON farmer(state, district);

CREATE TABLE land (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    land_name VARCHAR(255),
    total_area_hectares DECIMAL(10, 3) NOT NULL,
    soil_type VARCHAR(100),
    soil_ph DECIMAL(4, 2),
    nitrogen_level DECIMAL(10, 2),
    phosphorus_level DECIMAL(10, 2),
    potassium_level DECIMAL(10, 2),
    organic_matter_percentage DECIMAL(5, 2),
    water_source VARCHAR(100),
    water_availability_months VARCHAR(50),
    irrigation_type VARCHAR(100),
    is_primary_land BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_land_farmer_id ON land(farmer_id);

-- =====================================================
-- CROP MANAGEMENT
-- =====================================================

CREATE TABLE crop (
    id SERIAL PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL UNIQUE,
    scientific_name VARCHAR(255),
    crop_type VARCHAR(100),
    min_temperature DECIMAL(5, 2),
    max_temperature DECIMAL(5, 2),
    optimal_rainfall DECIMAL(10, 2),
    growing_season_days INTEGER,
    min_soil_ph DECIMAL(4, 2),
    max_soil_ph DECIMAL(4, 2),
    water_requirement_mm INTEGER,
    nitrogen_requirement_kg_per_hectare DECIMAL(10, 2),
    yield_potential_quintals_per_hectare DECIMAL(10, 2),
    market_demand_level VARCHAR(50),
    price_volatility DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crop_name ON crop(crop_name);

CREATE TABLE crop_history (
    id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL REFERENCES land(id),
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    season VARCHAR(50),
    sowing_date DATE NOT NULL,
    harvest_date DATE,
    expected_yield_quintals DECIMAL(10, 2),
    actual_yield_quintals DECIMAL(10, 2),
    fertilizer_used_kg DECIMAL(10, 2),
    pesticide_used_liters DECIMAL(10, 2),
    water_used_cubic_meters DECIMAL(10, 2),
    total_cost_rs DECIMAL(15, 2),
    revenue_rs DECIMAL(15, 2),
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT crop_history_season_check CHECK (season IN ('KHARIF', 'RABI', 'SUMMER', 'ZAID'))
);

CREATE INDEX idx_crop_history_land_id ON crop_history(land_id);
CREATE INDEX idx_crop_history_crop_id ON crop_history(crop_id);

-- =====================================================
-- CROP RECOMMENDATION ENGINE
-- =====================================================

CREATE TABLE crop_recommendation (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    land_id INTEGER NOT NULL REFERENCES land(id),
    recommendation_date DATE NOT NULL,
    season VARCHAR(50) NOT NULL,
    recommended_crops VARCHAR(1000) NOT NULL,
    crop1_name VARCHAR(255),
    crop1_confidence_score DECIMAL(5, 2),
    crop1_expected_yield_quintals DECIMAL(10, 2),
    crop1_estimated_profit_rs DECIMAL(15, 2),
    crop1_risk_level VARCHAR(50),
    crop2_name VARCHAR(255),
    crop2_confidence_score DECIMAL(5, 2),
    crop2_expected_yield_quintals DECIMAL(10, 2),
    crop2_estimated_profit_rs DECIMAL(15, 2),
    crop2_risk_level VARCHAR(50),
    crop3_name VARCHAR(255),
    crop3_confidence_score DECIMAL(5, 2),
    crop3_expected_yield_quintals DECIMAL(10, 2),
    crop3_estimated_profit_rs DECIMAL(15, 2),
    crop3_risk_level VARCHAR(50),
    recommendation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT crop_rec_season_check CHECK (season IN ('KHARIF', 'RABI', 'SUMMER', 'ZAID'))
);

CREATE INDEX idx_crop_recommendation_farmer_id ON crop_recommendation(farmer_id);
CREATE INDEX idx_crop_recommendation_land_id ON crop_recommendation(land_id);

-- =====================================================
-- PROFIT PREDICTION
-- =====================================================

CREATE TABLE profit_prediction (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    land_id INTEGER NOT NULL REFERENCES land(id),
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    prediction_date DATE NOT NULL,
    land_area_hectares DECIMAL(10, 3),
    seed_cost_rs DECIMAL(15, 2),
    fertilizer_cost_rs DECIMAL(15, 2),
    pesticide_cost_rs DECIMAL(15, 2),
    labor_cost_rs DECIMAL(15, 2),
    water_cost_rs DECIMAL(15, 2),
    equipment_cost_rs DECIMAL(15, 2),
    miscellaneous_cost_rs DECIMAL(15, 2),
    total_cost_rs DECIMAL(15, 2),
    expected_yield_quintals DECIMAL(10, 2),
    expected_market_price_per_quintal DECIMAL(10, 2),
    expected_revenue_rs DECIMAL(15, 2),
    expected_profit_rs DECIMAL(15, 2),
    profit_margin_percentage DECIMAL(5, 2),
    breakeven_point_quintals DECIMAL(10, 2),
    risk_assessment TEXT,
    confidence_level DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profit_prediction_farmer_id ON profit_prediction(farmer_id);
CREATE INDEX idx_profit_prediction_land_id ON profit_prediction(land_id);

-- =====================================================
-- WEATHER & ALERTS
-- =====================================================

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    date DATE NOT NULL,
    temperature_min_celsius DECIMAL(5, 2),
    temperature_max_celsius DECIMAL(5, 2),
    humidity_percentage INTEGER,
    rainfall_mm DECIMAL(10, 2),
    wind_speed_kmh DECIMAL(5, 2),
    uv_index INTEGER,
    weather_condition VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(farmer_id, date)
);

CREATE INDEX idx_weather_farmer_id ON weather(farmer_id);
CREATE INDEX idx_weather_date ON weather(date);

CREATE TABLE weather_forecast (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    forecast_date DATE NOT NULL,
    day_number INTEGER,
    temperature_min_celsius DECIMAL(5, 2),
    temperature_max_celsius DECIMAL(5, 2),
    humidity_percentage INTEGER,
    rainfall_probability_percentage INTEGER,
    expected_rainfall_mm DECIMAL(10, 2),
    wind_speed_kmh DECIMAL(5, 2),
    weather_condition VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_weather_forecast_farmer_id ON weather_forecast(farmer_id);

CREATE TABLE alert (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    alert_type VARCHAR(100),
    alert_title VARCHAR(255),
    alert_message TEXT,
    alert_severity VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    action_required TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT alert_type_check CHECK (alert_type IN ('WEATHER', 'DISEASE', 'IRRIGATION', 'MARKET', 'PEST', 'GENERAL'))
);

CREATE INDEX idx_alert_farmer_id ON alert(farmer_id);
CREATE INDEX idx_alert_created_at ON alert(created_at);

-- =====================================================
-- IRRIGATION MANAGEMENT
-- =====================================================

CREATE TABLE irrigation_schedule (
    id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL REFERENCES land(id),
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    schedule_date DATE NOT NULL,
    irrigation_day INTEGER,
    water_required_cubic_meters DECIMAL(10, 2),
    irrigation_method VARCHAR(100),
    is_completed BOOLEAN DEFAULT FALSE,
    actual_water_used_cubic_meters DECIMAL(10, 2),
    cost_rs DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_irrigation_schedule_land_id ON irrigation_schedule(land_id);
CREATE INDEX idx_irrigation_schedule_date ON irrigation_schedule(schedule_date);

CREATE TABLE water_source (
    id SERIAL PRIMARY KEY,
    land_id INTEGER NOT NULL REFERENCES land(id),
    source_type VARCHAR(100),
    source_capacity_cubic_meters DECIMAL(10, 2),
    reliability_percentage DECIMAL(5, 2),
    cost_per_cubic_meter DECIMAL(10, 2),
    seasonal_availability VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_water_source_land_id ON water_source(land_id);

-- =====================================================
-- DISEASE & PEST MANAGEMENT
-- =====================================================

CREATE TABLE disease (
    id SERIAL PRIMARY KEY,
    disease_name VARCHAR(255) NOT NULL UNIQUE,
    scientific_name VARCHAR(255),
    affected_crops VARCHAR(1000),
    symptoms TEXT,
    ideal_conditions TEXT,
    treatment_methods TEXT,
    prevention_measures TEXT,
    severity_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_name ON disease(disease_name);

CREATE TABLE disease_detection_result (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    land_id INTEGER NOT NULL REFERENCES land(id),
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    image_url VARCHAR(500) NOT NULL,
    detection_date TIMESTAMP NOT NULL,
    detected_disease_id INTEGER REFERENCES disease(id),
    disease_name VARCHAR(255),
    confidence_score DECIMAL(5, 2),
    severity_percentage DECIMAL(5, 2),
    recommended_treatment TEXT,
    pesticide_recommendations VARCHAR(1000),
    estimated_yield_loss_percentage DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_detection_farmer_id ON disease_detection_result(farmer_id);
CREATE INDEX idx_disease_detection_land_id ON disease_detection_result(land_id);

-- =====================================================
-- MARKET & PRICING
-- =====================================================

CREATE TABLE market_price (
    id SERIAL PRIMARY KEY,
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    market_location VARCHAR(255) NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    date DATE NOT NULL,
    price_per_quintal_rs DECIMAL(10, 2),
    min_price_rs DECIMAL(10, 2),
    max_price_rs DECIMAL(10, 2),
    volume_traded_quintals DECIMAL(15, 2),
    quality_grade VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(crop_id, market_location, date)
);

CREATE INDEX idx_market_price_crop_id ON market_price(crop_id);
CREATE INDEX idx_market_price_date ON market_price(date);

CREATE TABLE price_history (
    id SERIAL PRIMARY KEY,
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    date DATE NOT NULL,
    average_price_rs DECIMAL(10, 2),
    min_price_rs DECIMAL(10, 2),
    max_price_rs DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_price_history_crop_id ON price_history(crop_id);

CREATE TABLE price_prediction (
    id SERIAL PRIMARY KEY,
    crop_id INTEGER NOT NULL REFERENCES crop(id),
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    prediction_date DATE NOT NULL,
    predicted_price_next_7_days DECIMAL(10, 2),
    predicted_price_next_30_days DECIMAL(10, 2),
    confidence_score DECIMAL(5, 2),
    recommendation VARCHAR(100),
    reasoning TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_price_prediction_crop_id ON price_prediction(crop_id);

-- =====================================================
-- GOVERNMENT SCHEMES
-- =====================================================

CREATE TABLE scheme (
    id SERIAL PRIMARY KEY,
    scheme_name VARCHAR(255) NOT NULL,
    scheme_code VARCHAR(100) UNIQUE,
    description TEXT,
    ministry_department VARCHAR(255),
    scheme_type VARCHAR(100),
    eligibility_criteria TEXT,
    benefits TEXT,
    subsidy_percentage DECIMAL(5, 2),
    min_land_hectares DECIMAL(10, 3),
    max_land_hectares DECIMAL(10, 3),
    applicable_states VARCHAR(1000),
    applicable_crops VARCHAR(1000),
    application_deadline DATE,
    documentation_required TEXT,
    approved_by VARCHAR(100),
    website_url VARCHAR(500),
    helpline_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scheme_name ON scheme(scheme_name);

CREATE TABLE farmer_scheme_eligibility (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    scheme_id INTEGER NOT NULL REFERENCES scheme(id),
    eligibility_score DECIMAL(5, 2),
    is_eligible BOOLEAN,
    reason TEXT,
    checked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_farmer_scheme_farmer_id ON farmer_scheme_eligibility(farmer_id);
CREATE INDEX idx_farmer_scheme_scheme_id ON farmer_scheme_eligibility(scheme_id);

-- =====================================================
-- COMMUNITY & FORUM
-- =====================================================

CREATE TABLE forum_post (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    post_title VARCHAR(500) NOT NULL,
    post_content TEXT NOT NULL,
    post_category VARCHAR(100),
    is_solved BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_forum_post_farmer_id ON forum_post(farmer_id);
CREATE INDEX idx_forum_post_created_at ON forum_post(created_at);

CREATE TABLE forum_comment (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES forum_post(id),
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    comment_text TEXT NOT NULL,
    is_helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_forum_comment_post_id ON forum_comment(post_id);

CREATE TABLE pest_alert (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    pest_name VARCHAR(255),
    severity_level VARCHAR(50),
    affected_area_location VARCHAR(255),
    alert_description TEXT,
    management_recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pest_alert_farmer_id ON pest_alert(farmer_id);

-- =====================================================
-- MARKETPLACE
-- =====================================================

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    product_type VARCHAR(100),
    price_rs DECIMAL(10, 2),
    quantity_in_stock INTEGER,
    unit VARCHAR(50),
    seller_id INTEGER REFERENCES users(id),
    product_image_url VARCHAR(500),
    rating DECIMAL(3, 2),
    review_count INTEGER DEFAULT 0,
    verified_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_product_seller_id ON product(seller_id);

CREATE TABLE product_order (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    buyer_farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    product_id INTEGER NOT NULL REFERENCES product(id),
    quantity INTEGER NOT NULL,
    total_price_rs DECIMAL(15, 2),
    order_status VARCHAR(50),
    delivery_address TEXT,
    delivery_date DATE,
    payment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT order_status_check CHECK (order_status IN ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'))
);

CREATE INDEX idx_product_order_buyer_farmer_id ON product_order(buyer_farmer_id);
CREATE INDEX idx_product_order_product_id ON product_order(product_id);

-- =====================================================
-- WAREHOUSE & STORAGE
-- =====================================================

CREATE TABLE warehouse (
    id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(255) NOT NULL,
    location_address TEXT NOT NULL,
    state VARCHAR(100),
    district VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_capacity_quintals DECIMAL(15, 2),
    available_capacity_quintals DECIMAL(15, 2),
    storage_type VARCHAR(100),
    facility_type VARCHAR(100),
    rental_price_per_quintal_per_month DECIMAL(10, 2),
    insurance_available BOOLEAN,
    verification_status VARCHAR(50),
    contact_person_name VARCHAR(255),
    contact_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_warehouse_location ON warehouse(state, district);

CREATE TABLE warehouse_booking (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    warehouse_id INTEGER NOT NULL REFERENCES warehouse(id),
    crop_id INTEGER REFERENCES crop(id),
    booking_quantity_quintals DECIMAL(15, 2),
    booking_start_date DATE NOT NULL,
    booking_end_date DATE NOT NULL,
    total_cost_rs DECIMAL(15, 2),
    booking_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_warehouse_booking_farmer_id ON warehouse_booking(farmer_id);

-- =====================================================
-- LABOR MARKETPLACE
-- =====================================================

CREATE TABLE labor_post (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    job_type VARCHAR(100),
    required_skill_level VARCHAR(50),
    wage_per_day_rs DECIMAL(10, 2),
    required_workers INTEGER,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location_description TEXT,
    job_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_labor_post_farmer_id ON labor_post(farmer_id);

CREATE TABLE labor_application (
    id SERIAL PRIMARY KEY,
    labor_post_id INTEGER NOT NULL REFERENCES labor_post(id),
    worker_user_id INTEGER NOT NULL REFERENCES users(id),
    application_status VARCHAR(50),
    accepted_wage_rs DECIMAL(10, 2),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_labor_application_labor_post_id ON labor_application(labor_post_id);

-- =====================================================
-- FINANCE & LOANS
-- =====================================================

CREATE TABLE loan (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    loan_type VARCHAR(100),
    loan_amount_rs DECIMAL(15, 2),
    interest_rate_percentage DECIMAL(5, 2),
    tenure_months INTEGER,
    monthly_emi_rs DECIMAL(15, 2),
    total_amount_due_rs DECIMAL(15, 2),
    loan_status VARCHAR(50),
    disbursement_date DATE,
    repayment_start_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_loan_farmer_id ON loan(farmer_id);

CREATE TABLE loan_emi (
    id SERIAL PRIMARY KEY,
    loan_id INTEGER NOT NULL REFERENCES loan(id),
    emi_number INTEGER,
    due_date DATE NOT NULL,
    amount_due_rs DECIMAL(15, 2),
    amount_paid_rs DECIMAL(15, 2),
    payment_date DATE,
    payment_status VARCHAR(50),
    penalty_charged_rs DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_loan_emi_loan_id ON loan_emi(loan_id);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES farmer(id),
    transaction_type VARCHAR(100),
    amount_rs DECIMAL(15, 2),
    payment_method VARCHAR(100),
    transaction_reference_id VARCHAR(100),
    description TEXT,
    transaction_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transaction_farmer_id ON transaction(farmer_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE notification (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    notification_title VARCHAR(255),
    notification_message TEXT,
    notification_type VARCHAR(100),
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notification_user_id ON notification(user_id);
CREATE INDEX idx_notification_created_at ON notification(created_at);

-- =====================================================
-- ADMIN & ANALYTICS
-- =====================================================

CREATE TABLE admin_audit_log (
    id SERIAL PRIMARY KEY,
    admin_user_id INTEGER NOT NULL REFERENCES users(id),
    action VARCHAR(255),
    entity_type VARCHAR(100),
    entity_id INTEGER,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_admin_user_id ON admin_audit_log(admin_user_id);
CREATE INDEX idx_audit_log_created_at ON admin_audit_log(created_at);

CREATE TABLE application_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(255),
    metric_value DECIMAL(15, 2),
    metric_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_application_metrics_date ON application_metrics(metric_date);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_farmer_state_district ON farmer(state, district);
CREATE INDEX idx_crop_history_status ON crop_history(status);
CREATE INDEX idx_irrigation_schedule_completed ON irrigation_schedule(is_completed);
CREATE INDEX idx_alert_severity ON alert(alert_severity);
CREATE INDEX idx_market_price_created_at ON market_price(created_at);
CREATE INDEX idx_warehouse_available_capacity ON warehouse(available_capacity_quintals);
