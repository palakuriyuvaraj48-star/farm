import { AppShell } from '@/components/AppShell'
import { 
  Sprout, Droplets, Sun, AlertTriangle, 
  ThumbsUp, Volume2, Info, TrendingUp, TrendingDown, CheckCircle2
} from 'lucide-react'

export default function AdvisoryPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Crop & Profit Advisory</h1>
          <p className="mt-2 text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Personalized for your land in Nalgonda District
          </p>
        </div>

        {/* CROP RECOMMENDATION MODULE */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Sprout className="h-6 w-6" /> Top Recommended Crop
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-emerald-50">
            <div className="grid md:grid-cols-2">
              {/* Crop Image & Confidence */}
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80" 
                  alt="Paddy Field" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-md">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Confidence Score</p>
                  <p className="text-2xl font-bold text-success flex items-center gap-1">
                    88% <span className="text-sm text-slate-600 font-normal">High</span>
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 bg-accent text-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
                  <Volume2 className="h-6 w-6" />
                </button>
              </div>
              
              {/* Details & Reasons */}
              <div className="p-6 sm:p-8 flex flex-col justify-center bg-background">
                <h3 className="text-4xl font-bold text-slate-900 mb-2">Paddy (Rice)</h3>
                <p className="text-lg text-slate-600 mb-6">Best choice for your soil type and current monsoon predictions.</p>
                
                <h4 className="font-semibold text-slate-800 mb-3 text-lg">Why this crop?</h4>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3 bg-white p-3 rounded-2xl shadow-sm">
                    <Droplets className="h-6 w-6 text-info mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Perfect Water Match</p>
                      <p className="text-sm text-slate-500">Your canal water supply is sufficient.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-3 rounded-2xl shadow-sm">
                    <Sun className="h-6 w-6 text-warning mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Season Aligned</p>
                      <p className="text-sm text-slate-500">Ideal planting window opens next week.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white p-3 rounded-2xl shadow-sm">
                    <ThumbsUp className="h-6 w-6 text-success mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">Local Success</p>
                      <p className="text-sm text-slate-500">12 nearby farmers had high yields last year.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROFIT PREDICTION MODULE */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-12">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <TrendingUp className="h-6 w-6" /> Profit Prediction
            </h2>
            <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full font-semibold">
              <CheckCircle2 className="h-5 w-5" /> Green: Safe Risk
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-50">
            <div className="mb-8 p-4 bg-amber-50 rounded-2xl flex gap-3 border border-amber-200">
              <Info className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> Financial projections are estimates based on historical data and current market trends. Profits are never guaranteed. Weather and market volatility can affect final outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Worst Case */}
              <div className="bg-red-50 rounded-3xl p-6 border border-red-100 flex flex-col items-center text-center">
                <TrendingDown className="h-10 w-10 text-red-500 mb-3" />
                <p className="text-sm font-bold text-red-600 uppercase tracking-wider mb-1">Worst Case</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">₹ 42,000</p>
                <p className="text-xs text-slate-600">If market drops or mild pest attack occurs.</p>
              </div>

              {/* Average Case */}
              <div className="bg-emerald-50 rounded-3xl p-6 border-2 border-emerald-200 flex flex-col items-center text-center transform md:-translate-y-4 shadow-md relative">
                <div className="absolute -top-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Likely</div>
                <TrendingUp className="h-12 w-12 text-primary mb-3 mt-2" />
                <p className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-1">Average Case</p>
                <p className="text-4xl font-bold text-slate-900 mb-2">₹ 91,000</p>
                <p className="text-xs text-slate-600">Normal weather and stable market prices.</p>
              </div>

              {/* Best Case */}
              <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex flex-col items-center text-center">
                <TrendingUp className="h-10 w-10 text-blue-500 mb-3" />
                <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">Best Case</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">₹ 1,35,000</p>
                <p className="text-xs text-slate-600">Perfect yield and high market demand.</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Risk Factors to Watch</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Delayed monsoon could increase pumping costs.</li>
                  <li className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Fertilizer prices are trending 5% higher.</li>
                </ul>
              </div>
              <div className="sm:text-right">
                <button className="bg-white border-2 border-primary text-primary hover:bg-emerald-50 font-bold py-3 px-6 rounded-2xl transition-colors w-full sm:w-auto">
                  View Detailed Cost Breakdown
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
