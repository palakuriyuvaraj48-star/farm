import { AppShell } from '@/components/AppShell'
import { InsightCard } from '@/components/InsightCard'
import { getDashboardOverview } from '@/services/platform'

export default async function CommunityPage() {
  const dashboard = await getDashboardOverview()

  return (
    <AppShell>
      <InsightCard title="Farmer Community" eyebrow="Knowledge sharing">
        <div className="grid gap-4">
          {dashboard.ecosystem.community.map(post => (
            <div key={post.title} className="rounded-2xl border border-emerald-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-sm text-slate-600">{post.category}</p>
                </div>
                <span className="text-sm text-primary">{post.replies} replies</span>
              </div>
            </div>
          ))}
        </div>
      </InsightCard>
    </AppShell>
  )
}
