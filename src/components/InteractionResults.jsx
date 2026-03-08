import React from 'react'

const severityStyles = {
  high: {
    wrap: 'bg-risk-high/10 border-risk-high/30',
    text: 'text-brand-teal',
    badge: 'bg-risk-high/20 text-risk-high',
    icon: 'text-risk-high',
  },
  moderate: {
    wrap: 'bg-risk-moderate/10 border-risk-moderate/30',
    text: 'text-[#54776e]',
    badge: 'bg-risk-moderate/20 text-risk-moderate',
    icon: 'text-risk-moderate',
  },
  low: {
    wrap: 'bg-risk-low/20 border-risk-low/40',
    text: 'text-slate-700',
    badge: 'bg-risk-low/30 text-slate-700',
    icon: 'text-risk-low',
  },
}

function SeverityIcon({ severity }) {
  const isHigh = severity === 'high'
  return (
    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${severityStyles[severity]?.badge || severityStyles.moderate.badge}`}>
      <svg className={`w-4 h-4 ${severityStyles[severity]?.icon || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isHigh ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
      </svg>
    </span>
  )
}

export default function InteractionResults({ interactions, onCheck, isLoading, medicationCount }) {
  return (
    <div className="card p-5">
      <div className="card-header-accent">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
        >
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="section-label">Drug interactions</p>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Interaction Results</h2>
        </div>
      </div>
      <button
        type="button"
        onClick={onCheck}
        disabled={isLoading || medicationCount < 2}
        className="btn-primary w-full mb-4 flex items-center justify-center gap-2 min-h-[48px]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Checking…
          </>
        ) : (
          'Check Drug Interactions'
        )}
      </button>
      {medicationCount < 2 && (
        <p className="text-clinical text-slate-500 text-center py-3">Add at least 2 medications to run a check.</p>
      )}
      {interactions.length === 0 && medicationCount >= 2 && !isLoading && (
        <div className="py-6 px-4 rounded-xl bg-slate-50/80 border border-dashed border-brand-soft/70 text-center">
          <p className="text-clinical text-slate-600 font-medium">No interactions run yet</p>
          <p className="text-clinical-sm text-slate-400 mt-1">Tap the button above to check.</p>
        </div>
      )}
      {interactions.length > 0 && (
        <ul className="space-y-3">
          {interactions.map((item, index) => {
            const style = severityStyles[item.severity] || severityStyles.moderate
            return (
              <li
                key={index}
                className={`p-4 rounded-xl border ${style.wrap} flex gap-3`}
              >
                <SeverityIcon severity={item.severity} />
                <div className="min-w-0 flex-1">
                  <div className={`font-bold ${style.text}`}>
                    {item.drugA} + {item.drugB}
                  </div>
                  <p className="text-clinical text-slate-600 mt-1">{item.warning}</p>
                  <span className={`inline-block mt-2 text-clinical-sm font-semibold uppercase tracking-wide ${style.text} opacity-90`}>
                    {item.severity} risk
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
