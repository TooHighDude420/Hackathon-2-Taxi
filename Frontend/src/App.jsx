import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Test from './pages/test.jsx'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  )
}

export default App