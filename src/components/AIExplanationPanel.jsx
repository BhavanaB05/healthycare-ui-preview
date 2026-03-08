import React, { useState } from 'react'

export default function AIExplanationPanel({ explanation, onRequestExplain, hasInteractionsOrRisk, isLoading }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="card p-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left touch-manipulation py-1 -mx-1 rounded-lg hover:bg-slate-50/50"
      >
        <div className="card-header-accent border-0 pb-0 mb-0">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
          >
            <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="section-label">Clinical guidance</p>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">AI Explanation</h2>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-brand-secondary transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={onRequestExplain}
            disabled={isLoading || !hasInteractionsOrRisk}
            className="btn-primary w-full flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating…
              </>
            ) : (
              'Explain Risk'
            )}
          </button>
          {!hasInteractionsOrRisk && (
            <p className="text-clinical text-slate-500">Run interaction check and risk analysis first.</p>
          )}
          {explanation && (
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-4 text-clinical">
              {explanation.whyDangerous && (
                <div>
                  <p className="font-bold text-slate-700 mb-1 text-[13px]">Why this is dangerous</p>
                  <p className="text-slate-600">{explanation.whyDangerous}</p>
                </div>
              )}
              {explanation.sideEffects && explanation.sideEffects.length > 0 && (
                <div>
                  <p className="font-bold text-slate-700 mb-1 text-[13px]">Possible side effects</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {explanation.sideEffects.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {explanation.recommendations && explanation.recommendations.length > 0 && (
                <div>
                  <p className="font-bold text-slate-700 mb-1 text-[13px]">For doctors & caregivers</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {explanation.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
