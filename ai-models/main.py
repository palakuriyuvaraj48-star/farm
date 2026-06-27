import logging
import os
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from schemas.prediction import CropRecommendationRequest, MarketPredictionRequest, ProfitPredictionRequest
from services.advisory import AdvisoryEngine

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))

app = FastAPI(title="KrishiAI AI Service", version="1.0.0")
engine = AdvisoryEngine()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8080").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/health")
async def health():
    return {"status": "healthy", "models": engine.model_status()}


@app.post("/api/v1/ai/crop-recommendation")
async def crop_recommendation(request: CropRecommendationRequest):
    return engine.crop_recommendation(request)


@app.post("/api/v1/ai/profit-prediction")
async def profit_prediction(request: ProfitPredictionRequest):
    return engine.profit_prediction(request)


@app.post("/api/v1/ai/price-prediction")
async def market_prediction(request: MarketPredictionRequest):
    return engine.market_prediction(request)


@app.post("/api/v1/ai/disease-detection")
async def disease_detection(file: UploadFile = File(...)):
    if not file.filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        raise HTTPException(status_code=400, detail="Unsupported image format")
    return engine.disease_detection(file.filename)
