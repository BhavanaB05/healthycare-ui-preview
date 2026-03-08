# Polypharmacy Risk Checker

A modern healthcare dashboard UI for **Medicine Interaction and Polypharmacy Risk Checker for Elderly Patients**. Built with React and Tailwind CSS for doctors and caregivers to detect dangerous medication combinations, disease conflicts, and polypharmacy risks.

## Features

- **Patient Input** – Name, age, gender, conditions, optional patient ID
- **Medication Manager** – Add/remove medications, view total count
- **OCR Prescription Scanner** – Upload prescription image, extract medications (mock)
- **Drug Interaction Checker** – Check interactions, display Drug A + Drug B → warning
- **Polypharmacy Risk Score** – Score 0–100, color-coded (Low/Moderate/High), disease conflicts, side effect risks
- **AI Explanation Engine** – “Explain Risk” with reasons, side effects, and recommendations
- **Report Generator** – Generate patient report and download as PDF
- **Results Dashboard** – Right-side panel with alerts, severity, and risk visualization

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── PatientForm.jsx
│   ├── MedicationManager.jsx
│   ├── OCRUploader.jsx
│   ├── InteractionResults.jsx
│   ├── RiskScorePanel.jsx
│   ├── AIExplanationPanel.jsx
│   ├── ReportGenerator.jsx
│   └── ResultsDashboard.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Backend Integration

The UI uses mock data for interactions, risk analysis, OCR, and AI explanation. Replace the mock functions in `App.jsx` with your backend API calls:

- **Interaction check** – POST medications to your interaction engine
- **Risk analysis** – Call polypharmacy/disease conflict APIs
- **OCR** – Upload image to your OCR service
- **AI explanation** – Call your explanation API
- **Report** – Optionally generate server-side PDF

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- jsPDF (for client-side PDF download)
