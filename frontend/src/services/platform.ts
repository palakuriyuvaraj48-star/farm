import { apiGet, apiPost } from '@/services/api'
import type { ApiResponse, CropRecommendationPayload, DashboardOverview, ProfitPredictionPayload } from '@/types/platform'

const fallbackDashboard: DashboardOverview = {
  farmer: { name: 'Ravi Kumar', district: 'Nalgonda', totalLandHectares: 4.6, preferredLanguage: 'Telugu' },
  metrics: [
    { label: 'Expected season profit', value: 'INR 1.36L', trend: '+12%' },
    { label: 'Water stress', value: 'Moderate', trend: 'Monitor' },
    { label: 'Market signal', value: 'Sell in 5-7 days', trend: 'Positive' },
  ],
  weather: {
    current: { condition: 'Partly cloudy', temperatureCelsius: 33, humidity: 62, rainChancePercent: 30 },
    forecast: [
      { day: 'Day 1', summary: 'Humid with light clouds', minTemp: 27, maxTemp: 34, rainChancePercent: 25 },
      { day: 'Day 2', summary: 'Scattered showers', minTemp: 26, maxTemp: 32, rainChancePercent: 65 },
    ],
    recommendations: ['Delay broad irrigation before rainfall.', 'Schedule spray work tomorrow morning.'],
    alerts: ['Rain alert likely within 48 hours'],
  },
  cropRecommendation: {
    recommendations: [
      { cropName: 'Paddy', confidenceScore: 0.88, expectedYieldQuintalPerHectare: 52, riskLevel: 'MEDIUM', profitEstimate: 96000, reasons: ['Season fit', 'Water profile match', 'Healthy mandi demand'] },
      { cropName: 'Maize', confidenceScore: 0.79, expectedYieldQuintalPerHectare: 34, riskLevel: 'MEDIUM', profitEstimate: 73000, reasons: ['Diversification option', 'Balanced cost-return profile'] },
    ],
    explanation: 'Recommendations blend season, soil, water, and budget fit.',
    disclaimer: 'Use local agronomy and mandi advice before making large investment decisions.',
  },
  profitPrediction: {
    totalCost: 52000,
    expectedRevenue: 143000,
    expectedProfit: 91000,
    breakEvenPointQuintals: 23.64,
    confidenceScore: 0.81,
    reasons: ['Uses crop return multipliers', 'Assumes current mandi range'],
    disclaimer: 'Financial projections are estimates, not guarantees.',
  },
  ecosystem: {
    market: [{ crop: 'Paddy', currentPrice: 2180, predictedPrice: 2260, recommendation: 'WAIT', confidenceScore: 0.77 }],
    schemes: [{ name: 'PM-KISAN', eligibilityScore: 0.93, benefit: 'Income support installment', action: 'Complete bank verification' }],
    community: [{ title: 'Brown planthopper seen near canal belt', category: 'Pest alert', replies: 18, urgent: true }],
    marketplace: [{ product: 'Hybrid paddy seed', category: 'Seeds', price: 1450, seller: 'AgriHub Traders' }],
    warehouses: [{ name: 'Nalgonda Rural Storage', district: 'Nalgonda', availableCapacityQuintals: 430, monthlyRate: 32 }],
    labor: [{ role: 'Harvest helpers', location: 'Miryalaguda', wagePerDay: 550, workersNeeded: 12 }],
    finance: { suggestedLoan: 120000, monthlyEmi: 5450, riskLevel: 'MEDIUM', note: 'Borrow below INR 1.2L to keep EMI within cash flow.' },
  },
  alerts: ['Delay irrigation on Plot 2.', 'Cotton prices improving nearby.', 'PM-KISAN likely eligible.'],
  voiceAssistant: { supportedLanguages: ['Telugu', 'Hindi', 'English'], suggestedCommands: ['Recommend crop', 'Check market price', 'Explain government scheme'] },
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  try {
    const response = await apiGet<ApiResponse<DashboardOverview>>('/dashboard/overview')
    return response.data
  } catch {
    return fallbackDashboard
  }
}

export async function requestCropRecommendation(payload: CropRecommendationPayload) {
  const response = await apiPost<ApiResponse<DashboardOverview['cropRecommendation']>>('/advisory/crop-recommendation', payload)
  return response.data
}

export async function requestProfitPrediction(payload: ProfitPredictionPayload) {
  const response = await apiPost<ApiResponse<DashboardOverview['profitPrediction']>>('/advisory/profit-prediction', payload)
  return response.data
}
