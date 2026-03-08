import React, { useRef, useState } from 'react'

export default function OCRUploader({ onExtract, extractedMeds, onAddExtracted }) {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, etc.)')
      return
    }
    setFile(f)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  const handleExtract = async () => {
    if (!file) return
    setIsExtracting(true)
    await new Promise((r) => setTimeout(r, 1200))
    const mockExtracted = ['Metformin', 'Lisinopril', 'Atorvastatin', 'Aspirin']
    onExtract(mockExtracted)
    setIsExtracting(false)
  }

  const clearImage = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="card p-5">
      <div className="card-header-accent">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'rgba(71, 186, 135, 0.15)' }}
        >
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="section-label">Prescription scan</p>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">OCR Scanner</h2>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 rounded-2xl border-2 border-dashed border-brand-soft/70 bg-brand-card/50 text-brand-secondary font-medium transition-colors flex flex-col items-center gap-2 touch-manipulation min-h-[120px] hover:border-brand-teal/50 hover:bg-brand-card/70"
        >
          <svg className="w-10 h-10 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Upload prescription image</span>
          <span className="text-clinical-sm">JPEG or PNG</span>
        </button>
        {preview && (
          <>
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50/50">
              <img src={preview} alt="Prescription preview" className="w-full max-h-48 object-contain" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 touch-target rounded-xl bg-white shadow-card text-slate-600 hover:bg-slate-50 border border-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={handleExtract}
              disabled={isExtracting}
              className="btn-primary w-full flex items-center justify-center gap-2 min-h-[48px]"
            >
              {isExtracting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Extracting…
                </>
              ) : (
                'Extract Medications'
              )}
            </button>
          </>
        )}
        {extractedMeds && extractedMeds.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <p className="text-clinical-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">Extracted</p>
            <ul className="space-y-2">
              {extractedMeds.map((med, i) => (
                <li key={i} className="flex items-center justify-between text-clinical py-2 px-3 rounded-lg bg-slate-50/80">
                  <span className="text-slate-800 font-medium">{med}</span>
                  <button
                    type="button"
                    onClick={() => onAddExtracted(med)}
                    className="text-brand-teal font-semibold text-clinical-sm hover:underline touch-manipulation py-2 px-3"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
