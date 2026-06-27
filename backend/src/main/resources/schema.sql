-- KRISHI AI SUPER APP - PostgreSQL Database Schema
-- Enterprise-grade schema designed for reliability, scalability, and traceability.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. FARMERS (Core Identity)
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    preferred_language VARCHAR(10) DEFAULT 'te-IN', -- Telugu default
    district VARCHAR(100),
    mandal VARCHAR(100),
    village VARCHAR(100),
    total_land_acres DECIMAL(5,2),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SOIL HEALTH CARDS
CREATE TABLE soil_health_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    nitrogen_level DECIMAL(5,2), -- kg/ha
    phosphorus_level DECIMAL(5,2), -- kg/ha
    potassium_level DECIMAL(5,2), -- kg/ha
    ph_level DECIMAL(4,2),
    organic_carbon DECIMAL(4,2),
    test_date DATE,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CROP ADVISORY LOGS
CREATE TABLE advisory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES farmers(id),
    recommended_crop VARCHAR(100) NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL, -- e.g., 0.88
    expected_yield_quintals DECIMAL(6,2),
    best_case_profit DECIMAL(10,2),
    worst_case_profit DECIMAL(10,2),
    risk_level VARCHAR(20), -- LOW, MODERATE, HIGH
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. EQUIPMENT RENTALS (Marketplace)
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES farmers(id),
    equipment_type VARCHAR(50) NOT NULL, -- TRACTOR, HARVESTER, etc.
    name VARCHAR(100) NOT NULL,
    hourly_rate DECIMAL(8,2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    review_count INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rental_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id UUID REFERENCES equipment(id),
    renter_id UUID REFERENCES farmers(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ACTIVE, COMPLETED, CANCELLED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. DISEASE DETECTION LOGS (AI Auditing)
CREATE TABLE disease_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES farmers(id),
    crop_name VARCHAR(100),
    image_url VARCHAR(500) NOT NULL,
    detected_disease VARCHAR(100),
    confidence_score DECIMAL(3,2),
    recommended_treatment TEXT,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_farmer_phone ON farmers(phone_number);
CREATE INDEX idx_equipment_type ON equipment(equipment_type);
CREATE INDEX idx_rental_status ON rental_bookings(status);
