import Link from 'next/link'
import { BarChart3, CloudSun, Coins, FlaskConical, House, MessagesSquare } from 'lucide-react'
import type { ReactNode } from 'react'
import { VoiceAssistant } from './VoiceAssistant'

const nav = [
  { href: '/', label: 'Dashboard', icon: House },
  { href: '/advisory', label: 'Advisory', icon: FlaskConical },
  { href: '/market', label: 'Market', icon: BarChart3 },
  { href: '/community', label: 'Community', icon: MessagesSquare },
  { href: '/finance', label: 'Finance', icon: Coins },
]

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-emerald-100 bg-white/90 px-4 py-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <CloudSun className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">KrishiAI</p>
              <p className="text-sm text-slate-500">Smart farmer decisions</p>
            </div>
          </div>

          <nav className="mt-6 grid gap-2">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-primary">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl bg-emerald-950 p-4 text-white">
            <p className="text-sm font-semibold">Voice Navigation</p>
            <p className="mt-2 text-sm text-emerald-100">Tap the yellow mic icon to start talking. Telugu, Hindi, English supported.</p>
          </div>
        </aside>

        <main className="px-4 py-5 sm:px-6 lg:px-8 pb-24 lg:pb-5">{children}</main>
        
        {/* Global Voice Assistant Component */}
        <VoiceAssistant />
      </div>
    </div>
  )
}
