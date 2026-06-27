from pydantic import BaseModel, Field


class CropRecommendationRequest(BaseModel):
    location: str
    soil_type: str = Field(alias="soilType")
    season: str
    water_availability: str = Field(alias="waterAvailability")
    budget: float
    land_area_hectares: float = Field(alias="landAreaHectares")

    class Config:
        populate_by_name = True


class ProfitPredictionRequest(BaseModel):
    land_size_hectares: float = Field(alias="landSizeHectares")
    crop_type: str = Field(alias="cropType")
    cost_of_cultivation: float = Field(alias="costOfCultivation")

    class Config:
        populate_by_name = True


class MarketPredictionRequest(BaseModel):
    crop_name: str = Field(alias="cropName")
    current_price_per_quintal: float = Field(alias="currentPricePerQuintal")
    days_ahead: int = Field(default=7, alias="daysAhead")

    class Config:
        populate_by_name = True
