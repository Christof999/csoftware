import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ConsentProvider } from './consent/ConsentProvider'
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ConsentProvider>
          <App />
        </ConsentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
