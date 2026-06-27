import clsx from 'clsx'
import type { ReactNode } from 'react'

export function InsightCard({
  title,
  eyebrow,
  children,
  tone = 'default',
}: {
  title: string
  eyebrow?: string
  children: ReactNode
  tone?: 'default' | 'accent' | 'dark'
}) {
  return (
    <section
      className={clsx(
        'rounded-2xl border p-5 shadow-sm',
        tone === 'default' && 'border-emerald-100 bg-white',
        tone === 'accent' && 'border-amber-200 bg-amber-50',
        tone === 'dark' && 'border-emerald-950 bg-emerald-950 text-white',
      )}
    >
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{eyebrow}</p> : null}
      <h2 className="mt-1 text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
