import React, { useState, useCallback } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import PatientForm from './components/PatientForm'
import MedicationManager from './components/MedicationManager'
import OCRUploader from './components/OCRUploader'
import InteractionResults from './components/InteractionResults'
import RiskScorePanel from './components/RiskScorePanel'
import AIExplanationPanel from './components/AIExplanationPanel'
import ReportGenerator from './components/ReportGenerator'

const defaultPatient = {
  name: '',
  age: '',
  gender: '',
  patientId: '',
  conditions: '',
}

function runInteractionCheck(medications) {
  if (medications.length < 2) return []
  const mock = [
    { drugA: medications[0], drugB: medications[1], warning: 'May increase risk of bleeding or kidney stress. Monitor renal function and bleeding indices.', severity: 'high' },
  ]
  if (medications.length >= 3) {
    mock.push({ drugA: medications[1], drugB: medications[2], warning: 'Potential CNS depression. Avoid driving or operating machinery.', severity: 'moderate' })
  }
  return mock
}

function runRiskAnalysis(medications, conditions) {
  const count = medications.length
  const polypharmacy = count >= 5
  const baseScore = Math.min(100, count * 12 + (polypharmacy ? 20 : 0))
  const diseaseConflicts = conditions && conditions.toLowerCase().includes('kidney') ? ['Renal impairment: adjust dosing for renally cleared drugs'] : []
  const sideEffectRisks = count >= 4 ? ['Increased fall risk', 'Cognitive effects'] : []
  return {
    score: Math.min(100, baseScore + (diseaseConflicts.length * 10)),
    polypharmacyDetected: polypharmacy,
    diseaseConflicts,
    sideEffectRisks,
  }
}

function getAIExplanation(interactions, riskScore) {
  return {
    whyDangerous: 'Combining multiple medications increases the risk of adverse drug events, especially in elderly patients with reduced renal/hepatic function and polypharmacy.',
    sideEffects: ['Dizziness', 'Increased fall risk', 'Kidney function decline', 'Bleeding risk'],
    recommendations: [
      'Review necessity of each medication; consider deprescribing where appropriate.',
      'Monitor renal function and electrolytes regularly.',
      'Use the lowest effective dose (start low, go slow).',
      'Schedule a medication reconciliation with a pharmacist.',
    ],
  }
}

function getRiskLevelLabel(score) {
  if (score <= 30) return 'Low Risk'
  if (score <= 60) return 'Moderate Risk'
  return 'High Risk'
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home')
  const [patient, setPatient] = useState(defaultPatient)
  const [medications, setMedications] = useState([])
  const [extractedMeds, setExtractedMeds] = useState(null)
  const [interactions, setInteractions] = useState([])
  const [riskResult, setRiskResult] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [explanationSummary, setExplanationSummary] = useState('')
  const [checkingInteractions, setCheckingInteractions] = useState(false)
  const [explaining, setExplaining] = useState(false)

  const addMedication = useCallback((med) => {
    setMedications((prev) => (prev.includes(med) ? prev : [...prev, med]))
  }, [])

  const removeMedication = useCallback((index) => {
    setMedications((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleOCRExtract = useCallback((list) => {
    setExtractedMeds(list)
  }, [])

  const handleAddExtracted = useCallback((med) => {
    addMedication(med)
  }, [addMedication])

  const handleCheckInteractions = useCallback(async () => {
    setCheckingInteractions(true)
    await new Promise((r) => setTimeout(r, 800))
    setInteractions(runInteractionCheck(medications))
    const risk = runRiskAnalysis(medications, patient.conditions)
    setRiskResult(risk)
    setCheckingInteractions(false)
  }, [medications, patient.conditions])

  const handleExplainRisk = useCallback(async () => {
    setExplaining(true)
    await new Promise((r) => setTimeout(r, 1000))
    setExplanation(getAIExplanation(interactions, riskResult?.score))
    setExplanationSummary('Multiple drug interactions and polypharmacy increase risk of adverse events. Recommendations include medication review, renal monitoring, and pharmacist reconciliation.')
    setExplaining(false)
  }, [interactions, riskResult?.score])

  const hasInteractionsOrRisk = interactions.length > 0 || (riskResult != null && riskResult.score > 0)

  const handleNavNavigate = useCallback((id) => {
    setActiveNav(id)
  }, [])

  const statusLine = patient?.name
    ? `${patient.name}${medications.length > 0 ? ` · ${medications.length} meds` : ''}`
    : 'New assessment'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="max-w-[400px] mx-auto w-full px-4 pt-2 pb-1">
        <p className="text-clinical-sm text-brand-secondary font-semibold uppercase tracking-wider truncate">
          {statusLine}
        </p>
      </div>
      <main
        className="flex-1 w-full max-w-[400px] mx-auto px-4 py-4 pb-28"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="flex flex-col gap-4">
          <section id="section-patient">
            <PatientForm patient={patient} onChange={setPatient} />
          </section>
          <section id="section-medications">
            <MedicationManager
              medications={medications}
              onAdd={addMedication}
              onRemove={removeMedication}
            />
          </section>
          <section id="section-ocr">
            <OCRUploader
              onExtract={handleOCRExtract}
              extractedMeds={extractedMeds || []}
              onAddExtracted={handleAddExtracted}
            />
          </section>
          <section id="section-interactions">
            <InteractionResults
              interactions={interactions}
              onCheck={handleCheckInteractions}
              isLoading={checkingInteractions}
              medicationCount={medications.length}
            />
          </section>
          <section id="section-risk">
            <RiskScorePanel
              riskScore={riskResult?.score}
              polypharmacyDetected={riskResult?.polypharmacyDetected}
              diseaseConflicts={riskResult?.diseaseConflicts}
              sideEffectRisks={riskResult?.sideEffectRisks}
            />
          </section>
          <section id="section-ai">
            <AIExplanationPanel
              explanation={explanation}
              onRequestExplain={handleExplainRisk}
              hasInteractionsOrRisk={hasInteractionsOrRisk}
              isLoading={explaining}
            />
          </section>
          <section id="section-report">
            <ReportGenerator
              patient={patient}
              medications={medications}
              interactions={interactions}
              riskScore={riskResult?.score}
              riskLevel={riskResult != null ? getRiskLevelLabel(riskResult.score) : null}
              explanationSummary={explanationSummary}
              onGenerate={async () => {}}
            />
          </section>
        </div>
      </main>
      <BottomNav activeId={activeNav} onNavigate={handleNavNavigate} />
    </div>
  )
}
