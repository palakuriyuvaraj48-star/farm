import './globals.css'
import React from 'react'

export const metadata = {
  title: 'KrishiAI - Smart Farmer Decision Support System',
  description: 'AI-powered agriculture platform for farmer decision support',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
