import React from 'react'

const riskLevels = {
  low: { label: 'Low Risk', color: 'text-risk-low', stroke: 'stroke-risk-low', bg: 'bg-risk-low', range: '0–30', pill: 'bg-risk-low/25 text-risk-low border border-risk-low/50' },
  moderate: { label: 'Moderate Risk', color: 'text-risk-moderate', stroke: 'stroke-risk-moderate', bg: 'bg-risk-moderate', range: '31–60', pill: 'bg-risk-moderate/20 text-risk-moderate border border-risk-moderate/50' },
  high: { label: 'High Risk', color: 'text-risk-high', stroke: 'stroke-risk-high', bg: 'bg-risk-high', range: '61–100', pill: 'bg-risk-high/20 text-risk-high border border-risk-high/50' },
}

function getRiskLevel(score) {
  if (score <= 30) return 'low'
  if (score <= 60) return 'moderate'
  return 'high'
}

export default function RiskScorePanel({ riskScore, polypharmacyDetected, diseaseConflicts, sideEffectRisks }) {
  const level = getRiskLevel(riskScore ?? 0)
  const config = riskLevels[level]

  return (
    <div className="card p-5">
      <div className="card-header-accent">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
        >
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="section-label">Polypharmacy & risk</p>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Risk Score</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col items-center py-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-brand-soft/50"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={config.stroke}
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${riskScore ?? 0}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-slate-800">
              {riskScore ?? 0}
            </span>
          </div>
          <span className={`mt-3 px-3 py-1 rounded-lg text-[12px] font-bold border ${config.pill}`}>
            {config.label}
          </span>
          <p className="text-clinical-sm text-slate-500 mt-1">Score range {config.range}</p>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.bg}`}
            style={{ width: `${Math.min(riskScore ?? 0, 100)}%` }}
          />
        </div>
        <ul className="space-y-2 text-clinical">
          {polypharmacyDetected && (
            <li className="flex items-center gap-2 text-risk-moderate font-medium">
              <span className="w-2 h-2 rounded-full bg-risk-moderate shrink-0" />
              Polypharmacy (5+ medications)
            </li>
          )}
          {diseaseConflicts?.length > 0 && (
            <li className="flex items-start gap-2 text-risk-high font-medium">
              <span className="w-2 h-2 rounded-full bg-risk-high mt-1.5 shrink-0" />
              <span>Disease conflicts: {diseaseConflicts.join(', ')}</span>
            </li>
          )}
          {sideEffectRisks?.length > 0 && (
            <li className="flex items-start gap-2 text-risk-moderate font-medium">
              <span className="w-2 h-2 rounded-full bg-risk-moderate mt-1.5 shrink-0" />
              <span>Side effect risks: {sideEffectRisks.join(', ')}</span>
            </li>
          )}
          {!polypharmacyDetected && (!diseaseConflicts || diseaseConflicts.length === 0) && (!sideEffectRisks || sideEffectRisks.length === 0) && (
            <li className="text-slate-500">No additional warnings.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
