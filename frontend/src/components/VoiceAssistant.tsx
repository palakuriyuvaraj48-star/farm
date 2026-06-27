'use client'

import { useState, useEffect, useCallback } from 'react'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function VoiceAssistant() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const rec = new SpeechRecognition()
        rec.continuous = false
        rec.interimResults = false
        rec.lang = 'en-IN' // Defaulting to English (India), can be switched based on user pref

        rec.onstart = () => {
          setIsListening(true)
          setError(null)
          setTranscript('')
        }

        rec.onresult = (event: any) => {
          const current = event.resultIndex
          const transcriptText = event.results[current][0].transcript.toLowerCase()
          setTranscript(transcriptText)
          handleVoiceCommand(transcriptText)
        }

        rec.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setError(event.error === 'not-allowed' ? 'Microphone permission denied.' : 'Could not hear you clearly.')
          setIsListening(false)
        }

        rec.onend = () => {
          setIsListening(false)
        }

        setRecognition(rec)
      } else {
        setError('Voice assistant is not supported in this browser.')
      }
    }
  }, [router])

  const handleVoiceCommand = useCallback((command: string) => {
    // Simple intent matching
    if (command.includes('crop') || command.includes('recommendation')) {
      router.push('/advisory')
      speakFeedback('Opening Crop Recommendation')
    } else if (command.includes('profit') || command.includes('prediction')) {
      router.push('/advisory')
      speakFeedback('Opening Profit Prediction')
    } else if (command.includes('disease') || command.includes('pest')) {
      router.push('/disease')
      speakFeedback('Opening Disease Detection')
    } else if (command.includes('market') || command.includes('price')) {
      router.push('/market')
      speakFeedback('Opening Market Prices')
    } else if (command.includes('scheme') || command.includes('government')) {
      router.push('/finance')
      speakFeedback('Opening Government Schemes')
    } else if (command.includes('home') || command.includes('dashboard')) {
      router.push('/')
      speakFeedback('Going to Dashboard')
    } else {
      speakFeedback('Sorry, I did not understand. Try saying Crop Recommendation.')
    }
  }, [router])

  const speakFeedback = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-IN'
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
    } else {
      try {
        recognition.start()
      } catch (e) {
        console.error("Error starting recognition", e)
      }
    }
  }

  return (
    <>
      {/* Visual Feedback Toast when listening */}
      <div 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isListening || transcript || error ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
        }`}
      >
        <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm w-full mx-4 border border-slate-700">
          {isListening ? (
             <div className="relative flex h-4 w-4">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
               <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
             </div>
          ) : error ? (
            <MicOff className="h-6 w-6 text-red-400" />
          ) : (
            <Mic className="h-6 w-6 text-emerald-400" />
          )}
          
          <div className="flex-1">
            <p className="font-semibold text-sm">
              {isListening ? 'Listening...' : error ? 'Error' : 'Command Received'}
            </p>
            <p className="text-xs text-slate-300 truncate">
              {error || transcript || 'Say a feature name like "Crop Recommendation"'}
            </p>
          </div>
        </div>
      </div>

      {/* Global FAB */}
      <button 
        onClick={toggleListening}
        className={`fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/50 z-50 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 scale-110 ring-4 ring-red-500/30' 
            : 'bg-accent hover:bg-yellow-500 hover:scale-105'
        }`}
        aria-label={isListening ? "Stop Voice Assistant" : "Start Voice Assistant"}
        title="Voice Assistant"
      >
        {isListening ? <Loader2 className="h-7 w-7 animate-spin" /> : <Mic className="h-7 w-7" />}
      </button>
    </>
  )
}
