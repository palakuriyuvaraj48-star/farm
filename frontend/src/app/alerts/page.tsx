import { AppShell } from '@/components/AppShell'
import { AlertTriangle, BellRing, Bug, MapPin, CheckCircle2 } from 'lucide-react'

export default function PestAlertsPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Bug className="h-8 w-8 text-red-500" /> Hyper-Local Pest Alerts
            </h1>
            <p className="mt-2 text-slate-600 text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-slate-400" /> Nalgonda District, Telangana
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
             <div className="bg-emerald-100 p-3 rounded-full">
               <BellRing className="h-6 w-6 text-primary" />
             </div>
             <div>
               <p className="font-bold text-slate-900">SMS Alerts Active</p>
               <p className="text-sm text-slate-500">Sent to +91 98765 43210</p>
             </div>
          </div>
        </div>

        {/* Current Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Active Threats (Next 7 Days)</h2>

          {/* HIGH RISK (RED) */}
          <div className="bg-red-50 border-l-8 border-red-500 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              High Risk
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-2xl h-max shadow-sm">
                <Bug className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-1">Fall Armyworm (Maize)</h3>
                <p className="text-red-800 mb-4">High probability of outbreak in your mandal due to recent dry spells followed by humidity.</p>
                <div className="bg-white/60 rounded-xl p-4 border border-red-100">
                  <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Recommended Action
                  </h4>
                  <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                    <li>Inspect whorls of maize plants immediately.</li>
                    <li>If &gt;10% plants damaged, spray Emamectin Benzoate (0.4g/L).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* MODERATE RISK (YELLOW) */}
          <div className="bg-amber-50 border-l-8 border-amber-500 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white font-bold text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Moderate Risk
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-2xl h-max shadow-sm">
                <Bug className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-1">Brown Plant Hopper (Paddy)</h3>
                <p className="text-amber-800 mb-4">Migration detected from neighboring districts. Keep a close watch.</p>
                <div className="bg-white/60 rounded-xl p-4 border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Recommended Action
                  </h4>
                  <p className="text-amber-800 text-sm">Maintain proper spacing and avoid excessive nitrogen fertilizer application.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SAFE (GREEN) */}
          <div className="bg-emerald-50 border-l-8 border-primary rounded-2xl p-6 shadow-sm flex gap-4 items-center">
            <div className="bg-white p-3 rounded-2xl h-max shadow-sm">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-900 mb-1">Cotton Bollworm</h3>
              <p className="text-emerald-800">Currently no threat detected for your region based on weather models.</p>
            </div>
          </div>

        </div>

      </div>
    </AppShell>
  )
}
