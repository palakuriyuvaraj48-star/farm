'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2 } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'

interface FeatureCardProps {
  title: string
  image: string
  icon: React.ElementType
  href: string
}

export function FeatureCard({ title, image, icon: Icon, href }: FeatureCardProps) {
  const router = useRouter()
  const [tappedOnce, setTappedOnce] = useState(false)

  // Reset tap state after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (tappedOnce) {
      timer = setTimeout(() => {
        setTappedOnce(false)
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [tappedOnce])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!tappedOnce) {
      // First Tap: Speak the title
      setTappedOnce(true)
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(title)
        utterance.lang = 'en-IN' // Defaulting to Indian English for clarity, can be dynamic
        utterance.rate = 0.9 // Slightly slower for better comprehension
        window.speechSynthesis.speak(utterance)
      }
    } else {
      // Second Tap: Navigate
      window.speechSynthesis.cancel() // Stop speaking if they navigate
      router.push(href)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border text-left focus:outline-none focus:ring-4 focus:ring-primary/50 w-full ${
        tappedOnce ? 'border-primary scale-[0.98] ring-2 ring-primary/30' : 'border-emerald-50 active:scale-95'
      }`}
      aria-label={`${title}. ${tappedOnce ? 'Tap again to open.' : 'Tap once to hear, tap twice to open.'}`}
    >
      <div className="relative h-32 sm:h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
        
        <ImageWithFallback 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          containerClassName="h-full w-full"
        />
        
        {/* State Indicator */}
        {tappedOnce && (
          <div className="absolute top-3 left-3 z-20 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-md">
            <Volume2 className="h-3.5 w-3.5" /> Speaking...
          </div>
        )}

        {/* Floating Icon */}
        <div className={`absolute bottom-3 right-3 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl shadow-md transition-colors ${
          tappedOnce ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
      
      <div className={`p-4 sm:p-5 transition-colors ${tappedOnce ? 'bg-emerald-50' : ''}`}>
        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        {tappedOnce && (
          <p className="text-xs text-primary font-semibold mt-1 animate-fade-in">
            Tap again to open
          </p>
        )}
      </div>
    </button>
  )
}
