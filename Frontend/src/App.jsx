import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import DistancePricing from './pages/DistancePricing.jsx'
import LiveLocation from './pages/LiveLocation.jsx'
import DistanceTraveled from './pages/DistanceTraveled.jsx'

function App() {
  return (
    <div className="min-h-dvh bg-white">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/route-en-prijs" replace />} />
        <Route path="/route-en-prijs" element={<DistancePricing />} />
        <Route path="/onderweg" element={<LiveLocation />} />
        <Route path="/rit-voltooid" element={<DistanceTraveled />} />
      </Routes>
    </div>
  )
}

export default App
