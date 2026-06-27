import { AppShell } from '@/components/AppShell'
import { FileScan, Upload, CheckCircle2, FlaskConical, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function OCRPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto pb-12">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FileScan className="h-8 w-8 text-primary" /> Soil Health Card OCR
          </h1>
          <p className="mt-2 text-slate-600 text-lg">
            Take a photo of your Government Soil Health Card. Our AI will automatically read it and generate custom recommendations.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-emerald-950 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
          
          <button className="mx-auto flex flex-col items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-8 rounded-2xl border-2 border-dashed border-emerald-400/50 w-full max-w-md">
            <div className="bg-emerald-500/20 p-4 rounded-full">
              <Upload className="h-10 w-10 text-emerald-300" />
            </div>
            <div>
              <span className="font-bold text-xl block mb-1">Upload Soil Card</span>
              <span className="text-emerald-200 text-sm">Tap to take a photo or choose from gallery</span>
            </div>
          </button>
        </div>

        {/* AI Result Mockup (Simulated State after Upload) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-50">
          <div className="flex items-center gap-2 text-success font-bold text-sm uppercase tracking-wider mb-6 bg-success/10 w-max px-3 py-1 rounded-full">
            <CheckCircle2 className="h-4 w-4" /> Data Extracted Successfully
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Scanned Image Mockup */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-inner border-2 border-slate-100 bg-slate-50 flex items-center justify-center h-64">
                <FileScan className="h-24 w-24 text-slate-300" />
                {/* Simulated AI highlight */}
                <div className="absolute top-[30%] left-[20%] w-[60%] h-[20%] border-4 border-success rounded-lg bg-success/10"></div>
              </div>
              <p className="text-sm text-slate-500 text-center">Analyzed Document: SOIL_CARD_IMG_001.jpg</p>
            </div>

            {/* Extracted Values */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FlaskConical className="h-6 w-6 text-primary" /> Extracted Nutrients
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Nitrogen (N)</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">210 <span className="text-sm font-normal text-slate-500">kg/ha</span></p>
                  <p className="text-xs font-bold text-warning mt-2">Low</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Phosphorus (P)</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">32 <span className="text-sm font-normal text-slate-500">kg/ha</span></p>
                  <p className="text-xs font-bold text-success mt-2">Medium</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-sm font-semibold text-slate-500 uppercase">Potassium (K)</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">145 <span className="text-sm font-normal text-slate-500">kg/ha</span></p>
                  <p className="text-xs font-bold text-success mt-2">Medium</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                  <p className="text-sm font-semibold text-blue-600 uppercase">Soil pH</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">7.2</p>
                  <p className="text-xs font-bold text-blue-600 mt-2">Neutral / Ideal</p>
                </div>
              </div>

              <Link href="/advisory" className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-primary/30">
                Generate Crop Recommendations <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </AppShell>
  )
}
