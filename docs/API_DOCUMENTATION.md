# KrishiAI API Documentation

## Base URLs

- Backend: `http://localhost:8080/api/v1`
- AI service: `http://localhost:5000/api/v1/ai`

## Response envelope

```json
{
  "success": true,
  "message": "Dashboard overview generated",
  "data": {},
  "timestamp": "2026-06-02T21:30:00+05:30"
}
```

## Auth

### `POST /auth/send-otp`

Request:

```json
{
  "phoneNumber": "9876543210"
}
```

### `POST /auth/verify-otp`

Request:

```json
{
  "phoneNumber": "9876543210",
  "otp": "123456"
}
```

Response contains JWT-bearing login payload from the existing auth module.

## Dashboard

### `GET /dashboard/overview`

Returns the unified farmer dashboard with:

- farmer summary
- weather intelligence
- crop recommendation preview
- profit prediction preview
- market, schemes, labor, warehouse, community, and finance snapshots
- voice assistant hints

## Advisory

### `POST /advisory/crop-recommendation`

Request:

```json
{
  "location": "Nalgonda, Telangana",
  "soilType": "LOAMY",
  "season": "KHARIF",
  "waterAvailability": "MEDIUM",
  "budget": 75000,
  "landAreaHectares": 2.5
}
```

Response:

```json
{
  "success": true,
  "message": "Crop recommendation ready",
  "data": {
    "recommendations": [
      {
        "cropName": "Paddy",
        "confidenceScore": 0.88,
        "expectedYieldQuintalPerHectare": 52,
        "riskLevel": "MEDIUM",
        "profitEstimate": 96000,
        "reasons": [
          "Matches current season and water profile",
          "Soil type supports stable germination"
        ]
      }
    ],
    "explanation": "Recommendations combine season fit, soil compatibility, water availability, and achievable budget.",
    "disclaimer": "Predictions are advisory estimates and should be validated locally."
  }
}
```

### `POST /advisory/profit-prediction`

Request:

```json
{
  "landSizeHectares": 2.5,
  "cropType": "Paddy",
  "costOfCultivation": 52000
}
```

Returns:

- total cost
- expected revenue
- expected profit
- break-even point
- confidence score
- reasons
- disclaimer

### `GET /advisory/weather`

Returns current weather, multi-day forecast, farm recommendations, and alerts.

### `GET /advisory/irrigation`

Returns irrigation schedule, drought risk, water-saving recommendations, and recommended action.

### `POST /advisory/disease-detection`

Multipart form-data:

- `file`: crop image

Returns:

- disease name
- confidence score
- severity
- symptoms
- treatments
- disclaimer

## Ecosystem

### `GET /ecosystem/snapshot`

Returns:

- market cards
- scheme matches
- community feed
- marketplace preview
- warehouse options
- labor opportunities
- finance card

## AI service endpoints

The FastAPI service exposes the following endpoints for direct inference or future backend proxying:

- `POST /api/v1/ai/crop-recommendation`
- `POST /api/v1/ai/profit-prediction`
- `POST /api/v1/ai/price-prediction`
- `POST /api/v1/ai/disease-detection`
- `GET /health`

## Notes

- Every advisory response includes confidence and explanation content.
- All predictions should be shown with a user-facing disclaimer.
- Production integrations for live weather, mandi prices, STT, TTS, and SMS are designed as replaceable providers.
