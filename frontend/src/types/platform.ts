export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export type CropOption = {
  cropName: string
  confidenceScore: number
  expectedYieldQuintalPerHectare: number
  riskLevel: string
  profitEstimate: number
  reasons: string[]
}

export type DashboardOverview = {
  farmer: {
    name: string
    district: string
    totalLandHectares: number
    preferredLanguage: string
  }
  metrics: { label: string; value: string; trend: string }[]
  weather: {
    current: { condition: string; temperatureCelsius: number; humidity: number; rainChancePercent: number }
    forecast: { day: string; summary: string; minTemp: number; maxTemp: number; rainChancePercent: number }[]
    recommendations: string[]
    alerts: string[]
  }
  cropRecommendation: {
    recommendations: CropOption[]
    explanation: string
    disclaimer: string
  }
  profitPrediction: {
    totalCost: number
    expectedRevenue: number
    expectedProfit: number
    breakEvenPointQuintals: number
    confidenceScore: number
    reasons: string[]
    disclaimer: string
  }
  ecosystem: {
    market: { crop: string; currentPrice: number; predictedPrice: number; recommendation: string; confidenceScore: number }[]
    schemes: { name: string; eligibilityScore: number; benefit: string; action: string }[]
    community: { title: string; category: string; replies: number; urgent: boolean }[]
    marketplace: { product: string; category: string; price: number; seller: string }[]
    warehouses: { name: string; district: string; availableCapacityQuintals: number; monthlyRate: number }[]
    labor: { role: string; location: string; wagePerDay: number; workersNeeded: number }[]
    finance: { suggestedLoan: number; monthlyEmi: number; riskLevel: string; note: string }
  }
  alerts: string[]
  voiceAssistant: {
    supportedLanguages: string[]
    suggestedCommands: string[]
  }
}

export type CropRecommendationPayload = {
  location: string
  soilType: string
  season: string
  waterAvailability: string
  budget: number
  landAreaHectares: number
}

export type ProfitPredictionPayload = {
  landSizeHectares: number
  cropType: string
  costOfCultivation: number
}
