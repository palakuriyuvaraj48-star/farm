import { AppShell } from '@/components/AppShell'
import { 
  Camera, Upload, Bug, ShieldCheck, 
  AlertCircle, Stethoscope, ChevronRight, CheckCircle2
} from 'lucide-react'

export default function DiseaseDetectionPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Bug className="h-8 w-8 text-primary" /> Crop Disease AI
          </h1>
          <p className="mt-2 text-slate-600 text-lg">
            Upload a photo of the affected plant to instantly detect diseases and get verified treatments.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-emerald-950 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2 z-10 relative">
            <button className="flex-1 max-w-[200px] mx-auto sm:mx-0 flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-6 rounded-2xl border border-white/20">
              <Camera className="h-10 w-10 text-accent" />
              <span className="font-semibold text-lg">Take Photo</span>
            </button>
            <button className="flex-1 max-w-[200px] mx-auto sm:mx-0 flex flex-col items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-6 rounded-2xl border border-white/20">
              <Upload className="h-10 w-10 text-accent" />
              <span className="font-semibold text-lg">Upload Gallery</span>
            </button>
          </div>
          <p className="text-sm text-emerald-200 mt-4">Make sure the leaf/affected area is clearly visible.</p>
        </div>

        {/* AI Result Mockup (Simulated State after Upload) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-50">
          <div className="flex items-center gap-2 text-success font-bold text-sm uppercase tracking-wider mb-6 bg-success/10 w-max px-3 py-1 rounded-full">
            <ShieldCheck className="h-4 w-4" /> AI Analysis Complete
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Before/After Analysis */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-inner border-2 border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80" 
                  alt="Infected Leaf Analysis" 
                  className="w-full h-64 object-cover"
                />
                {/* Simulated AI bounding box */}
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] border-4 border-warning rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
                   <div className="absolute -top-7 left-0 bg-warning text-white text-xs font-bold px-2 py-1 rounded-md">Detected</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 text-center">Analyzed Image</p>
            </div>

            {/* AI Findings */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Brown Spot Disease</h2>
              <p className="text-lg text-slate-600 mb-6">Common fungal infection in Paddy.</p>
              
              <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-semibold text-slate-700">AI Confidence</span>
                  <span className="text-2xl font-bold text-primary">92%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Verified Treatment */}
              <h3 className="font-semibold text-lg text-slate-800 mb-3 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" /> Recommended Treatment
              </h3>
              
              <div className="space-y-3">
                <div className="flex gap-3 bg-white border border-emerald-100 p-4 rounded-xl shadow-sm">
                  <div className="bg-emerald-100 rounded-full p-2 h-max text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Spray Mancozeb (2.5g/liter)</p>
                    <p className="text-sm text-slate-600">Apply immediately. Re-apply after 10-15 days if symptoms persist.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 bg-white border border-amber-100 p-4 rounded-xl shadow-sm">
                  <div className="bg-amber-100 rounded-full p-2 h-max text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Manage Water</p>
                    <p className="text-sm text-slate-600">Avoid prolonged drought stress. Ensure proper irrigation.</p>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                Buy Recommended Fungicide <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  )
}
