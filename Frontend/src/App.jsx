import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Test from './pages/test.jsx'
import LiveLocation from './pages/LiveLocation.jsx'
import DistanceTraveled from './components/DistanceTraveled.jsx'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/test" element={<Test />} />
        <Route path="/livelocation" element={<LiveLocation />} />
        <Route path="/rit-voltooid" element={<DistanceTraveled />} />
      </Routes>
    </>
  )
}

export default App
