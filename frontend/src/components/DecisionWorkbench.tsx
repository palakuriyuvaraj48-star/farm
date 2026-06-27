'use client'

import { useState } from 'react'
import { requestCropRecommendation, requestProfitPrediction } from '@/services/platform'
import type { DashboardOverview } from '@/types/platform'

export function DecisionWorkbench({ initialRecommendation, initialProfit }: { initialRecommendation: DashboardOverview['cropRecommendation']; initialProfit: DashboardOverview['profitPrediction'] }) {
  const [cropResult, setCropResult] = useState(initialRecommendation)
  const [profitResult, setProfitResult] = useState(initialProfit)
  const [loadingCrop, setLoadingCrop] = useState(false)
  const [loadingProfit, setLoadingProfit] = useState(false)

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">AI Crop Recommendation</h3>
        <form
          className="mt-4 grid gap-3"
          onSubmit={async event => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            setLoadingCrop(true)
            try {
              const result = await requestCropRecommendation({
                location: String(form.get('location') || ''),
                soilType: String(form.get('soilType') || 'LOAMY'),
                season: String(form.get('season') || 'KHARIF'),
                waterAvailability: String(form.get('waterAvailability') || 'MEDIUM'),
                budget: Number(form.get('budget') || 0),
                landAreaHectares: Number(form.get('landAreaHectares') || 1),
              })
              setCropResult(result)
            } finally {
              setLoadingCrop(false)
            }
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="location" defaultValue="Nalgonda, Telangana" className="rounded-xl border border-emerald-100 px-4 py-3" placeholder="Location" />
            <select name="soilType" className="rounded-xl border border-emerald-100 px-4 py-3">
              <option value="LOAMY">Loamy</option>
              <option value="CLAY">Clay</option>
              <option value="BLACK">Black</option>
              <option value="ALLUVIAL">Alluvial</option>
            </select>
            <select name="season" className="rounded-xl border border-emerald-100 px-4 py-3">
              <option value="KHARIF">Kharif</option>
              <option value="RABI">Rabi</option>
              <option value="SUMMER">Summer</option>
            </select>
            <select name="waterAvailability" className="rounded-xl border border-emerald-100 px-4 py-3">
              <option value="MEDIUM">Medium water</option>
              <option value="HIGH">High water</option>
              <option value="LOW">Low water</option>
            </select>
            <input name="budget" type="number" defaultValue={75000} className="rounded-xl border border-emerald-100 px-4 py-3" placeholder="Budget" />
            <input name="landAreaHectares" type="number" step="0.1" defaultValue={2.5} className="rounded-xl border border-emerald-100 px-4 py-3" placeholder="Land size" />
          </div>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white">{loadingCrop ? 'Running recommendation...' : 'Generate recommendation'}</button>
        </form>
        <div className="mt-5 space-y-3">
          {cropResult.recommendations.map(option => (
            <div key={option.cropName} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{option.cropName}</p>
                  <p className="text-sm text-slate-600">{option.reasons.join(' • ')}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-primary">{Math.round(option.confidenceScore * 100)}%</p>
                  <p className="text-slate-500">confidence</p>
                </div>
              </div>
            </div>
          ))}
          <p className="text-sm text-slate-600">{cropResult.explanation}</p>
          <p className="text-xs text-slate-500">{cropResult.disclaimer}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Profit Prediction</h3>
        <form
          className="mt-4 grid gap-3"
          onSubmit={async event => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            setLoadingProfit(true)
            try {
              const result = await requestProfitPrediction({
                landSizeHectares: Number(form.get('landSizeHectares') || 0),
                cropType: String(form.get('cropType') || ''),
                costOfCultivation: Number(form.get('costOfCultivation') || 0),
              })
              setProfitResult(result)
            } finally {
              setLoadingProfit(false)
            }
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="landSizeHectares" type="number" step="0.1" defaultValue={2.5} className="rounded-xl border border-emerald-100 px-4 py-3" placeholder="Land size" />
            <input name="cropType" defaultValue="Paddy" className="rounded-xl border border-emerald-100 px-4 py-3" placeholder="Crop type" />
            <input name="costOfCultivation" type="number" defaultValue={52000} className="rounded-xl border border-emerald-100 px-4 py-3 sm:col-span-2" placeholder="Cost of cultivation" />
          </div>
          <button className="rounded-xl bg-emerald-950 px-4 py-3 text-sm font-semibold text-white">{loadingProfit ? 'Calculating...' : 'Estimate profit'}</button>
        </form>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Expected revenue</p>
            <p className="mt-1 text-xl font-semibold">INR {profitResult.expectedRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Expected profit</p>
            <p className="mt-1 text-xl font-semibold text-primary">INR {profitResult.expectedProfit.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Break-even point</p>
            <p className="mt-1 text-xl font-semibold">{profitResult.breakEvenPointQuintals} qtl</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Confidence score</p>
            <p className="mt-1 text-xl font-semibold">{Math.round(profitResult.confidenceScore * 100)}%</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          {profitResult.reasons.map(reason => <li key={reason}>• {reason}</li>)}
        </ul>
        <p className="mt-3 text-xs text-slate-500">{profitResult.disclaimer}</p>
      </div>
    </div>
  )
}
