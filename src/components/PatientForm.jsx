import React from 'react'

export default function PatientForm({ patient, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...patient, [field]: value })
  }

  return (
    <div className="card p-5">
      <div className="card-header-accent">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
        >
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="section-label">Patient information</p>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">Patient Input</h2>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="label">Patient name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Full name"
            value={patient.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              className="input-field"
              placeholder="—"
              min="1"
              max="120"
              value={patient.age || ''}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Gender</label>
            <select
              className="input-field"
              value={patient.gender || ''}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Patient ID <span className="font-normal text-slate-400">(optional)</span></label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. PAT-001"
            value={patient.patientId || ''}
            onChange={(e) => handleChange('patientId', e.target.value)}
          />
        </div>
        <div>
          <label className="label">Existing diseases / conditions</label>
          <textarea
            className="input-field min-h-[88px] resize-y py-3"
            placeholder="e.g. Hypertension, Diabetes, CKD…"
            value={patient.conditions || ''}
            onChange={(e) => handleChange('conditions', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
