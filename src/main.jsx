import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeMockData } from './utils/mockData'
import { PatientsProvider } from './context/PatientsContext'
import { IncidentsProvider } from './context/IncidentsContext'

initializeMockData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PatientsProvider>
      <IncidentsProvider>
        <App />
      </IncidentsProvider>
    </PatientsProvider>
  </StrictMode>,
)
