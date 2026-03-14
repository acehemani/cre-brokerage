import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { DealProvider } from './context/DealContext'
import { ThemeProvider } from './context/ThemeContext'
import { initAnalytics } from './lib/analytics'
import './index.css'
import App from './App'

initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <DealProvider>
            <App />
          </DealProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
