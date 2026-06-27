'use client'

import { AppShell } from '@/components/AppShell'
import Link from 'next/link'
import { 
  Sprout, TrendingUp, Droplets, 
  Bug, LineChart, Mic, Tractor
} from 'lucide-react'
import { FeatureCard } from '@/components/FeatureCard'

const features = [
  { id: 'crop', title: 'Crop Recommendation', icon: Sprout, image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&q=80', href: '/advisory' },
  { id: 'profit', title: 'Profit Prediction', icon: TrendingUp, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', href: '/advisory' },
  { id: 'alerts', title: 'Pest Alerts', icon: Bug, image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=400&q=80', href: '/alerts' },
  { id: 'disease', title: 'Disease Detection', icon: Bug, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80', href: '/disease' },
  { id: 'ocr', title: 'Soil Health OCR', icon: Droplets, image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80', href: '/ocr' },
  { id: 'equipment', title: 'Equipment Rental', icon: Tractor, image: 'https://images.unsplash.com/photo-1605367175402-1ea32a3ea57d?w=400&q=80', href: '/equipment' },
  { id: 'whatsapp', title: 'WhatsApp Bot', icon: Mic, image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&q=80', href: '/whatsapp' },
  { id: 'market', title: 'Market Price Advisor', icon: LineChart, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&q=80', href: '/market' },
]

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-8 pb-12">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl h-[400px] flex items-end pb-8 px-6 lg:px-12 group">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1592982537447-6f296d9b3074?w=1600&q=80" 
            alt="Smiling Indian Farmer in Field" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="relative z-20 w-full max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg" aria-label="Grow More. Earn More. Decide Smarter.">
              Grow More. Earn More. <br/><span className="text-accent drop-shadow-md">Decide Smarter.</span>
            </h1>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance("Welcome to Krishi A I. Tap the yellow microphone at the bottom right to talk to me.");
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 font-bold text-slate-900 shadow-xl transition hover:bg-yellow-400 active:scale-95 text-lg"
              >
                <Mic className="h-6 w-6" /> Ask by Voice
              </button>
              <Link href="/advisory" className="flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 px-6 py-4 font-bold text-white shadow-xl transition hover:bg-white/30 active:scale-95 text-lg">
                <Sprout className="h-6 w-6" /> Crop Recommendation
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Super App Features</h2>
            <p className="text-sm text-slate-600 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 hidden sm:block">Tap once to hear • Tap twice to open</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                image={feature.image}
                icon={feature.icon}
                href={feature.href}
              />
            ))}
          </div>
        </section>

      </div>
    </AppShell>
  )
}
