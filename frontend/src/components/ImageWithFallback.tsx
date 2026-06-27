'use client'

import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import clsx from 'clsx'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  containerClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc = 'https://images.unsplash.com/photo-1595841696650-60a0f025e1a1?w=400&q=80', // Default generic agriculture fallback
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={clsx('relative overflow-hidden bg-slate-100', containerClassName)}>
      {/* Skeleton Loader */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden="true" />
      )}
      
      {/* Error State Fallback */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400">
          <ImageOff className="h-8 w-8 mb-2 opacity-50" />
          <span className="text-xs font-medium uppercase tracking-wider opacity-70">Image Not Found</span>
        </div>
      ) : (
        <img
          src={src || fallbackSrc}
          alt={alt}
          loading="lazy"
          className={clsx(
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true)
            setLoaded(true)
          }}
          {...props}
        />
      )}
    </div>
  )
}
