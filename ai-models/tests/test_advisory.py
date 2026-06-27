from services.advisory import AdvisoryEngine


def test_crop_recommendation_returns_candidates():
    engine = AdvisoryEngine()
    payload = type(
        "Req",
        (),
        {
            "season": "KHARIF",
            "water_availability": "MEDIUM",
            "budget": 75000,
            "land_area_hectares": 2.5,
        },
    )()

    result = engine.crop_recommendation(payload)
    assert result["status"] == "success"
    assert len(result["recommendations"]) >= 1


def test_profit_prediction_returns_profit():
    engine = AdvisoryEngine()
    payload = type(
        "Req",
        (),
        {"crop_type": "Paddy", "cost_of_cultivation": 52000},
    )()

    result = engine.profit_prediction(payload)
    assert result["expected_profit"] > 0
