# KrishiAI - Entity Relationship Diagram & Data Model

## Database Architecture Overview

```
AUTHENTICATION LAYER
├── users (core authentication)
├── user_otp (phone verification)
└── user_tokens (JWT tokens)

FARMER PROFILE & LAND
├── farmer (farmer details)
└── land (land/field information)

CROP MANAGEMENT
├── crop (crop master data)
├── crop_history (farming records)
├── crop_recommendation (AI recommendations)
└── profit_prediction (financial predictions)

WEATHER & ALERTS
├── weather (current weather)
├── weather_forecast (7-day forecast)
└── alert (notifications & alerts)

IRRIGATION
├── irrigation_schedule (watering schedule)
└── water_source (water availability)

DISEASE & PEST
├── disease (disease master data)
└── disease_detection_result (AI detection results)

MARKET & PRICING
├── market_price (market rates)
├── price_history (historical prices)
└── price_prediction (price forecasting)

GOVERNMENT SCHEMES
├── scheme (scheme master data)
└── farmer_scheme_eligibility (eligibility tracking)

COMMUNITY
├── forum_post (discussion threads)
├── forum_comment (comments)
└── pest_alert (community pest alerts)

MARKETPLACE
├── product (product catalog)
└── product_order (purchase orders)

WAREHOUSE
├── warehouse (warehouse master)
└── warehouse_booking (storage bookings)

LABOR
├── labor_post (job postings)
└── labor_application (applications)

FINANCE
├── loan (loan records)
├── loan_emi (EMI payments)
└── transaction (financial transactions)

NOTIFICATIONS & ADMIN
├── notification (user notifications)
├── admin_audit_log (audit trail)
└── application_metrics (analytics)
```

---

## Core Entity Relationships

### 1. FARMER → LAND → CROP_HISTORY → CROP
```
Farmer (1) ──→ (N) Land (1) ──→ (N) Crop_History (M) ──→ Crop
  |
  └──→ Farmer_Profile
```
- One farmer can own multiple lands
- One land can have multiple crop histories
- Each crop history references a crop master record

### 2. FARMER → CROP_RECOMMENDATION → CROP
```
Farmer (1) ──→ (N) Crop_Recommendation (N) ──→ Crop
```
- AI engine recommends multiple crops for each farmer
- Based on land characteristics and season

### 3. FARMER → WEATHER, ALERT
```
Farmer (1) ──→ (N) Weather
Farmer (1) ──→ (N) Alert
```
- Location-based weather data
- Personalized alerts for farmer

### 4. LAND → IRRIGATION_SCHEDULE → CROP
```
Land (1) ──→ (N) Irrigation_Schedule (M) ──→ Crop
```
- Irrigation schedule for specific crop on specific land

### 5. FARMER → DISEASE_DETECTION_RESULT → DISEASE
```
Farmer (1) ──→ (N) Disease_Detection_Result (M) ──→ Disease
```
- AI disease detection from uploaded images
- Maps to disease master data

### 6. CROP → MARKET_PRICE, PRICE_HISTORY
```
Crop (1) ──→ (N) Market_Price
Crop (1) ──→ (N) Price_History
Crop (1) ──→ (N) Price_Prediction
```
- Multi-location pricing
- Historical tracking
- AI predictions

### 7. FARMER → PRODUCT_ORDER → PRODUCT
```
Farmer (1) ──→ (N) Product_Order (M) ──→ Product
                          │
                    User (Seller)
```
- Farmer purchases products
- Products sold by registered sellers

### 8. FARMER → WAREHOUSE_BOOKING → WAREHOUSE
```
Farmer (1) ──→ (N) Warehouse_Booking (M) ──→ Warehouse
```
- Farmer can book multiple warehouses
- Warehouse can serve multiple farmers

### 9. FARMER → LABOR_POST → LABOR_APPLICATION → USER
```
Farmer (1) ──→ (N) Labor_Post (1) ──→ (N) Labor_Application (M) ──→ User (Workers)
```
- Farmer posts jobs
- Workers apply for jobs

### 10. FARMER → LOAN → LOAN_EMI
```
Farmer (1) ──→ (N) Loan (1) ──→ (N) Loan_EMI
```
- Each loan has multiple EMI records
- Track payment history

### 11. FARMER → FORUM_POST → FORUM_COMMENT
```
Farmer (1) ──→ (N) Forum_Post (1) ──→ (N) Forum_Comment
```
- Community discussions
- Multiple comments per post

---

## Key Data Flows

### Crop Recommendation Flow
```
User Input:
- Land Details (soil, area, water)
- Season
- Budget
- Crop History
- Weather Data
        ↓
   AI Engine
        ↓
Output:
- Top 3 Recommended Crops
- Confidence Scores (0-100)
- Expected Yield
- Expected Profit
- Risk Level
```

### Profit Prediction Flow
```
Inputs:
- Selected Crop
- Land Size
- Historical Costs
- Market Prices
- Weather Forecast
        ↓
   Calculation Engine
        ↓
Outputs:
- Total Cost Breakdown
- Expected Revenue
- Expected Profit
- Break-even Analysis
- Confidence Level
```

### Disease Detection Flow
```
Farmer Action:
- Upload Crop Image
        ↓
   Image Processing
        ↓
   Deep Learning Model (CNN)
        ↓
Output:
- Disease Name (or "Healthy")
- Confidence Score
- Treatment Recommendations
- Pesticide Suggestions
- Estimated Yield Loss
```

### Market Price Prediction Flow
```
Data Sources:
- Historical Prices (5 years)
- Volume Traded
- Seasonal Patterns
- Weather Impact
- Global Commodity Prices
        ↓
   Time Series Model (ARIMA/Prophet)
        ↓
Output:
- Price Forecast (7-30 days)
- Recommendation (Sell Now / Wait)
- Confidence Level
```

---

## Data Integrity Constraints

### Primary Key Constraints
- All tables have surrogate primary keys (auto-increment integers)
- Ensures performance and referential integrity

### Unique Constraints
- `users.email` - Unique email per user
- `users.phone_number` - Unique phone number
- `crop.crop_name` - Unique crop names
- `scheme.scheme_code` - Unique scheme code
- `product_order.order_number` - Unique order ID
- `market_price(crop_id, market_location, date)` - Composite unique

### Foreign Key Constraints
- All relationships use CASCADE or RESTRICT as appropriate
- Prevents orphaned records
- Maintains referential integrity

### Check Constraints
- `users.role` - Only valid roles
- `crop_history.season` - Valid seasons (KHARIF, RABI, SUMMER, ZAID)
- `alert.alert_type` - Valid alert types
- `product_order.order_status` - Valid order statuses
- `user_otp` - OTP must be 6 digits

---

## Indexing Strategy

### Frequently Queried Fields
```
Performance-Critical Indexes:
- users(email, phone_number, role, status)
- farmer(state, district, user_id)
- land(farmer_id)
- crop(crop_name)
- crop_history(land_id, crop_id, status)
- weather(farmer_id, date)
- alert(farmer_id, alert_severity, created_at)
- market_price(crop_id, date, created_at)
- notification(user_id, created_at)
- crop_recommendation(farmer_id, land_id)
- profit_prediction(farmer_id, land_id)
```

### Composite Indexes
```
- (crop_id, market_location, date)
- (land_id, crop_id, season)
- (farmer_id, created_at)
- (state, district)
```

---

## Scalability Considerations

### Partitioning Strategy
```
Tables to Partition by Date:
- weather (monthly)
- market_price (quarterly)
- price_history (quarterly)
- alert (monthly)
- notification (monthly)
- admin_audit_log (monthly)

Tables to Partition by Farmer:
- crop_history (yearly)
- disease_detection_result (yearly)
- irrigation_schedule (yearly)
```

### Archiving Strategy
```
- Keep active data (< 2 years)
- Archive old data (> 2 years) to data warehouse
- Optimize queries for recent data
```

### Caching Strategy
```
Cache in Redis:
- Crop master data (static)
- Weather data (1 hour TTL)
- Market prices (6 hour TTL)
- User profiles (24 hour TTL)
- Scheme eligibility (cache invalidate on update)
```

---

## Normalization Level: 3NF

### Design Principles
1. Each table represents a single entity
2. No partial dependencies (2NF)
3. No transitive dependencies (3NF)
4. Designed for read-heavy operations
5. Indexes optimize common queries
6. Denormalization only where performance critical

---

## SQL Views for Common Queries

```sql
-- Farmer Dashboard View
CREATE VIEW farmer_dashboard AS
SELECT f.id, f.first_name, COUNT(l.id) as land_count,
       SUM(l.total_area_hectares) as total_area,
       COUNT(DISTINCT ch.crop_id) as crops_grown,
       MAX(ch.harvest_date) as last_harvest_date
FROM farmer f
LEFT JOIN land l ON f.id = l.farmer_id
LEFT JOIN crop_history ch ON l.id = ch.land_id
GROUP BY f.id, f.first_name;

-- Active Crop Recommendations
CREATE VIEW active_recommendations AS
SELECT cr.*, c1.crop_name, c2.crop_name, c3.crop_name,
       f.first_name, l.total_area_hectares
FROM crop_recommendation cr
JOIN farmer f ON cr.farmer_id = f.id
JOIN land l ON cr.land_id = l.id
LEFT JOIN crop c1 ON cr.crop1_name = c1.crop_name
LEFT JOIN crop c2 ON cr.crop2_name = c2.crop_name
LEFT JOIN crop c3 ON cr.crop3_name = c3.crop_name
WHERE cr.recommendation_date >= CURRENT_DATE - INTERVAL '30 days';
```

---

## Backup & Recovery Strategy

- Full backups daily (2 AM IST)
- Incremental backups every 6 hours
- Point-in-time recovery enabled
- Replicated to secondary region
- 30-day retention policy
