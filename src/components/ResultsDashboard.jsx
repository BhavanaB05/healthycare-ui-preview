import React from 'react'

const severityConfig = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', label: 'High' },
  moderate: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', label: 'Moderate' },
  low: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', label: 'Low' },
}

function getRiskLevel(score) {
  if (score <= 30) return 'low'
  if (score <= 60) return 'moderate'
  return 'high'
}

export default function ResultsDashboard({
  interactions,
  polypharmacyWarnings,
  riskScore,
  diseaseConflicts,
}) {
  const riskLevel = getRiskLevel(riskScore ?? 0)
  const riskStyle = severityConfig[riskLevel] || severityConfig.low
  const hasAlerts = (interactions?.length > 0) || polypharmacyWarnings?.length > 0 || (riskScore != null && riskScore > 30)

  return (
    <div className="card p-5 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-medical-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Results Dashboard
      </h2>
      <div className="space-y-4 flex-1 overflow-auto">
        {riskScore != null && (
          <div className={`rounded-lg border p-3 ${riskStyle.bg} ${riskStyle.border}`}>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">Overall risk score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${riskLevel === 'high' ? 'bg-red-500' : riskLevel === 'moderate' ? 'bg-amber-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(riskScore, 100)}%` }}
                />
              </div>
              <span className={`font-semibold ${riskStyle.text}`}>{riskScore}</span>
            </div>
            <p className={`text-sm font-medium mt-1 ${riskStyle.text}`}>{riskStyle.label} Risk</p>
          </div>
        )}
        {interactions?.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Interaction alerts</p>
            <ul className="space-y-2">
              {interactions.map((item, i) => {
                const style = severityConfig[item.severity] || severityConfig.moderate
                return (
                  <li key={i} className={`rounded-lg border p-2.5 text-sm ${style.bg} ${style.border} ${style.text}`}>
                    <span className="font-medium">{item.drugA} + {item.drugB}</span>
                    <p className="text-xs mt-0.5 opacity-90 line-clamp-2">{item.warning}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {polypharmacyWarnings?.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Polypharmacy warnings</p>
            <ul className="space-y-1.5">
              {polypharmacyWarnings.map((w, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}
        {diseaseConflicts?.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">Disease conflicts</p>
            <ul className="space-y-1.5">
              {diseaseConflicts.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg px-2.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {!hasAlerts && (
          <p className="text-sm text-slate-500 py-6 text-center">Run checks to see alerts and risk visualization here.</p>
        )}
      </div>
    </div>
  )
}
