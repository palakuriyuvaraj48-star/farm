import { AppShell } from '@/components/AppShell'
import { InsightCard } from '@/components/InsightCard'
import { getDashboardOverview } from '@/services/platform'

export default async function MarketPage() {
  const dashboard = await getDashboardOverview()

  return (
    <AppShell>
      <InsightCard title="Market, Warehouse, and Selling Decisions" eyebrow="Commerce">
        <div className="grid gap-4 lg:grid-cols-3">
          {dashboard.ecosystem.market.map(item => (
            <div key={item.crop} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
              <p className="font-semibold">{item.crop}</p>
              <p className="mt-2 text-sm text-slate-600">Current {item.currentPrice} • Predicted {item.predictedPrice}</p>
              <p className="mt-2 text-sm text-primary">{item.recommendation}</p>
            </div>
          ))}
          {dashboard.ecosystem.warehouses.map(item => (
            <div key={item.name} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-emerald-100">
              <p className="font-semibold">{item.name}</p>
              <p className="mt-2 text-sm text-slate-600">{item.district}</p>
              <p className="mt-2 text-sm text-slate-600">{item.availableCapacityQuintals} qtl available</p>
            </div>
          ))}
        </div>
      </InsightCard>
    </AppShell>
  )
}
