import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import { CollectionProvider } from './context/CollectionContext'
import { FilterProvider } from './context/FilterContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CollectionProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </CollectionProvider>
    </ThemeProvider>
  </StrictMode>,
)
