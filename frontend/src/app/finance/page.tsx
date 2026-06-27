import { AppShell } from '@/components/AppShell'
import { InsightCard } from '@/components/InsightCard'
import { getDashboardOverview } from '@/services/platform'

export default async function FinancePage() {
  const dashboard = await getDashboardOverview()

  return (
    <AppShell>
      <div className="grid gap-6 lg:grid-cols-2">
        <InsightCard title="Loan and EMI Analysis" eyebrow="Finance">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Suggested loan</p>
              <p className="mt-1 text-2xl font-semibold">INR {dashboard.ecosystem.finance.suggestedLoan.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Monthly EMI</p>
              <p className="mt-1 text-2xl font-semibold">INR {dashboard.ecosystem.finance.monthlyEmi.toLocaleString()}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">{dashboard.ecosystem.finance.note}</p>
        </InsightCard>

        <InsightCard title="Labor Marketplace" eyebrow="Seasonal jobs">
          {dashboard.ecosystem.labor.map(item => (
            <div key={item.role} className="mb-3 rounded-2xl bg-emerald-50 p-4 last:mb-0">
              <p className="font-semibold">{item.role}</p>
              <p className="mt-1 text-sm text-slate-600">{item.location} • {item.workersNeeded} workers</p>
              <p className="mt-1 text-sm text-primary">INR {item.wagePerDay} / day</p>
            </div>
          ))}
        </InsightCard>
      </div>
    </AppShell>
  )
}
