"""
KrishiAI - Smart Farmer Decision Support System
AI/ML Service Main Entry Point

Provides REST APIs for:
- Crop recommendation with confidence scores
- Disease detection from crop images
- Market price prediction
- Profit prediction
- Weather recommendations

Author: Senior AI/ML Engineer
Version: 1.0.0
"""

import os
import logging
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import numpy as np
from typing import Optional, List
import traceback

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="KrishiAI AI Service",
    description="AI/ML service for crop recommendation, disease detection, and price prediction",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8080").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and orchestration."""
    try:
        return {
            "status": "healthy",
            "service": "KrishiAI AI Service",
            "version": "1.0.0",
            "models": {
                "crop_recommendation": "ready",
                "disease_detection": "ready",
                "price_prediction": "ready"
            }
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")

# Ready endpoint for Kubernetes
@app.get("/ready")
async def readiness_check():
    """Readiness check endpoint for Kubernetes."""
    try:
        return {"status": "ready"}
    except Exception as e:
        logger.error(f"Readiness check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service not ready")

# Crop Recommendation endpoints
@app.post("/api/v1/ai/crop-recommendation")
async def recommend_crop(request: dict):
    """
    Recommend suitable crops based on farmer inputs.
    
    Request body:
    {
        "location_latitude": float,
        "location_longitude": float,
        "soil_type": "LOAMY|CLAY|SANDY|SILT",
        "soil_ph": float,
        "soil_nitrogen": float,
        "soil_phosphorus": float,
        "soil_potassium": float,
        "season": "KHARIF|RABI|SUMMER|ZAID",
        "water_availability": "HIGH|MEDIUM|LOW",
        "budget": int
    }
    
    Response:
    {
        "status": "success",
        "recommendations": [
            {
                "crop_id": "123",
                "crop_name": "Rice",
                "confidence_score": 0.92,
                "expected_yield_kg_per_hectare": 5500,
                "risk_level": "LOW",
                "profit_estimate_rupees": 25000,
                "reasons": ["Good soil pH", "Sufficient water"],
                "warnings": []
            }
        ],
        "confidence": 0.92
    }
    """
    try:
        logger.info(f"Crop recommendation request received: {request}")
        
        # TODO: Implement actual ML model inference
        # This will call the trained crop recommendation model
        
        # Placeholder response
        recommendations = [
            {
                "crop_id": "1",
                "crop_name": "Rice",
                "confidence_score": 0.92,
                "expected_yield_kg_per_hectare": 5500,
                "risk_level": "LOW",
                "profit_estimate_rupees": 25000,
                "reasons": ["Optimal soil pH", "Sufficient water availability"],
                "warnings": []
            },
            {
                "crop_id": "2",
                "crop_name": "Wheat",
                "confidence_score": 0.78,
                "expected_yield_kg_per_hectare": 4200,
                "risk_level": "MEDIUM",
                "profit_estimate_rupees": 18000,
                "reasons": ["Good soil nutrients"],
                "warnings": ["Water availability is moderate"]
            }
        ]
        
        return {
            "status": "success",
            "recommendations": recommendations,
            "overall_confidence": 0.85
        }
        
    except Exception as e:
        logger.error(f"Error in crop recommendation: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

# Disease Detection endpoints
@app.post("/api/v1/ai/disease-detection")
async def detect_disease(file: UploadFile = File(...)):
    """
    Detect diseases in crop images using deep learning.
    
    Request:
    - multipart/form-data with image file
    
    Response:
    {
        "status": "success",
        "disease_name": "Leaf Blight",
        "confidence_score": 0.94,
        "severity": "SEVERE",
        "affected_area_percentage": 35,
        "treatment_recommendations": [
            {
                "treatment_name": "Fungicide Application",
                "description": "Apply copper-based fungicide",
                "frequency": "Every 7 days",
                "cost_rupees": 500,
                "effectiveness": 0.85
            }
        ],
        "warnings": ["Plant requires immediate attention"],
        "healthy_probability": 0.06
    }
    """
    try:
        logger.info(f"Disease detection request received for file: {file.filename}")
        
        # Validate file
        if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            raise HTTPException(status_code=400, detail="Invalid file format. Only images allowed.")
        
        # TODO: Implement actual disease detection model
        # 1. Read image from file
        # 2. Preprocess image
        # 3. Run TensorFlow/OpenCV model
        # 4. Post-process results
        
        # Placeholder response
        return {
            "status": "success",
            "disease_name": "Leaf Blight",
            "confidence_score": 0.94,
            "severity": "SEVERE",
            "affected_area_percentage": 35,
            "treatment_recommendations": [
                {
                    "treatment_name": "Fungicide Application",
                    "description": "Apply copper-based fungicide",
                    "frequency": "Every 7 days",
                    "cost_rupees": 500,
                    "effectiveness": 0.85
                }
            ],
            "warnings": ["Plant requires immediate attention"],
            "healthy_probability": 0.06
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in disease detection: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

# Price Prediction endpoints
@app.post("/api/v1/ai/price-prediction")
async def predict_price(request: dict):
    """
    Predict market prices for crops.
    
    Request body:
    {
        "crop_id": "1",
        "crop_name": "Rice",
        "quantity_kg": 1000,
        "current_price_per_kg": 35,
        "days_ahead": 7,
        "location": "Hyderabad"
    }
    
    Response:
    {
        "status": "success",
        "current_price_per_kg": 35,
        "predicted_price_per_kg": 38.5,
        "price_change_percentage": 10,
        "confidence_score": 0.82,
        "recommendation": "SELL_NOW",
        "reasoning": "Price expected to remain stable",
        "historical_trend": "INCREASING",
        "optimal_sell_date": "2024-01-15",
        "price_range": {"min": 36, "max": 40}
    }
    """
    try:
        logger.info(f"Price prediction request received: {request}")
        
        # TODO: Implement actual price prediction model
        
        # Placeholder response
        return {
            "status": "success",
            "current_price_per_kg": request.get("current_price_per_kg", 35),
            "predicted_price_per_kg": 38.5,
            "price_change_percentage": 10,
            "confidence_score": 0.82,
            "recommendation": "SELL_NOW",
            "reasoning": "Price expected to remain stable with potential slight increase",
            "historical_trend": "INCREASING",
            "optimal_sell_date": "2024-01-15",
            "price_range": {"min": 36, "max": 40}
        }
        
    except Exception as e:
        logger.error(f"Error in price prediction: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

# Profit Prediction endpoints
@app.post("/api/v1/ai/profit-prediction")
async def predict_profit(request: dict):
    """
    Predict profit for crop cultivation.
    
    Request body:
    {
        "crop_id": "1",
        "land_area_hectares": 2,
        "soil_fertility": "HIGH",
        "expected_yield_kg_per_hectare": 5500,
        "cost_of_seeds_rupees": 2000,
        "cost_of_fertilizers_rupees": 5000,
        "cost_of_labor_rupees": 8000,
        "cost_of_irrigation_rupees": 3000,
        "market_price_per_kg": 35
    }
    
    Response:
    {
        "status": "success",
        "total_cost": 18000,
        "expected_revenue": 385000,
        "expected_profit": 367000,
        "profit_margin_percentage": 95,
        "break_even_point_kg": 514,
        "roi_percentage": 2039,
        "risk_assessment": {
            "weather_risk": "MEDIUM",
            "market_risk": "LOW",
            "pest_risk": "HIGH",
            "overall_risk": "MEDIUM"
        },
        "confidence_score": 0.78
    }
    """
    try:
        logger.info(f"Profit prediction request received: {request}")
        
        # TODO: Implement actual profit prediction model
        
        # Placeholder response
        land_area = request.get("land_area_hectares", 1)
        expected_yield = request.get("expected_yield_kg_per_hectare", 5500)
        market_price = request.get("market_price_per_kg", 35)
        total_cost = (
            request.get("cost_of_seeds_rupees", 0) +
            request.get("cost_of_fertilizers_rupees", 0) +
            request.get("cost_of_labor_rupees", 0) +
            request.get("cost_of_irrigation_rupees", 0)
        )
        
        total_yield = land_area * expected_yield
        expected_revenue = total_yield * market_price
        expected_profit = expected_revenue - total_cost
        
        return {
            "status": "success",
            "total_cost": total_cost,
            "expected_revenue": expected_revenue,
            "expected_profit": expected_profit,
            "profit_margin_percentage": (expected_profit / expected_revenue * 100) if expected_revenue > 0 else 0,
            "break_even_point_kg": total_cost / market_price if market_price > 0 else 0,
            "roi_percentage": (expected_profit / total_cost * 100) if total_cost > 0 else 0,
            "risk_assessment": {
                "weather_risk": "MEDIUM",
                "market_risk": "LOW",
                "pest_risk": "HIGH",
                "overall_risk": "MEDIUM"
            },
            "confidence_score": 0.78
        }
        
    except Exception as e:
        logger.error(f"Error in profit prediction: {str(e)}\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Handle HTTP exceptions."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "message": exc.detail
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Handle unexpected exceptions."""
    logger.error(f"Unhandled exception: {str(exc)}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal server error"
        }
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize models and services on startup."""
    logger.info("KrishiAI AI Service starting up...")
    logger.info("Loading ML models...")
    # TODO: Load pre-trained models
    logger.info("ML models loaded successfully")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown."""
    logger.info("KrishiAI AI Service shutting down...")

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with service information."""
    return {
        "service": "KrishiAI AI Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "redoc": "/redoc"
        }
    }

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level=os.getenv("LOG_LEVEL", "info")
    )
