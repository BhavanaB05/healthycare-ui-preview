import React, { useState } from 'react'

export default function MedicationManager({ medications, onAdd, onRemove }) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (trimmed && !medications.includes(trimmed)) {
      onAdd(trimmed)
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="card p-5">
      <div className="card-header-accent">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
        >
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="section-label">Current medications</p>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Medication Manager</h2>
            {medications.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-brand-card text-slate-700 border border-brand-soft/50">
                {medications.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          className="input-field flex-1"
          placeholder="Medication name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleAdd} className="btn-primary shrink-0 min-h-[48px]">
          Add
        </button>
      </div>
      {medications.length === 0 ? (
        <div className="py-6 px-4 rounded-xl bg-slate-50/80 border border-dashed border-brand-soft/70 text-center">
          <p className="text-clinical text-slate-600 font-medium">No medications added</p>
          <p className="text-clinical-sm text-slate-400 mt-1">Add above or scan a prescription to extract.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {medications.map((med, index) => (
            <li
              key={`${med}-${index}`}
              className="flex items-center gap-3 py-3 px-4 rounded-xl bg-slate-50/80 border border-slate-100 group"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-card border border-brand-soft/50 flex items-center justify-center text-[11px] font-bold text-slate-700">
                {index + 1}
              </span>
              <span className="text-slate-800 font-medium flex-1 min-w-0 truncate">{med}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="touch-target p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50/80 transition-colors"
                aria-label="Remove medication"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
