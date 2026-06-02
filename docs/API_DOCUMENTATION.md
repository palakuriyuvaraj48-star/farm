# KrishiAI - Complete API Documentation

## Base URL
```
Production: https://api.krishiai.com/api/v1
Development: http://localhost:8080/api/v1
```

## Authentication
All endpoints require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

---

## 1. AUTHENTICATION APIs

### 1.1 User Registration
**POST** `/auth/register`

Request:
```json
{
  "phoneNumber": "9876543210",
  "email": "farmer@example.com",
  "password": "SecurePass@123",
  "role": "FARMER"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Registration successful. OTP sent to phone.",
  "data": {
    "userId": 1,
    "phoneNumber": "9876543210",
    "email": "farmer@example.com",
    "otpSent": true,
    "expiresIn": 300
  }
}
```

### 1.2 Verify OTP
**POST** `/auth/verify-otp`

Request:
```json
{
  "phoneNumber": "9876543210",
  "otpCode": "123456"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "phoneVerified": true,
    "nextStep": "complete_profile"
  }
}
```

### 1.3 Login
**POST** `/auth/login`

Request:
```json
{
  "email": "farmer@example.com",
  "password": "SecurePass@123"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600,
    "user": {
      "id": 1,
      "email": "farmer@example.com",
      "role": "FARMER",
      "farmerId": 1
    }
  }
}
```

### 1.4 Refresh Token
**POST** `/auth/refresh-token`

Request:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

---

## 2. FARMER PROFILE APIs

### 2.1 Create Farmer Profile
**POST** `/farmers/profile`

Request:
```json
{
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "dateOfBirth": "1980-05-15",
  "state": "Maharashtra",
  "district": "Pune",
  "taluka": "Baramati",
  "village": "Talegaon",
  "pincode": "412101",
  "latitude": "19.0760",
  "longitude": "73.8724",
  "farmingExperienceYears": 25,
  "annualIncome": 250000,
  "isOrganicFarmer": false
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Farmer profile created",
  "data": {
    "farmerId": 1,
    "firstName": "Rajesh",
    "state": "Maharashtra",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 2.2 Get Farmer Profile
**GET** `/farmers/profile`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "farmerId": 1,
    "firstName": "Rajesh",
    "lastName": "Kumar",
    "state": "Maharashtra",
    "district": "Pune",
    "farmingExperienceYears": 25,
    "landCount": 2,
    "totalAreaHectares": 5.5,
    "isOrganicFarmer": false,
    "profileCompleteness": 85
  }
}
```

### 2.3 Update Farmer Profile
**PUT** `/farmers/profile`

Request:
```json
{
  "firstName": "Rajesh",
  "annualIncome": 300000
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { /* Updated farmer data */ }
}
```

---

## 3. LAND MANAGEMENT APIs

### 3.1 Add Land
**POST** `/farmers/lands`

Request:
```json
{
  "landName": "North Field",
  "totalAreaHectares": 2.5,
  "soilType": "CLAY_LOAM",
  "soilPH": 7.2,
  "nitrogenLevel": 45,
  "phosphorusLevel": 25,
  "potassiumLevel": 180,
  "waterSource": "BOREWELL",
  "irrigationType": "DRIP",
  "isPrimaryLand": true
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": {
    "landId": 1,
    "farmerId": 1,
    "landName": "North Field",
    "totalAreaHectares": 2.5,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 3.2 Get All Lands
**GET** `/farmers/lands`

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "landId": 1,
      "landName": "North Field",
      "totalAreaHectares": 2.5,
      "soilType": "CLAY_LOAM",
      "isPrimaryLand": true
    },
    {
      "landId": 2,
      "landName": "South Field",
      "totalAreaHectares": 3.0,
      "soilType": "LOAMY",
      "isPrimaryLand": false
    }
  ]
}
```

### 3.3 Get Land Details
**GET** `/farmers/lands/{landId}`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "landId": 1,
    "landName": "North Field",
    "totalAreaHectares": 2.5,
    "soilType": "CLAY_LOAM",
    "soilPH": 7.2,
    "nitrogenLevel": 45,
    "phosphorusLevel": 25,
    "potassiumLevel": 180,
    "waterSource": "BOREWELL",
    "irrigationType": "DRIP",
    "currentCrop": "SUGARCANE"
  }
}
```

---

## 4. CROP RECOMMENDATION AI API

### 4.1 Get Crop Recommendations
**POST** `/ai/crop-recommendation`

Request:
```json
{
  "landId": 1,
  "season": "KHARIF",
  "budget": 50000,
  "includeRiskAnalysis": true
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "recommendationId": 1,
    "recommendationDate": "2024-01-15",
    "season": "KHARIF",
    "recommendations": [
      {
        "rank": 1,
        "cropName": "COTTON",
        "confidenceScore": 92,
        "expectedYieldQuintals": 15,
        "estimatedProfitRs": 75000,
        "riskLevel": "MEDIUM",
        "reasoning": "Soil pH and rainfall pattern ideal for cotton. High market demand.",
        "suitabilityScore": 9.2
      },
      {
        "rank": 2,
        "cropName": "GROUNDNUT",
        "confidenceScore": 87,
        "expectedYieldQuintals": 12,
        "estimatedProfitRs": 60000,
        "riskLevel": "LOW",
        "reasoning": "Good soil structure. Lower water requirement. Stable prices.",
        "suitabilityScore": 8.7
      },
      {
        "rank": 3,
        "cropName": "MILLETS",
        "confidenceScore": 78,
        "expectedYieldQuintals": 8,
        "estimatedProfitRs": 40000,
        "riskLevel": "LOW",
        "reasoning": "Drought resistant. Requires minimal irrigation.",
        "suitabilityScore": 7.8
      }
    ],
    "modelVersion": "v2.1",
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### 4.2 Get Recommendation Details
**GET** `/ai/crop-recommendation/{recommendationId}`

Response: Returns detailed recommendation with confidence intervals and risk factors.

---

## 5. PROFIT PREDICTION API

### 5.1 Calculate Profit Prediction
**POST** `/ai/profit-prediction`

Request:
```json
{
  "landId": 1,
  "cropId": 5,
  "expectedYieldQuintals": 15,
  "seedCostRs": 5000,
  "fertilizerCostRs": 8000,
  "pesticideCostRs": 3000,
  "laborCostRs": 15000,
  "waterCostRs": 2000,
  "equipmentCostRs": 4000
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "predictionId": 1,
    "cropName": "COTTON",
    "landAreaHectares": 2.5,
    "costs": {
      "seedCostRs": 5000,
      "fertilizerCostRs": 8000,
      "pesticideCostRs": 3000,
      "laborCostRs": 15000,
      "waterCostRs": 2000,
      "equipmentCostRs": 4000,
      "miscellaneousCostRs": 2000,
      "totalCostRs": 39000
    },
    "revenue": {
      "expectedYieldQuintals": 15,
      "expectedMarketPricePerQuintal": 5200,
      "expectedRevenueRs": 78000
    },
    "profitAnalysis": {
      "expectedProfitRs": 39000,
      "profitMarginPercentage": 50,
      "breakEvenPointQuintals": 7.5,
      "roi": 100
    },
    "riskAssessment": {
      "weatherRisk": "MEDIUM",
      "priceRisk": "HIGH",
      "yieldRisk": "LOW",
      "overallRisk": "MEDIUM",
      "riskScore": 6.5
    },
    "confidenceLevel": 85,
    "disclaimer": "Prediction based on historical data and current market conditions. Actual results may vary."
  }
}
```

---

## 6. WEATHER API

### 6.1 Get Current Weather
**GET** `/weather/current`

Query Params:
- `latitude` (optional)
- `longitude` (optional)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "weatherId": 1,
    "date": "2024-01-15",
    "location": "Pune, Maharashtra",
    "temperature": {
      "minCelsius": 15,
      "maxCelsius": 28,
      "currentCelsius": 22
    },
    "humidity": 65,
    "rainfall": {
      "actual": 0,
      "forecasted": 0
    },
    "windSpeed": 8,
    "uvIndex": 6,
    "condition": "PARTLY_CLOUDY",
    "updatedAt": "2024-01-15T15:00:00Z"
  }
}
```

### 6.2 Get 7-Day Weather Forecast
**GET** `/weather/forecast`

Query Params:
- `days` (1-30, default: 7)
- `latitude` (optional)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "location": "Pune, Maharashtra",
    "forecastData": [
      {
        "date": "2024-01-16",
        "dayNumber": 1,
        "temperatureMin": 14,
        "temperatureMax": 29,
        "humidity": 60,
        "rainfallProbability": 10,
        "expectedRainfallMm": 0,
        "windSpeed": 7,
        "condition": "SUNNY",
        "recommendations": [
          "Good day for irrigation",
          "Apply pesticides in evening"
        ]
      },
      {
        "date": "2024-01-17",
        "dayNumber": 2,
        "temperatureMin": 13,
        "temperatureMax": 27,
        "humidity": 70,
        "rainfallProbability": 40,
        "expectedRainfallMm": 5,
        "windSpeed": 10,
        "condition": "PARTLY_CLOUDY",
        "recommendations": [
          "Possible light rain expected",
          "Defer irrigation if rains occur"
        ]
      }
    ]
  }
}
```

---

## 7. DISEASE DETECTION AI API

### 7.1 Upload Crop Image for Disease Detection
**POST** `/ai/disease-detection/upload`

Content-Type: `multipart/form-data`

Request:
```
{
  "cropImage": <file>,
  "cropId": 5,
  "landId": 1
}
```

Response (202 Accepted):
```json
{
  "success": true,
  "message": "Image uploaded. Processing...",
  "data": {
    "detectionId": "det-12345",
    "status": "PROCESSING",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "estimatedProcessingTime": 15
  }
}
```

### 7.2 Get Disease Detection Result
**GET** `/ai/disease-detection/{detectionId}`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "detectionId": "det-12345",
    "cropName": "COTTON",
    "analysisResult": {
      "diseaseDetected": true,
      "diseaseName": "BACTERIAL_BLIGHT",
      "confidenceScore": 94,
      "severityPercentage": 35,
      "affectedLeafArea": "HIGH",
      "stageOfDisease": "ADVANCED"
    },
    "treatment": {
      "recommendedPesticide": [
        "Copper Oxychloride 50%",
        "Streptocycline 90%"
      ],
      "spraySchedule": "Every 7-10 days",
      "preventiveMeasures": [
        "Remove infected leaves",
        "Improve plant spacing",
        "Avoid overhead irrigation"
      ],
      "estimatedYieldLoss": 25
    },
    "relatedDiseases": [
      {
        "name": "ANGULAR_LEAF_SPOT",
        "probability": 8
      }
    ],
    "processedAt": "2024-01-15T10:35:00Z",
    "imageUrl": "https://api.krishiai.com/images/det-12345.jpg"
  }
}
```

---

## 8. MARKET & PRICING API

### 8.1 Get Current Market Prices
**GET** `/market/prices`

Query Params:
- `cropId` or `cropName` (required)
- `state` (optional)
- `district` (optional)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "cropName": "COTTON",
    "date": "2024-01-15",
    "markets": [
      {
        "marketName": "Akola",
        "state": "Maharashtra",
        "district": "Akola",
        "pricePerQuintal": 5250,
        "minPrice": 5100,
        "maxPrice": 5400,
        "volumeTraded": 10000,
        "qualityGrade": "A",
        "trend": "UP"
      },
      {
        "marketName": "Vikarabad",
        "state": "Telangana",
        "district": "Vikarabad",
        "pricePerQuintal": 5200,
        "minPrice": 5050,
        "maxPrice": 5350,
        "volumeTraded": 8500,
        "qualityGrade": "A",
        "trend": "STABLE"
      }
    ]
  }
}
```

### 8.2 Get Price History
**GET** `/market/price-history/{cropId}`

Query Params:
- `days` (7, 30, 90, 365)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "cropName": "COTTON",
    "priceData": [
      {
        "date": "2024-01-08",
        "averagePrice": 5100,
        "minPrice": 5000,
        "maxPrice": 5200
      },
      {
        "date": "2024-01-09",
        "averagePrice": 5150,
        "minPrice": 5050,
        "maxPrice": 5250
      }
    ],
    "trend": "UPWARD",
    "volatility": "MODERATE"
  }
}
```

### 8.3 Get Price Prediction & Sell Recommendation
**GET** `/market/price-prediction/{cropId}`

Query Params:
- `forecastDays` (7, 30)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "cropName": "COTTON",
    "currentPrice": 5200,
    "predictions": {
      "next7Days": {
        "predictedPrice": 5400,
        "confidenceScore": 82,
        "trend": "UPWARD",
        "volatility": "MEDIUM"
      },
      "next30Days": {
        "predictedPrice": 5600,
        "confidenceScore": 72,
        "trend": "UPWARD",
        "volatility": "HIGH"
      }
    },
    "recommendation": {
      "action": "HOLD",
      "reasoning": "Prices expected to rise in next 2 weeks. Hold and sell after 15 days.",
      "expectedGain": "₹400 per quintal (7.7%)",
      "confidence": 80
    },
    "seasonalTrend": "Peak harvest season. Expect high supply impact in Feb.",
    "modelVersion": "v3.2",
    "disclaimer": "Predictions are based on historical data and ML models. Market conditions can change rapidly."
  }
}
```

---

## 9. GOVERNMENT SCHEMES API

### 9.1 Get Eligible Schemes
**GET** `/schemes/eligibility`

Query Params:
- `state` (optional)
- `landSize` (optional)
- `cropId` (optional)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalSchemes": 45,
    "eligibleSchemes": 12,
    "schemes": [
      {
        "schemeId": 1,
        "schemeName": "PM-KISAN",
        "schemeCode": "PKS-001",
        "description": "Pradhan Mantri Kisan Samman Nidhi",
        "eligibilityScore": 98,
        "isEligible": true,
        "benefits": "₹6000 annually in 3 installments",
        "subsidy": 100,
        "applicationDeadline": "2024-12-31",
        "requiredDocuments": ["Land certificate", "Aadhar card", "Bank details"],
        "applicationUrl": "https://pmkisan.gov.in"
      },
      {
        "schemeId": 2,
        "schemeName": "SOIL_HEALTH_CARD",
        "description": "Soil Health Card Scheme",
        "eligibilityScore": 95,
        "isEligible": true,
        "benefits": "Free soil testing and recommendations",
        "subsidy": 100,
        "requiredDocuments": ["Land certificate", "Soil samples"]
      }
    ]
  }
}
```

### 9.2 Get Scheme Details
**GET** `/schemes/{schemeId}`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "schemeId": 1,
    "schemeName": "PM-KISAN",
    "description": "Pradhan Mantri Kisan Samman Nidhi",
    "ministry": "Ministry of Agriculture",
    "type": "INCOME_SUPPORT",
    "benefits": "₹6000 annually in 3 installments",
    "eligibility": {
      "landHolding": "All sizes",
      "states": "All",
      "crops": "All",
      "requirements": ["Farmer", "Indian citizen", "Land ownership proof"]
    },
    "applicationProcess": [
      "Step 1: Gather required documents",
      "Step 2: Register on pmkisan.gov.in",
      "Step 3: Submit land details",
      "Step 4: Get approval"
    ],
    "helpline": "+91-1800-234-5368",
    "website": "https://pmkisan.gov.in",
    "statusTracker": true
  }
}
```

---

## 10. IRRIGATION ADVISOR API

### 10.1 Get Irrigation Schedule
**POST** `/irrigation/schedule`

Request:
```json
{
  "landId": 1,
  "cropId": 5,
  "soilMoisture": 45,
  "weatherForecast": true
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "scheduleId": 1,
    "cropName": "COTTON",
    "landArea": 2.5,
    "schedule": [
      {
        "irrigationDay": 1,
        "scheduledDate": "2024-01-16",
        "waterRequired": 50,
        "irrigationMethod": "DRIP",
        "duration": 120,
        "costRs": 250,
        "rainProbability": 10,
        "recommendation": "Proceed with irrigation"
      },
      {
        "irrigationDay": 2,
        "scheduledDate": "2024-01-19",
        "waterRequired": 50,
        "irrigationMethod": "DRIP",
        "duration": 120,
        "costRs": 250,
        "rainProbability": 40,
        "recommendation": "May skip if rains occur. Monitor forecast."
      }
    ],
    "totalWaterRequired": 1500,
    "estimatedCostRs": 7500,
    "waterSavings": "20% compared to conventional methods"
  }
}
```

---

## 11. COMMUNITY & FORUM API

### 11.1 Get Forum Posts
**GET** `/community/forum`

Query Params:
- `category` (DISEASE, PEST, IRRIGATION, MARKET, GENERAL)
- `page` (default: 1)
- `limit` (default: 20)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalPosts": 342,
    "currentPage": 1,
    "posts": [
      {
        "postId": 1,
        "title": "Cotton spotted bollworm treatment",
        "author": "Ramesh Kumar",
        "category": "PEST",
        "content": "How to treat spotted bollworm in cotton?",
        "commentCount": 8,
        "viewCount": 156,
        "isSolved": true,
        "createdAt": "2024-01-14T10:30:00Z"
      }
    ]
  }
}
```

### 11.2 Create Forum Post
**POST** `/community/forum`

Request:
```json
{
  "title": "Pest infestation in sugarcane",
  "content": "Having issues with top bore pest...",
  "category": "PEST"
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": {
    "postId": 123,
    "title": "Pest infestation in sugarcane",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 12. LOAN & FINANCE API

### 12.1 Calculate Loan EMI
**POST** `/finance/calculate-emi`

Request:
```json
{
  "loanAmount": 500000,
  "interestRate": 7.5,
  "tenure": 36
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "loanAmount": 500000,
    "interestRate": 7.5,
    "tenure": 36,
    "monthlyEmi": 15210,
    "totalInterest": 47560,
    "totalAmount": 547560,
    "emiSchedule": [
      {
        "month": 1,
        "emiAmount": 15210,
        "principalComponent": 13627,
        "interestComponent": 1583,
        "balanceAmount": 486373
      }
    ]
  }
}
```

### 12.2 Get Loan Calculator
**POST** `/finance/loan-calculator`

Request:
```json
{
  "purpose": "SEED_PURCHASE",
  "amount": 100000,
  "state": "Maharashtra"
}
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "purpose": "SEED_PURCHASE",
    "amount": 100000,
    "applicableSchemes": [
      {
        "schemeName": "Kisan Credit Card",
        "interestRate": 4,
        "maxTenure": 84,
        "subsidy": 2,
        "monthlyEmi": 1420,
        "totalCost": 119280
      }
    ],
    "recommendation": "KCC scheme offers best terms"
  }
}
```

---

## 13. MARKETPLACE API

### 13.1 Get Products
**GET** `/marketplace/products`

Query Params:
- `category` (SEEDS, FERTILIZERS, EQUIPMENT, PESTICIDES)
- `search` (optional)
- `page` (default: 1)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalProducts": 2345,
    "products": [
      {
        "productId": 1,
        "productName": "Cotton Seeds - Premium Grade",
        "category": "SEEDS",
        "price": 850,
        "unit": "per kg",
        "seller": "AgriSeeds Ltd",
        "rating": 4.8,
        "reviews": 234,
        "inStock": true,
        "image": "https://api.krishiai.com/images/prod-1.jpg"
      }
    ]
  }
}
```

### 13.2 Place Order
**POST** `/marketplace/orders`

Request:
```json
{
  "productId": 1,
  "quantity": 10,
  "deliveryAddress": "...",
  "paymentMethod": "UPI"
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-2024-001",
    "status": "CONFIRMED",
    "totalAmount": 8500,
    "estimatedDelivery": "2024-01-17",
    "trackingUrl": "https://api.krishiai.com/track/ORD-2024-001"
  }
}
```

---

## 14. WAREHOUSE API

### 14.1 Find Warehouses
**GET** `/warehouse/search`

Query Params:
- `state` (required)
- `district` (optional)
- `capacityRequired` (quintals)

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "totalWarehouses": 12,
    "warehouses": [
      {
        "warehouseId": 1,
        "name": "Akola Storage Facility",
        "location": "Akola, Maharashtra",
        "distance": 5,
        "totalCapacity": 5000,
        "availableCapacity": 1200,
        "rentPerQuintalPerMonth": 15,
        "storageType": "COLD_STORAGE",
        "insurance": true,
        "contactNumber": "9876543210"
      }
    ]
  }
}
```

### 14.2 Book Warehouse Space
**POST** `/warehouse/book`

Request:
```json
{
  "warehouseId": 1,
  "cropId": 5,
  "quantity": 200,
  "startDate": "2024-01-20",
  "endDate": "2024-04-20"
}
```

Response (201 Created):
```json
{
  "success": true,
  "data": {
    "bookingId": "BOOK-2024-001",
    "status": "CONFIRMED",
    "totalCost": 9000,
    "paymentDue": "2024-01-20"
  }
}
```

---

## Error Codes

```
200: Success
201: Created
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
422: Validation Failed
429: Rate Limited
500: Internal Server Error
503: Service Unavailable
```

---

## Rate Limiting

- Free tier: 100 requests/hour
- Premium tier: 1000 requests/hour
- Enterprise: Unlimited

---

## Webhooks

Subscribe to real-time events:

```bash
POST /webhooks/subscribe
{
  "event": "DISEASE_DETECTED",
  "url": "https://your-domain.com/webhook"
}
```

Events:
- `CROP_RECOMMENDATION_READY`
- `DISEASE_DETECTED`
- `PRICE_ALERT`
- `WEATHER_ALERT`
- `PEST_ALERT`
