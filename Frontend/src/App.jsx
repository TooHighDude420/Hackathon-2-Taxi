import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Test from './pages/test.jsx'
import DistanceTraveled from './components/DistanceTraveled.jsx'
import './App.css'

function Home() {
  return (
    <main>
      <h1>Home</h1>
    </main>
  )
}

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  )
}

export default App