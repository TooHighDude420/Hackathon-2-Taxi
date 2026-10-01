import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import LiveLocation from './pages/LiveLocation.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <LiveLocation /> */}
  </StrictMode>,
)
