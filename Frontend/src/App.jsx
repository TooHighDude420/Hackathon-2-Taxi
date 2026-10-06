import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Test from './pages/test.jsx'
import LiveLocation from './pages/LiveLocation.jsx'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/test" element={<Test />} />
        <Route path="/livelocation" element={<LiveLocation />} />
      </Routes>
    </>
  )
}

export default App