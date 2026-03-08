import React from 'react'

const navItems = [
  { id: 'home', label: 'Home', sectionId: 'section-patient', icon: HomeIcon },
  { id: 'scan', label: 'Scan Prescription', sectionId: 'section-ocr', icon: ScanIcon },
  { id: 'interactions', label: 'Check Interactions', sectionId: 'section-interactions', icon: InteractionsIcon },
  { id: 'reports', label: 'Reports', sectionId: 'section-report', icon: ReportsIcon },
]

function HomeIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function ScanIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function InteractionsIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function ReportsIcon({ active }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 0 : 2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

export default function BottomNav({ activeId, onNavigate }) {
  const handleClick = (item) => {
    onNavigate?.(item.id)
    const el = document.getElementById(item.sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-100"
      style={{
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        boxShadow: '0 -1px 0 rgba(71, 186, 135, 0.08), 0 -4px 20px rgba(0,0,0,0.04)',
      }}
    >
      <div className="max-w-[400px] mx-auto px-2 flex items-stretch justify-between gap-1">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center gap-1 py-2.5 px-2 min-w-0 flex-1 min-h-[56px] rounded-xl transition-colors touch-manipulation relative"
              style={{
                color: isActive ? '#47ba87' : '#64bfa4',
              }}
              aria-label={item.label}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: '#47ba87' }}
                />
              )}
              <Icon active={isActive} />
              <span
                className={`text-[10px] font-semibold text-center leading-tight max-w-[72px] ${isActive ? 'text-brand-teal' : 'text-brand-secondary'}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
