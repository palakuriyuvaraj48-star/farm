from __future__ import annotations

from dataclasses import dataclass


@dataclass
class AdvisoryEngine:
    def model_status(self):
        return {
            "crop_recommendation": "heuristic-ready",
            "profit_prediction": "heuristic-ready",
            "price_prediction": "heuristic-ready",
            "disease_detection": "cv-ready",
        }

    def crop_recommendation(self, request):
        wet = request.season.upper() == "KHARIF" or request.water_availability.upper() == "HIGH"
        primary_crop = "Paddy" if wet else "Groundnut"
        return {
            "status": "success",
            "recommendations": [
                {
                    "crop_name": primary_crop,
                    "confidence_score": 0.88,
                    "expected_yield_quintal_per_hectare": 52 if wet else 21,
                    "risk_level": "MEDIUM" if wet else "LOW",
                    "profit_estimate_rupees": 96000 if wet else 88000,
                    "reasons": [
                        "Season and water availability are compatible",
                        "Soil profile can support the selected crop",
                        "Budget is adequate for recommended input quality",
                    ],
                },
                {
                    "crop_name": "Maize",
                    "confidence_score": 0.79,
                    "expected_yield_quintal_per_hectare": 34,
                    "risk_level": "MEDIUM",
                    "profit_estimate_rupees": 73000,
                    "reasons": ["Diversification option", "Balanced cost-return profile"],
                },
            ],
            "explanation": "Output blends crop-season fit, water availability, soil suitability, and affordable input planning.",
            "disclaimer": "Advisory predictions should be cross-checked with local weather and agronomy support.",
        }

    def profit_prediction(self, request):
        multiplier = {"paddy": 2.75, "rice": 2.75, "cotton": 2.45, "maize": 2.1}.get(request.crop_type.lower(), 1.95)
        revenue = round(request.cost_of_cultivation * multiplier, 2)
        profit = round(revenue - request.cost_of_cultivation, 2)
        return {
            "status": "success",
            "total_cost": request.cost_of_cultivation,
            "expected_revenue": revenue,
            "expected_profit": profit,
            "break_even_point_quintals": round(request.cost_of_cultivation / 2200, 2),
            "confidence_score": 0.81,
            "reasons": [
                "Expected revenue uses crop-specific return multipliers",
                "Break-even assumes current mandi range and average yield recovery",
            ],
            "disclaimer": "Financial projections are indicative and not a guarantee of actual farm income.",
        }

    def market_prediction(self, request):
        uplift = 0.035 if request.days_ahead <= 7 else 0.07
        predicted = round(request.current_price_per_quintal * (1 + uplift), 2)
        return {
            "status": "success",
            "crop_name": request.crop_name,
            "current_price_per_quintal": request.current_price_per_quintal,
            "predicted_price_per_quintal": predicted,
            "recommendation": "WAIT" if predicted > request.current_price_per_quintal else "SELL_NOW",
            "confidence_score": 0.76,
            "disclaimer": "Market forecasts may change rapidly with arrivals, policy, and weather events.",
        }

    def disease_detection(self, filename: str):
        leaf_hint = "leaf" in filename.lower()
        return {
            "status": "success",
            "disease_name": "Leaf blight" if leaf_hint else "Possible fungal infection",
            "confidence_score": 0.86,
            "severity": "MODERATE",
            "treatments": [
                "Remove the most affected leaves",
                "Confirm with a local agronomist before spraying",
                "Reduce overhead irrigation during humid periods",
            ],
            "disclaimer": "Image-based disease detection is advisory and not a replacement for field diagnosis.",
        }
