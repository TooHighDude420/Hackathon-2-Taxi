import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import { dashboardPath, useAuth } from './context/authContext.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ChooseDriver from './pages/ChooseDriver.jsx'
import RegisterTaxi from './pages/RegisterTaxi.jsx'
import DistancePricing from './pages/DistancePricing.jsx'
import LiveLocation from './pages/LiveLocation.jsx'
import DistanceTraveled from './pages/DistanceTraveled.jsx'

function HomeRedirect() {
  const { user, loading } = useAuth()
  if (loading) return null
  return <Navigate to={user ? dashboardPath(user.role) : '/inloggen'} replace />
}

function RequireRole({ role, children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/inloggen" replace />
  if (user.role !== role) return <Navigate to={dashboardPath(user.role)} replace />
  return children
}

function App() {
  return (
    <div className="min-h-dvh bg-white">
      <Nav />
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/inloggen" element={<Login />} />
        <Route path="/account-aanmaken" element={<Register />} />
        <Route path="/chauffeurs" element={<RequireRole role="passenger"><ChooseDriver /></RequireRole>} />
        <Route path="/mijn-taxi" element={<RequireRole role="driver"><RegisterTaxi /></RequireRole>} />
        <Route path="/route-en-prijs" element={<DistancePricing />} />
        <Route path="/onderweg" element={<LiveLocation />} />
        <Route path="/rit-voltooid" element={<DistanceTraveled />} />
      </Routes>
    </div>
  )
}

export default App
