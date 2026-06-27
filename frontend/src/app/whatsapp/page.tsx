import { AppShell } from '@/components/AppShell'
import { MessageCircle, CheckCircle2, Smartphone, ArrowRight } from 'lucide-react'

export default function WhatsAppPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        
        {/* Header Section */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-sm">
            <MessageCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            KrishiAI on WhatsApp
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant crop recommendations, market prices, and weather alerts directly in your WhatsApp. No app installation required!
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-xl">₹</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Live Market Prices</h3>
            <p className="text-slate-600 text-sm">Send "Price Paddy" and get today's exact mandi rates.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-xl">⚠️</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Instant Alerts</h3>
            <p className="text-slate-600 text-sm">Receive automatic warnings for pests and heavy rain.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-xl">🎤</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Voice Support</h3>
            <p className="text-slate-600 text-sm">Send voice notes in Telugu or Hindi and get answers.</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-green-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl mt-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
             <MessageCircle className="h-64 w-64" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to connect?</h2>
          <p className="text-green-100 mb-8 relative z-10 text-lg">Send "Hi" to our verified WhatsApp Business number to start.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <button className="bg-white text-green-700 font-bold text-xl py-4 px-8 rounded-2xl hover:bg-slate-50 transition-colors shadow-lg flex items-center gap-3 w-full sm:w-auto justify-center">
              <Smartphone className="h-6 w-6" /> Connect WhatsApp <ArrowRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-green-200 text-sm relative z-10">
            <CheckCircle2 className="h-4 w-4" /> 100% Free • Verified Business Account
          </div>
        </div>

      </div>
    </AppShell>
  )
}
